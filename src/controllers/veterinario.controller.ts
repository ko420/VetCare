import { Request, Response } from 'express';
import * as veterinarioService from '../services/veterinario.services';

export async function criar(req: Request, res: Response): Promise<void> {
  const { nome, crmv, especialidade, email } = req.body;

    const veterinario = await veterinarioService.criarVeterinario({ nome, crmv, especialidade, email });

      res.status(201).json(veterinario);
}
export async function listar(_req: Request, res: Response): Promise<void> {
  const veterinarios = await veterinarioService.listarVeterinarios();
  res.status(200).json(veterinarios);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);

  const veterinario = await veterinarioService.buscarVeterinarioPorId(id);

  res.status(200).json(veterinario);
}
export async function atualizar(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  const veterinario = await veterinarioService.atualizarVeterinario(id, {
    nome: req.body.nome,
    crmv: req.body.crmv,
    especialidade: req.body.especialidade,
    email: req.body.email,
  });

  res.status(200).json(veterinario);
}