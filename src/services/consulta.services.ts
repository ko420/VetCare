import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface CriarConsultaInput {
   categoriaId: number;
  dataHorario: Date;
  status: string;
  veterinarioId: number;
  animalId: number;
}
interface AtualizarConsultaInput {
  dataHorario?: Date;
  status?: string;
  veterinarioId?: number;
  animalId?: number;
}


export async function criarConsulta(dados: CriarConsultaInput) {
  const categoria  = await prisma.categoriaConsulta.findUnique({
    where: { id: dados.categoriaId },
  });

  if (!categoria) {
    throw new AppError('Categoria de consulta não encontrada.', 404);
  }

  const consulta = await prisma.consulta.create({
    data: { ...dados, categoriaId: categoria.id },
    include: { categoria: true },
  });

  return consulta;
}

export async function listarConsultas(statusDisponibilidade?: string) {
  return prisma.consulta.findMany({
    where: statusDisponibilidade ? { status: statusDisponibilidade } : undefined,
    include: { categoria: true },
    orderBy: { id: 'asc' },
  });
}

export async function buscarConsultaPorId(id: number) {
  const consulta = await prisma.consulta.findUnique({
    where: { id },
    include: { categoria: true },
  });

  if (!consulta) {
    throw new AppError('Consulta não encontrada.', 404);
  }

  return consulta;
}
export async function atualizarConsulta(id: number, dados: AtualizarConsultaInput) {

  await buscarConsultaPorId(id);

  return prisma.consulta.update({
    where: { id },
    data: dados,
    include: { categoria: true },
  });
}