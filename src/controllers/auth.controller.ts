import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, telefone } = req.body;
  const resultado = await authService.login({ email, telefone });
  return res.status(200).json(resultado);
}
export async function loginVeterinario(
  req: Request,
  res: Response
): Promise<void> {
  const { crmv, email } = req.body;

  const resultado = await authService.loginVeterinario({
    crmv,
    email,
  });

  res.status(200).json(resultado);
}