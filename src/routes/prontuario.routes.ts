import { Router } from 'express';
import * as prontuarioController from '../controllers/prontuario.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { veterinarioMiddleware } from '../middlewares/veterinario.middleware';

const router = Router();
/**
 * @openapi
 * /api/prontuarios/{id}:
 *   get:
 *     tags: [Prontuários]
 *     summary: Busca um prontuário pelo id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Prontuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prontuario'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Prontuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get(
  '/:id',
  authMiddleware,
  prontuarioController.buscarPorId
);
/**
 * @openapi
 * /api/prontuarios:
 *   get:
 *     tags: [Prontuários]
 *     summary: Lista todos os prontuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de prontuários cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prontuario'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get(
  '/',
  authMiddleware,
  prontuarioController.listar
);
/**
 * @openapi
 * /api/prontuarios/{id}:
 *   put:
 *     tags: [Prontuários]
 *     summary: Atualiza um prontuário
 *     description: Rota permitida apenas para veterinários autenticados.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagnostico:
 *                 type: string
 *                 example: "Infecção leve no ouvido."
 *               prescricao:
 *                 type: string
 *                 example: "Aplicar medicamento por 7 dias."
 *               dataRetorno:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-30T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Prontuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prontuario'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       403:
 *         description: Acesso permitido apenas para veterinários
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Prontuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.put(
  '/:id',
  authMiddleware,
  veterinarioMiddleware,
  prontuarioController.atualizar
);

export default router;