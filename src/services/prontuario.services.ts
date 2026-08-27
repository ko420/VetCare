import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

const SELECT_PRONTUARIO_PUBLICO = {
  id: true,
  diagnostico: true,
  prescricao: true,


} as const;

interface CriarProntuarioInput {
  diagnostico: string;
  prescricao: string;
}
export async function criarProntuario(dados: CriarProntuarioInput) {
   const prontuarioCriado = await prisma.prontuario.create({
        data: dados,
        select: SELECT_PRONTUARIO_PUBLICO,
    });
    return prontuarioCriado;

}

export async function listarProntuarios() {
  return prisma.prontuario.findMany({
    select: SELECT_PRONTUARIO_PUBLICO,
    orderBy: { id: 'asc' },
  });
}

export async function buscarProntuarioPorId(id: number) {
  const prontuario = await prisma.prontuario.findUnique({
    where: { id },
    select: SELECT_PRONTUARIO_PUBLICO,
  });

  if (!prontuario) {
    throw new AppError('Prontuário não encontrado.', 404);
  }

  return prontuario;
}