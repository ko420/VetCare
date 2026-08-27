import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

const SELECT_VETERINARIO_PUBLICO = {
  id: true,
  nome: true,
  crmv: true,
  especialidade: true,
  email: true,

} as const;

interface CriarVeterinarioInput {
  nome: string;
  crmv: string;
  especialidade: string;
  email: string;
}
export async function criarVeterinario(dados: CriarVeterinarioInput) {
   const veterinarioCriado = await prisma.veterinario.create({
        data: dados,
        select: SELECT_VETERINARIO_PUBLICO,
    });
    return veterinarioCriado;

}

export async function listarVeterinarios() {
  return prisma.veterinario.findMany({
    select: SELECT_VETERINARIO_PUBLICO,
    orderBy: { id: 'asc' },
  });
}

export async function buscarVeterinarioPorId(id: number) {
  const veterinario = await prisma.veterinario.findUnique({
    where: { id },
    select: SELECT_VETERINARIO_PUBLICO,
  });

  if (!veterinario) {
    throw new AppError('Veterinário não encontrado.', 404);
  }

  return veterinario;
}