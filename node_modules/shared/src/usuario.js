"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.usuarioSchema = void 0;
const zod_1 = require("zod");
exports.usuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().min(3, "O nome deve ter pelo menos 3 letras"),
    email: zod_1.z.string().email("E-mail inválido"),
    senha: zod_1.z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    role: zod_1.z.string().optional().default("secretario"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("E-mail inválido"),
    senha: zod_1.z.string().min(1, "A senha é obrigatória"),
});
