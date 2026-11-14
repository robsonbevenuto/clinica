"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Limpar o banco de dados (na ordem correta por causa das chaves estrangeiras)
        yield prisma.consulta.deleteMany();
        yield prisma.paciente.deleteMany();
        yield prisma.medico.deleteMany();
        yield prisma.usuario.deleteMany();
        // 2. Criar Usuário Admin
        const senhaHash = yield bcrypt_1.default.hash('123456', 10);
        yield prisma.usuario.create({
            data: {
                nome: 'Administrador',
                email: 'admin@clinica.com',
                senha: senhaHash,
                role: 'admin',
            },
        });
        // 3. Criar Pacientes
        const paciente1 = yield prisma.paciente.create({
            data: {
                nome: 'João Silva',
                cpf: '111.222.333-44',
                email: 'joao@email.com',
                telefone: '11999999999',
            },
        });
        const paciente2 = yield prisma.paciente.create({
            data: {
                nome: 'Maria Santos',
                cpf: '555.666.777-88',
                email: 'maria@email.com',
                telefone: '11888888888',
            },
        });
        // 4. Criar Médicos
        const medico1 = yield prisma.medico.create({
            data: {
                nome: 'Dr. Carlos Souza',
                especialidade: 'Cardiologia',
                email: 'carlos@clinica.com',
                telefone: '11777777777',
            },
        });
        const medico2 = yield prisma.medico.create({
            data: {
                nome: 'Dra. Ana Lima',
                especialidade: 'Pediatria',
                email: 'ana@clinica.com',
                telefone: '11666666666',
            },
        });
        // 5. Criar Consultas
        yield prisma.consulta.create({
            data: {
                data: new Date('2026-12-01T10:00:00Z'),
                turno: 'M',
                pacienteId: paciente1.id,
                medicoId: medico1.id,
                status: 'agendada',
                observacoes: 'Primeira consulta',
            },
        });
        yield prisma.consulta.create({
            data: {
                data: new Date('2026-12-02T15:00:00Z'),
                turno: 'T',
                pacienteId: paciente2.id,
                medicoId: medico2.id,
                status: 'agendada',
            },
        });
        console.log('Seed executado com sucesso!');
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
