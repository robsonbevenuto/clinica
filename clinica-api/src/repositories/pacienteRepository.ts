import prisma from '../prisma';

export class PacienteRepository {
  async findAll() {
    return prisma.paciente.findMany();
  }

  async findById(id: number) {
    return prisma.paciente.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.paciente.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.paciente.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.paciente.delete({ where: { id } });
  }
}