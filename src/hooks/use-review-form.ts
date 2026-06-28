"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { avaliacaoSchema, type AvaliacaoInput } from "@/lib/validations";

const reviewFormSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  nota: z.number().int().min(1).max(5),
  comentario: z
    .string()
    .min(5, "Comentário deve ter no mínimo 5 caracteres")
    .max(1000, "Comentário deve ter no máximo 1000 caracteres"),
  servico: z
    .string()
    .max(100, "Serviço deve ter no máximo 100 caracteres")
    .optional()
    .nullable(),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const serviceOptions = [
  "Aeroporto",
  "Executivo",
  "Viagens Intermunicipais",
  "Outro",
] as const;

export function useReviewForm(onSuccess?: () => void) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [hoverNota, setHoverNota] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      nome: "",
      nota: 5,
      comentario: "",
      servico: "",
    },
    mode: "onChange",
  });

  const carregar = useCallback(async () => {
    onSuccess?.();
  }, [onSuccess]);

  const onSubmit = async (values: ReviewFormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/avaliacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: values.nome,
          nota: values.nota,
          comentario: values.comentario,
          servico: values.servico || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast({
          title: "Avaliação enviada!",
          description: "Obrigado pelo seu feedback.",
        });
        form.reset({
          nome: "",
          nota: 5,
          comentario: "",
          servico: "",
        });
        await carregar();
      } else {
        toast({
          title: "Erro ao enviar",
          description: json.error || "Tente novamente em alguns instantes.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
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
    submitting,
    hoverNota,
    setHoverNota,
    serviceOptions,
  };
}
