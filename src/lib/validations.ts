/**
 * Schemas de validação Zod para o site MC Transporte Executivo.
 * Usados nas API routes antes de salvar no banco.
 */
import { z } from "zod";

// ---------- Avaliação ----------
export const avaliacaoSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .transform((v) => v.trim()),
  nota: z
    .number()
    .int("Nota deve ser um número inteiro")
    .min(1, "Nota mínima é 1")
    .max(5, "Nota máxima é 5"),
  comentario: z
    .string()
    .min(5, "Comentário deve ter no mínimo 5 caracteres")
    .max(1000, "Comentário deve ter no máximo 1000 caracteres")
    .transform((v) => v.trim()),
  servico: z
    .string()
    .max(100, "Serviço deve ter no máximo 100 caracteres")
    .transform((v) => v.trim())
    .optional()
    .nullable(),
});

export type AvaliacaoInput = z.infer<typeof avaliacaoSchema>;

// ---------- Mensagem (Contato) ----------
export const mensagemSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .transform((v) => v.trim()),
  telefone: z
    .string()
    .min(8, "Telefone deve ter no mínimo 8 dígitos")
    .max(30, "Telefone deve ter no máximo 30 caracteres")
    .transform((v) => v.trim()),
  email: z
    .string()
    .email("E-mail inválido")
    .max(150, "E-mail deve ter no máximo 150 caracteres")
    .transform((v) => v.trim().toLowerCase())
    .optional()
    .nullable()
    .or(z.literal("")),
  servico: z
    .string()
    .min(1, "Serviço é obrigatório")
    .max(100, "Serviço deve ter no máximo 100 caracteres")
    .transform((v) => v.trim()),
  dataHora: z
    .string()
    .max(100, "Data/Hora deve ter no máximo 100 caracteres")
    .transform((v) => v.trim())
    .optional()
    .nullable(),
  mensagem: z
    .string()
    .max(2000, "Mensagem deve ter no máximo 2000 caracteres")
    .transform((v) => v.trim())
    .optional()
    .nullable(),
});

export type MensagemInput = z.infer<typeof mensagemSchema>;

// ---------- Admin (aprovação/rejeição) ----------
export const adminAprovacaoSchema = z.object({
  id: z.string().min(1, "ID da avaliação é obrigatório"),
  aprovado: z.boolean(),
});
