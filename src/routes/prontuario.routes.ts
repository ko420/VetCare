import { Router } from 'express';
import * as prontuarioController from '../controllers/prontuario.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { veterinarioMiddleware } from '../middlewares/veterinario.middleware';

const router = Router();
router.get(
  '/',
  authMiddleware,
  prontuarioController.buscarPorId
);

router.get(
  '/',
  authMiddleware,
  prontuarioController.listar
);

router.get(
  '/:id',
  authMiddleware,
  prontuarioController.buscarPorId
);
router.get(
  '/:id',
  authMiddleware,
  prontuarioController.listar
);

router.put(
  '/:id',
  authMiddleware,
  veterinarioMiddleware,
  prontuarioController.atualizar
);

export default router;