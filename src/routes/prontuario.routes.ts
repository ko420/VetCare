import { Router } from 'express';
import * as prontuarioController from '../controllers/prontuario.controller';

const router = Router();

router.post('/', prontuarioController.criar);
router.get('/', prontuarioController.listar);
router.get('/:id', prontuarioController.buscarPorId);

export default router;