import { Router } from 'express';
import * as animalController from '../controllers/animal.controller';

const router = Router();

router.post('/', animalController.criar);
router.get('/', animalController.listar);
router.get('/:id', animalController.buscarPorId);

export default router;