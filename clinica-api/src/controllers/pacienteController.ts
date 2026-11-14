import { Request, Response } from 'express';
import prisma from '../prisma';

// Listar todos os pacientes
export const findAll = async (req: Request, res: Response) => {
  const pacientes = await prisma.paciente.findMany();
  res.json(pacientes);
};

// Buscar um paciente por ID
export const findOne = async (req: Request, res: Response) => {
  const paciente = await prisma.paciente.findUnique({
    where: { id: Number(req.params.id) }
  });
  if (!paciente) return res.status(404).json({ error: 'Paciente não encontrado' });
  res.json(paciente);
};

// Criar paciente
export const create = async (req: Request, res: Response) => {
  const paciente = await prisma.paciente.create({ data: req.body });
  res.status(201).json(paciente);
};

// Atualizar paciente
export const update = async (req: Request, res: Response) => {
  const paciente = await prisma.paciente.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(paciente);
};

// Deletar paciente
export const remove = async (req: Request, res: Response) => {
  await prisma.paciente.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};
