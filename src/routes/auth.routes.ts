import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

/**
 * @openapi
 * /api/auth/cliente:
 *   post:
 *     tags: [Autenticação]
 *     summary: Faz login e devolve um token JWT
 *     description: >
 *       Troca e-mail + telefone por um token JWT com validade de 1 dia.
 *       Use o token no botão **Authorize** para acessar as rotas protegidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, telefone]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: marina@teste.com
 *               telefone:
 *                 type: string
 *                 example: "11988887777"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIs...
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: E-mail ou telefone inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */

router.post('/cliente', authController.login);
/**
 * @openapi
 * /api/auth/veterinario:
 *   post:
 *     tags: [Autenticação]
 *     summary: Faz login do veterinário e devolve um token JWT
 *     description: >
 *       Autentica o veterinário usando CRMV e e-mail.
 *       O token retornado pode ser usado no botão Authorize para acessar rotas protegidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [crmv, email]
 *             properties:
 *               crmv:
 *                 type: string
 *                 example: "12345-RJ"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: carlos@vetcare.com
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIs...
 *                 veterinario:
 *                   $ref: '#/components/schemas/Veterinario'
 *       401:
 *         description: CRMV ou e-mail inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaErro'
 */
router.post('/veterinario', authController.loginVeterinario);

export default router;