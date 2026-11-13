"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicoSchema = void 0;
const zod_1 = require("zod");
exports.medicoSchema = zod_1.z.object({
    nome: zod_1.z.string().min(3, "O nome deve ter pelo menos 3 letras"),
    especialidade: zod_1.z.string().min(3, "A especialidade deve ter pelo menos 3 letras"),
    email: zod_1.z.string().email("Formato de e-mail inválido").optional().or(zod_1.z.literal("")),
    telefone: zod_1.z.string().min(10, "O telefone deve ter pelo menos 10 caracteres").optional().or(zod_1.z.literal("")),
});
