import { z } from "zod";

export const medicoSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 letras"),
  especialidade: z.string().min(3, "A especialidade deve ter pelo menos 3 letras"),
  email: z.string().email("Formato de e-mail inválido").optional().or(z.literal("")),
  telefone: z.string().min(10, "O telefone deve ter pelo menos 10 caracteres").optional().or(z.literal("")),
});