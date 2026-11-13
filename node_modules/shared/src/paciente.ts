import { z } from "zod";

export const pacienteSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 letras"),
  cpf: z.string().min(11, "O CPF deve ter pelo menos 11 caracteres"),
  email: z.string().email("Formato de e-mail inválido").optional().or(z.literal("")),
  telefone: z.string().min(10, "O telefone deve ter pelo menos 10 caracteres").optional().or(z.literal("")),
  dataNascimento: z.string().optional().nullable(),
});