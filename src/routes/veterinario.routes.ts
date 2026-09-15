import { Router } from 'express';
import * as veterinarioController from '../controllers/veterinario.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @openapi
 * /api/veterinarios:
 *   post:
 *     tags: [Veterinários]
 *     summary: Cadastra um novo veterinário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, crmv, especialidade, email]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Carlos Almeida"
 *               crmv:
 *                 type: string
 *                 example: "12345-RJ"
 *               especialidade:
 *                 type: string
 *                 example: "Clínica Geral"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: carlos@vetcare.com
 *     responses:
 *       201:
 *         description: Veterinário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinario'
 *       409:
 *         description: CRMV ou e-mail já cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */

router.post('/', veterinarioController.criar);
router.get('/', authMiddleware, veterinarioController.listar);
/**
 * @openapi
 * /api/veterinarios/{id}:
 *   get:
 *     tags: [Veterinários]
 *     summary: Busca um veterinário pelo id
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
 *         description: Veterinário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinario'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Veterinário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', authMiddleware, veterinarioController.buscarPorId);

export default router;