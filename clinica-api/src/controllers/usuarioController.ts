import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';

const service = new UsuarioService();

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const usuario = await service.cadastrar(req.body);
    res.status(201).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const usuario = await service.login(req.body);
    res.json(usuario);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};