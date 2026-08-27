import { Request, Response } from 'express';
import * as prontuarioService from '../services/prontuario.services';

export async function criar(req: Request, res: Response): Promise<void> {
  const { diagnostico, prescricao } = req.body;

    const prontuario = await prontuarioService.criarProntuario({ diagnostico, prescricao });

      res.status(201).json(prontuario);
}
export async function listar(_req: Request, res: Response): Promise<void> {
  const prontuarios = await prontuarioService.listarProntuarios();
  res.status(200).json(prontuarios);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);

  const prontuario = await prontuarioService.buscarProntuarioPorId(id);

  res.status(200).json(prontuario);
}
