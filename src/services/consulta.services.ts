import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface CriarConsultaInput {
   categoriaId: number;
  dataHorario: Date;
  status: string;
  veterinarioId: number;
  animalId: number;
  domiciliar?: boolean;
  criadoEm?: Date;
  atualizadoEm?: Date;
}
interface AtualizarConsultaInput {
  dataHorario?: Date;
  status?: string;
  veterinarioId?: number;
  animalId?: number;
}



export async function criarConsulta(dados: CriarConsultaInput) {
  const animal = await prisma.animal.findUnique({
  where: {
    id: dados.animalId,
  },
});

if (!animal) {
  throw new AppError('Animal não encontrado.', 404);
}
if (animal.porte === 'ExtraGrande' && !dados.domiciliar) {
  throw new AppError(
    'Animais de porte superior ao permitido só podem receber consulta domiciliar.',
    400
  );
}
const consultaNoMesmoHorario = await prisma.consulta.findFirst({
  where: {
    veterinarioId: dados.veterinarioId,
    dataHorario: dados.dataHorario,
  },
});

if (consultaNoMesmoHorario) {
  throw new AppError(
    'Este veterinário já possui uma consulta nesse horário.',
    409
  );
}

  const categoria  = await prisma.categoriaConsulta.findUnique({
    where: { id: dados.categoriaId },
  });

  if (!categoria) {
    throw new AppError('Categoria de consulta não encontrada.', 404);
  }
const categoriaEhDomiciliar =
  categoria.nomeCategoria.toLowerCase().includes('domiciliar');

if (dados.domiciliar && !categoriaEhDomiciliar) {
  throw new AppError(
    'Consultas domiciliares devem utilizar a categoria Consulta Domiciliar.',
    400
  );
}

if (!dados.domiciliar && categoriaEhDomiciliar) {
  throw new AppError(
    'A categoria Consulta Domiciliar só pode ser usada em atendimentos domiciliares.',
    400
  );
}
  const consulta = await prisma.consulta.create({
    data: { ...dados, categoriaId: categoria.id },
    include: { categoria: true },
  });


  await prisma.prontuario.create({
  data: {
    consultaId: consulta.id,
    diagnostico: null,
    prescricao: null,
    dataRetorno: null,
  },
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
export async function buscarPorId(id: number) {
  const consulta = await prisma.consulta.findUnique({
    where: { id },
    include: {
      categoria: true,
      animal: true,
      veterinario: true,
      prontuario: true,
    },
  });

  if (!consulta) {
    throw new AppError('Consulta não encontrada.', 404);
  }

  return consulta;
}
export async function atualizarConsulta(
  id: number,
  dados: AtualizarConsultaInput
) {
  const consultaAtual = await prisma.consulta.findUnique({
    where: { id },
  });

  if (!consultaAtual) {
    throw new AppError('Consulta não encontrada.', 404);
  }

  const veterinarioId =
    dados.veterinarioId ?? consultaAtual.veterinarioId;

  const dataHorario =
    dados.dataHorario ?? consultaAtual.dataHorario;

  const consultaNoMesmoHorario = await prisma.consulta.findFirst({
    where: {
      veterinarioId,
      dataHorario,
      id: {
        not: id,
      },
    },
  });

  if (consultaNoMesmoHorario) {
    throw new AppError(
      'Este veterinário já possui uma consulta nesse horário.',
      409
    );
  }

  return prisma.consulta.update({
    where: { id },
    data: dados,
  });
}