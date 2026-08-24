import { prisma } from '../config/prisma';
import {AppError} from '../middlewares/error.middleware';

const SELECT_CLIENTE_PUBLICO = {
    id: true,
    nome: true,
    email: true,
    telefone: true,
    cpf: true,
    criadoEm: true,
} as const;

interface CriarClienteInput {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
}

export async function criarCliente(dados: CriarClienteInput) {
   const clienteCriado = await prisma.cliente.create({
        data: dados,
        select: SELECT_CLIENTE_PUBLICO,
    });
    return clienteCriado;

}