import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

const SELECT_PRONTUARIO_PUBLICO = {
  id: true,
  consultaId: true,
  diagnostico: true,
  prescricao: true,
 dataRetorno: true,

} as const;

interface CriarProntuarioInput {
  diagnostico: string;
  prescricao: string;
  dataRetorno: Date | null;
  consultaId: number;
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
interface AtualizarProntuarioInput {
  diagnostico?: string;
  prescricao?: string;
  dataRetorno?: Date | null;
}

export async function atualizarProntuario(
  id: number,
  dados: AtualizarProntuarioInput
) {
  const prontuario = await prisma.prontuario.findUnique({
    where: { id },
  });

  if (!prontuario) {
    throw new AppError('Prontuário não encontrado.', 404);
  }

  return prisma.prontuario.update({
    where: { id },
    data: dados,
    select: SELECT_PRONTUARIO_PUBLICO,
  });
}