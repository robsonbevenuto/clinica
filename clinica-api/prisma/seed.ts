import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Limpar o banco de dados (na ordem correta por causa das chaves estrangeiras)
  await prisma.consulta.deleteMany();
  await prisma.paciente.deleteMany();
  await prisma.medico.deleteMany();
  await prisma.usuario.deleteMany();

  // 2. Criar Usuário Admin
  const senhaHash = await bcrypt.hash('123456', 10);
  await prisma.usuario.create({
    data: {
      nome: 'Administrador',
      email: 'admin@clinica.com',
      senha: senhaHash,
      role: 'admin',
    },
  });

  // 3. Criar Pacientes
  const paciente1 = await prisma.paciente.create({
    data: {
      nome: 'João Silva',
      cpf: '111.222.333-44',
      email: 'joao@email.com',
      telefone: '11999999999',
    },
  });

  const paciente2 = await prisma.paciente.create({
    data: {
      nome: 'Maria Santos',
      cpf: '555.666.777-88',
      email: 'maria@email.com',
      telefone: '11888888888',
    },
  });

  // 4. Criar Médicos
  const medico1 = await prisma.medico.create({
    data: {
      nome: 'Dr. Carlos Souza',
      especialidade: 'Cardiologia',
      email: 'carlos@clinica.com',
      telefone: '11777777777',
    },
  });

  const medico2 = await prisma.medico.create({
    data: {
      nome: 'Dra. Ana Lima',
      especialidade: 'Pediatria',
      email: 'ana@clinica.com',
      telefone: '11666666666',
    },
  });

  // 5. Criar Consultas
  await prisma.consulta.create({
    data: {
      data: new Date('2026-12-01T10:00:00Z'),
      turno: 'M',
      pacienteId: paciente1.id,
      medicoId: medico1.id,
      status: 'agendada',
      observacoes: 'Primeira consulta',
    },
  });

  await prisma.consulta.create({
    data: {
      data: new Date('2026-12-02T15:00:00Z'),
      turno: 'T',
      pacienteId: paciente2.id,
      medicoId: medico2.id,
      status: 'agendada',
    },
  });

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });