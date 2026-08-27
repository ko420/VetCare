import { Router } from 'express';
import * as consultaController from '../controllers/consulta.controller';

const router = Router();

router.post('/', consultaController.criar);
router.get('/', consultaController.listar);
router.get('/:id', consultaController.buscarPorId);

export default router;