import { Request, Response } from 'express';
import * as consultaService from '../services/consulta.services';
export async function criar(req: Request, res: Response): Promise<void> {
  const { categoriaId, dataHorario, status, animalId, veterinarioId } = req.body;
  const consulta = await consultaService.criarConsulta({ categoriaId, dataHorario, status, animalId, veterinarioId, domiciliar: req.body.domiciliar });
  res.status(201).json(consulta);
}

export async function listar(req: Request, res: Response): Promise<void> {
  
  const statusDisponibilidade = req.query.status as string | undefined;
  const consultas = await consultaService.listarConsultas(statusDisponibilidade);
  res.status(200).json(consultas);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const consulta = await consultaService.buscarPorId(id);
  res.status(200).json(consulta);
}

export async function atualizar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const consultaAtualizada = await consultaService.atualizarConsulta(id, req.body);
  res.status(200).json(consultaAtualizada);
}