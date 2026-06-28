"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { mensagemSchema, type MensagemInput } from "@/lib/validations";

const serviceOptions = [
  "Aeroporto",
  "Executivo",
  "Viagens Intermunicipais",
  "Outro",
] as const;

type ContactFormData = Omit<MensagemInput, "email"> & {
  email?: string;
};

const contactFormSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  telefone: z
    .string()
    .min(8, "Telefone deve ter no mínimo 8 dígitos")
    .max(30, "Telefone deve ter no máximo 30 caracteres"),
  email: z
    .string()
    .email("E-mail inválido")
    .max(150, "E-mail deve ter no máximo 150 caracteres")
    .optional()
    .nullable()
    .or(z.literal("")),
  servico: z.string().min(1, "Selecione um serviço"),
  dataHora: z
    .string()
    .max(100, "Data/Hora deve ter no máximo 100 caracteres")
    .optional()
    .nullable()
    .or(z.literal("")),
  mensagem: z
    .string()
    .max(2000, "Mensagem deve ter no máximo 2000 caracteres")
    .optional()
    .nullable()
    .or(z.literal("")),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function useContactForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      email: "",
      servico: undefined,
      dataHora: "",
      mensagem: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      // Monta a mensagem de WhatsApp
      const mensagem = [
        `*Nova solicitação pelo site — MC Transporte*`,
        ``,
        `*Nome:* ${values.nome}`,
        `*Telefone:* ${values.telefone}`,
        values.email ? `*E-mail:* ${values.email}` : "",
        `*Serviço:* ${values.servico}`,
        values.dataHora ? `*Data/Hora:* ${values.dataHora}` : "",
        ``,
        `*Mensagem:*`,
        values.mensagem || "(sem mensagem adicional)",
      ]
        .filter(Boolean)
        .join("\n");

      // Salva no banco via API (fire-and-forget)
      fetch("/api/mensagens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: values.nome,
          telefone: values.telefone,
          email: values.email || null,
          servico: values.servico,
          dataHora: values.dataHora || null,
          mensagem: values.mensagem || null,
        }),
      }).catch((err) => console.error("Erro ao salvar mensagem:", err));

      // Abre o WhatsApp
      window.open(
        whatsappLink(mensagem),
        "_blank",
        "noopener,noreferrer"
      );

      setSubmittedData(values);
      setSent(true);
      toast({
        title: "WhatsApp aberto!",
        description: "Confira a aba aberta e envie sua mensagem.",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onError = (errors: Record<string, { message?: string }>) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast({
        title: "Verifique os campos",
        description: firstError.message,
        variant: "destructive",
      });
    }
  };

  return {
    form,
    onSubmit,
    onError,
    loading,
    sent,
    submittedData,
    serviceOptions,
    siteConfig,
    whatsappLink,
  };
}
