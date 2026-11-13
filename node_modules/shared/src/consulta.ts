import { z } from "zod";

export const consultaSchema = z.object({
  data: z.string().datetime("Data inválida, use o formato ISO 8601"), // Ex: 2026-12-30T15:00:00Z
  turno: z.enum(["M", "T"], { message: "O turno deve ser 'M' (Manhã) ou 'T' (Tarde)" }),
  medicoId: z.number().int().positive("O ID do médico deve ser um número positivo"),
  pacienteId: z.number().int().positive("O ID do paciente deve ser um número positivo"),
  observacoes: z.string().optional(),
});