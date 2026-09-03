import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/', authController.login);
router.post('/veterinario', authController.loginVeterinario);

export default router;