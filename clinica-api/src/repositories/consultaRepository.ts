import prisma from '../prisma';

export class ConsultaRepository {
  async findAll() {
    return prisma.consulta.findMany({ include: { medico: true, paciente: true } });
  }
  
  async findById(id: number) {
    return prisma.consulta.findUnique({ where: { id }, include: { medico: true, paciente: true } });
  }
  
  async create(data: any) { 
    return prisma.consulta.create({ data }); 
  }
  
  async update(id: number, data: any) { 
    return prisma.consulta.update({ where: { id }, data }); 
  }
  
  async delete(id: number) { 
    return prisma.consulta.delete({ where: { id } }); 
  }

  // NOVO MÉTODO AQUI DENTRO DA CLASSE
  async contarConsultasNoTurno(medicoId: number, data: Date, turno: string) {
    const inicioDia = new Date(data);
    inicioDia.setHours(0, 0, 0, 0);
    
    const fimDia = new Date(data);
    fimDia.setHours(23, 59, 59, 999);

    return prisma.consulta.count({
      where: {
        medicoId,
        turno,
        data: {
          gte: inicioDia,
          lte: fimDia
        }
      }
    });
  }
}