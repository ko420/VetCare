import { Router } from 'express';
import * as consultaController from '../controllers/consulta.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { veterinarioMiddleware } from '../middlewares/veterinario.middleware';

const router = Router();
router.get(
  '/',
  authMiddleware,
  consultaController.buscarPorId
);

router.get(
  '/',
  authMiddleware,
  consultaController.listar
);

router.get(
  '/:id',
  authMiddleware,
  consultaController.buscarPorId
);
router.get(
  '/:id',
  authMiddleware,
  consultaController.listar
);



router.post(
  '/',
  authMiddleware,
  veterinarioMiddleware,
  consultaController.criar
);

router.put(
  '/:id',
  authMiddleware,
  veterinarioMiddleware,
  consultaController.atualizar
);

export default router;