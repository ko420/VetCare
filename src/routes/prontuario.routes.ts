import { Router } from 'express';
import * as prontuarioController from '../controllers/prontuario.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', prontuarioController.criar);
router.get('/', prontuarioController.listar);
router.get('/:id', prontuarioController.buscarPorId);
router.put('/:id', authMiddleware, prontuarioController.atualizar);

export default router;