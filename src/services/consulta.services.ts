import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

const SELECT_CONSULTA_PUBLICO = {
  id: true,
  datahorario: true,
  status: true,


} as const;

interface CriarConsultaInput {
  datahorario: Date;
  status: string;
}
export async function criarConsulta(dados: CriarConsultaInput) {
   const consultaCriada = await prisma.consulta.create({
        data: dados,
        select: SELECT_CONSULTA_PUBLICO,
    });
    return consultaCriada;

}

export async function listarConsultas() {
  return prisma.consulta.findMany({
    select: SELECT_CONSULTA_PUBLICO,
    orderBy: { id: 'asc' },
  });
}

export async function buscarConsultaPorId(id: number) {
  const consulta = await prisma.consulta.findUnique({
    where: { id },
    select: SELECT_CONSULTA_PUBLICO,
  });

  if (!consulta) {
    throw new AppError('Consulta não encontrada.', 404);
  }

  return consulta;
}