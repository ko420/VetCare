import { Router } from 'express';
import * as consultaController from '../controllers/consulta.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { veterinarioMiddleware } from '../middlewares/veterinario.middleware';

const router = Router();


/**
 * @openapi
 * /api/consultas:
 *   get:
 *     tags: [Consultas]
 *     summary: Lista todas as consultas
 *     security:
 *       - bearerAuth: []
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
 *         description: Lista de consultas cadastradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consulta'
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
  consultaController.listar
);
/**
 * @openapi
 * /api/consultas/{id}:
 *   get:
 *     tags: [Consultas]
 *     summary: Busca uma consulta pelo id
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
 *         description: Consulta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Consulta não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get(
  '/:id',
  authMiddleware,
  consultaController.buscarPorId
);
/**
 * @openapi
 * /api/consultas:
 *   post:
 *     tags: [Consultas]
 *     summary: Cria uma nova consulta
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [categoriaId, animalId, veterinarioId, dataHorario]
 *             properties:
 *               categoriaId:
 *                 type: integer
 *                 example: 1
 *               animalId:
 *                 type: integer
 *                 example: 1
 *               veterinarioId:
 *                 type: integer
 *                 example: 1
 *               dataHorario:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-20T14:00:00.000Z"
 *               status:
 *                 type: string
 *                 enum: [Agendada, Cancelada, Concluida]
 *                 example: Agendada
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       403:
 *         description: Acesso permitido apenas para veterinários
 *       404:
 *         description: Animal, veterinário ou categoria não encontrados
 */
router.post(
  '/',
  authMiddleware,
  veterinarioMiddleware,
  consultaController.criar
);
/**
 * @openapi
 * /api/consultas/{id}:
 *   put:
 *     tags: [Consultas]
 *     summary: Atualiza uma consulta
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
 *               categoriaId:
 *                 type: integer
 *                 example: 1
 *               animalId:
 *                 type: integer
 *                 example: 1
 *               veterinarioId:
 *                 type: integer
 *                 example: 1
 *               dataHorario:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-20T15:00:00.000Z"
 *               status:
 *                 type: string
 *                 enum: [Agendada, Cancelada, Concluida]
 *                 example: Concluida
 *     responses:
 *       200:
 *         description: Consulta atualizada com sucesso
 *       401:
 *         description: Token ausente, inválido ou expirado
 *       403:
 *         description: Acesso permitido apenas para veterinários
 *       404:
 *         description: Consulta não encontrada
 */
router.put(
  '/:id',
  authMiddleware,
  veterinarioMiddleware,
  consultaController.atualizar
);

export default router;