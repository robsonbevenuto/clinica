"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultaSchema = void 0;
const zod_1 = require("zod");
exports.consultaSchema = zod_1.z.object({
    data: zod_1.z.string().datetime("Data inválida, use o formato ISO 8601"), // Ex: 2026-12-30T15:00:00Z
    turno: zod_1.z.enum(["M", "T"], { message: "O turno deve ser 'M' (Manhã) ou 'T' (Tarde)" }),
    medicoId: zod_1.z.number().int().positive("O ID do médico deve ser um número positivo"),
    pacienteId: zod_1.z.number().int().positive("O ID do paciente deve ser um número positivo"),
    observacoes: zod_1.z.string().optional(),
});
