import { MedicoRepository } from '../repositories/medicoRepository';

export class MedicoService {
  private repository = new MedicoRepository();

  async listar() { return this.repository.findAll(); }
  async buscarPorId(id: number) {
    const medico = await this.repository.findById(id);
    if (!medico) throw new Error('Médico não encontrado');
    return medico;
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