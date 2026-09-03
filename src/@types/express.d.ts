import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        tipo: 'cliente' | 'veterinario';
        crmv?: string;
      };
    }
  }
}