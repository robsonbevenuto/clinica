import prisma from '../prisma';

export class UsuarioRepository {
  async findByEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  }

  async create(data: any) {
    return prisma.usuario.create({ data });
  }
}