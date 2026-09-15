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

/**
 * @openapi
 * /api/consultas:
 *   get:
 *     tags: [Consultas]
 *     summary: Lista as consultas
 *     parameters:
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filtra as consultas pelo status
 *         schema:
 *           type: string
 *           enum: [Agendada, Cancelada, Concluida]
 *         example: Agendada
 *     responses:
 *       200:
 *         description: Lista de consultas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consulta'
 */
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