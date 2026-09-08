import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

const SELECT_ANIMAL_PUBLICO = {
  id: true,
  nome: true,
  raca: true,
  especie: true,
  datanascimento: true,
  cliente: {
    select: {
      id: true,
      nome: true,
      email: true,
    }
  }
} as const;

interface CriarAnimalInput {
  nome: string;
  raca: string;
  especie: string;
  datanascimento: Date;
  clienteId: number;
  selvagem?: boolean;
  porte?: string;
  registroLegal?: string;
}
export async function criarAnimal(dados: CriarAnimalInput) {
  if (dados.selvagem && !dados.registroLegal) {
  throw new AppError(
    'Animais selvagens precisam possuir registro ou autorização legal.',
    400
  );
}
   const animalCriado = await prisma.animal.create({
        data: dados,
        select: SELECT_ANIMAL_PUBLICO,
    });
    return animalCriado;

}

export async function listarAnimais() {
  return prisma.animal.findMany({
    select: SELECT_ANIMAL_PUBLICO,
    orderBy: { id: 'asc' },
  });
}

export async function buscarAnimalPorId(id: number) {
  const animal = await prisma.animal.findUnique({
    where: { id },
    select: SELECT_ANIMAL_PUBLICO,
  });

  if (!animal) {
    throw new AppError('Animal não encontrado.', 404);
  }

  return animal;
}