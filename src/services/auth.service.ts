
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface LoginInput {
  email: string;
  telefone: string;
}

interface LoginVeterinarioInput {
  email: string;
  crmv: string;
}


export async function login(dados: LoginInput) {
  const cliente = await prisma.cliente.findUnique({
    where: { email: dados.email },
  });


  if (!cliente || cliente.telefone !== dados.telefone) {
    throw new AppError('E-mail ou telefone inválidos.', 401);
  }

  const token = jwt.sign(
    {
      id: cliente.id,
      email: cliente.email,
      tipo: 'cliente',
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'],
    }
  );

  return {
    token,
    cliente: {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
    },
  };
}


export async function loginVeterinario(dados: LoginVeterinarioInput) {
  const veterinario = await prisma.veterinario.findUnique({
    where: { crmv: dados.crmv },
  });

  
  if (!veterinario || veterinario.email !== dados.email) {
    throw new AppError('CRMV ou e-mail inválidos.', 401);
  }

  const token = jwt.sign(
    {
      id: veterinario.id,
      email: veterinario.email,
      tipo: 'veterinario',
      crmv: veterinario.crmv,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'],
    }
  );

  return {
    token,
    veterinario: {
      id: veterinario.id,
      nome: veterinario.nome,
      email: veterinario.email,
      crmv: veterinario.crmv,
      especialidade: veterinario.especialidade,
    },
  };
}