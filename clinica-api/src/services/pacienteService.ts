import { PacienteRepository } from '../repositories/pacienteRepository';

export class PacienteService {
  private repository = new PacienteRepository();

  async listar() {
    return this.repository.findAll();
  }

  async buscarPorId(id: number) {
    const paciente = await this.repository.findById(id);
    if (!paciente) throw new Error('Paciente não encontrado');
    return paciente;
  }

  async criar(data: any) {
    return this.repository.create(data);
  }

  async atualizar(id: number, data: any) {
    await this.buscarPorId(id); // Verifica se existe antes de atualizar
    return this.repository.update(id, data);
  }

  async deletar(id: number) {
    await this.buscarPorId(id); // Verifica se existe antes de deletar
    return this.repository.delete(id);
  }
}