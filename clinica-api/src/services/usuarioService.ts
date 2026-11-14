import bcrypt from 'bcrypt';
import { UsuarioRepository } from '../repositories/usuarioRepository';

export class UsuarioService {
  private repository = new UsuarioRepository();

  async cadastrar(data: any) {
    const usuarioExiste = await this.repository.findByEmail(data.email);
    if (usuarioExiste) throw new Error('E-mail já cadastrado');

    // Criptografa a senha antes de salvar (10 é o custo do hash)
    const senhaHash = await bcrypt.hash(data.senha, 10);
    const usuario = await this.repository.create({ ...data, senha: senhaHash });

    // Remove a senha do objeto antes de devolver para a API
    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async login(data: any) {
    const usuario = await this.repository.findByEmail(data.email);
    if (!usuario) throw new Error('E-mail ou senha inválidos');

    // Compara a senha digitada com a senha criptografada no banco
    const senhaValida = await bcrypt.compare(data.senha, usuario.senha);
    if (!senhaValida) throw new Error('E-mail ou senha inválidos');

    // Remove a senha do objeto antes de devolver para a API
    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }
}