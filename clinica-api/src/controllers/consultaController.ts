import { Request, Response } from 'express';
import { ConsultaService } from '../services/consultaService';

const service = new ConsultaService();

export const findAll = async (req: Request, res: Response) => {
  try { res.json(await service.listar()); } catch (e: any) { res.status(500).json({ error: e.message }); }
};
export const findOne = async (req: Request, res: Response) => {
  try { res.json(await service.buscarPorId(Number(req.params.id))); } catch (e: any) { res.status(404).json({ error: e.message }); }
};
export const create = async (req: Request, res: Response) => {
  try { res.status(201).json(await service.criar(req.body)); } catch (e: any) { res.status(400).json({ error: e.message }); }
};
export const update = async (req: Request, res: Response) => {
  try { res.json(await service.atualizar(Number(req.params.id), req.body)); } catch (e: any) { res.status(404).json({ error: e.message }); }
};
export const remove = async (req: Request, res: Response) => {
  try { await service.deletar(Number(req.params.id)); res.status(204).send(); } catch (e: any) { res.status(404).json({ error: e.message }); }
};