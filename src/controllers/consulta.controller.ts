import { Request, Response } from 'express';
import * as consultaService from '../services/consulta.services';

export async function criar(req: Request, res: Response): Promise<void> {
  const { datahorario, status } = req.body;

    const consulta = await consultaService.criarConsulta({ datahorario, status });

      res.status(201).json(consulta);
}
export async function listar(_req: Request, res: Response): Promise<void> {
  const consultas = await consultaService.listarConsultas();
  res.status(200).json(consultas);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);

  const consulta = await consultaService.buscarConsultaPorId(id);

  res.status(200).json(consulta);
}
