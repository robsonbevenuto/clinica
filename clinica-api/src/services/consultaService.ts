import { ConsultaRepository } from '../repositories/consultaRepository';

export class ConsultaService {
  private repository = new ConsultaRepository();

  async listar() { return this.repository.findAll(); }
  async buscarPorId(id: number) {
    const consulta = await this.repository.findById(id);
    if (!consulta) throw new Error('Consulta não encontrada');
    return consulta;
  }
  async criar(data: any) { return this.repository.create(data); }
  async atualizar(id: number, data: any) {
    await this.buscarPorId(id);
    return this.repository.update(id, data);
  }
  async deletar(id: number) {
    await this.buscarPorId(id);
    return this.repository.delete(id);
  }
}