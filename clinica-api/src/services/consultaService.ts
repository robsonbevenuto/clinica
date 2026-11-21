import { ConsultaRepository } from '../repositories/consultaRepository';

export class ConsultaService {
  private repository = new ConsultaRepository();

  async listar() { 
    return this.repository.findAll(); 
  }
  
  async buscarPorId(id: number) {
    const consulta = await this.repository.findById(id);
    if (!consulta) throw new Error('Consulta não encontrada');
    return consulta;
  }
  
  async atualizar(id: number, data: any) {
    await this.buscarPorId(id);
    return this.repository.update(id, data);
  }
  
  async deletar(id: number) {
    await this.buscarPorId(id);
    return this.repository.delete(id);
  }

  // NOVA FUNÇÃO CRIAR AQUI DENTRO DA CLASSE
  async criar(data: any) {
    const LIMITE_CONSULTAS_POR_TURNO = 3; 

    const dataConsulta = new Date(data.data);
    
    const totalConsultas = await this.repository.contarConsultasNoTurno(
      Number(data.medicoId),
      dataConsulta,
      data.turno
    );

    if (totalConsultas >= LIMITE_CONSULTAS_POR_TURNO) {
      throw new Error(
        `O médico já atingiu o limite de ${LIMITE_CONSULTAS_POR_TURNO} pacientes para o turno ${data.turno === 'M' ? 'Manhã' : 'Tarde'} no dia ${dataConsulta.toLocaleDateString('pt-BR')}.`
      );
    }

    return this.repository.create(data);
  }
}