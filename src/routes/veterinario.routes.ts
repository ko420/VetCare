import { Router } from 'express';
import * as veterinarioController from '../controllers/veterinario.controller';

const router = Router();

router.post('/', veterinarioController.criar);
router.get('/', veterinarioController.listar);
router.get('/:id', veterinarioController.buscarPorId);

export default router;