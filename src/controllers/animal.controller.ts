import { Request, Response } from 'express';
import * as animalService from '../services/animal.services';

export async function criar(req: Request, res: Response): Promise<void> {
  const { nome, raca, especie, datanascimento, } = req.body;

  const animal = await animalService.criarAnimal({nome, raca, especie, datanascimento });

   res.status(201).json(animal);
}

export async function listar(_req: Request, res: Response): Promise<void> {
  const animais = await animalService.listarAnimais();
  res.status(200).json(animais);
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);

  const animal = await animalService.buscarAnimalPorId(id);

  res.status(200).json(animal);
}