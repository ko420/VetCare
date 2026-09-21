import { Router } from 'express';
import * as animalController from '../controllers/animal.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @openapi
 * /api/animais:
 *   post:
 *     tags: [Animais]
 *     summary: Cadastra um novo animal
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, raca, especie, datanascimento, clienteId, selvagem, porte, registroLegal]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Thor"
 *               raca:
 *                 type: string
 *                 example: "Golden Retriever"
 *               especie:
 *                 type: string
 *                 example: "Cachorro"
 *               datanascimento:
 *                 type: string
 *                 format: date-time
 *                 example: "2022-05-10T00:00:00.000Z"
 *               clienteId:
 *                 type: integer
 *                 example: 1
 *               selvagem:
 *                 type: boolean
 *                 example: false
 *               porte:
 *                 type: string
 *                 example: "Grande"
 *               registroLegal:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       201:
 *         description: Animal cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/', authMiddleware, animalController.criar);
/**
 * @openapi
 * /api/animais:
 *   get:
 *     tags: [Animais]
 *     summary: Lista todos os animais
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de animais cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/', authMiddleware, animalController.listar);
/**
 * @openapi
 * /api/animais/{id}:
 *   get:
 *     tags: [Animais]
 *     summary: Busca um animal pelo id
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
 *         description: Animal encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Animal não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.get('/:id', authMiddleware, animalController.buscarPorId);
/**
 * @openapi
 * /api/animais/{id}:
 *   put:
 *     tags: [Animais]
 *     summary: Atualiza o nome de um animal
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
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Thor Junior"
 *     responses:
 *       200:
 *         description: Animal atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       401:
 *         description: Token ausente, inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 *       404:
 *         description: Animal não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.put('/:id', authMiddleware,animalController.atualizar);

export default router;