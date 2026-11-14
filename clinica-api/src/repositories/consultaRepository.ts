import prisma from '../prisma';

export class ConsultaRepository {
  async findAll() {
    return prisma.consulta.findMany({ include: { medico: true, paciente: true } });
  }
  async findById(id: number) {
    return prisma.consulta.findUnique({ where: { id }, include: { medico: true, paciente: true } });
  }
  async create(data: any) { return prisma.consulta.create({ data }); }
  async update(id: number, data: any) { return prisma.consulta.update({ where: { id }, data }); }
  async delete(id: number) { return prisma.consulta.delete({ where: { id } }); }
}