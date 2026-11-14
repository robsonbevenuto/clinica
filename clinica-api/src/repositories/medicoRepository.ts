import prisma from '../prisma';

export class MedicoRepository {
  async findAll() { return prisma.medico.findMany(); }
  async findById(id: number) { return prisma.medico.findUnique({ where: { id } }); }
  async create(data: any) { return prisma.medico.create({ data }); }
  async update(id: number, data: any) { return prisma.medico.update({ where: { id }, data }); }
  async delete(id: number) { return prisma.medico.delete({ where: { id } }); }
}