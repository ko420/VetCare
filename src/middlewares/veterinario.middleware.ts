// src/middlewares/veterinario.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

export function veterinarioMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    throw new AppError('Usuário não autenticado.', 401);
  }

  if (req.user.tipo !== 'veterinario') {
    throw new AppError(
      'Acesso permitido apenas para veterinários.',
      403
    );
  }

  next();
}