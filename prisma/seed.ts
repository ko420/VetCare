import { prisma } from '../src/config/prisma';

async function main() {
  console.log('Iniciando o seed da base de dados do VetCare...');

  const cliente1 = await prisma.cliente.upsert({
  where: {
    telefone: '11911111111',
  },
  update: {
    nome: 'João Silva',
    cpf: '11111111111',
    email: 'joao@teste.com',
  },
  create: {
    nome: 'João Silva',
    cpf: '11111111111',
    email: 'joao@teste.com',
    telefone: '11911111111',
  },
});

const cliente2 = await prisma.cliente.upsert({
  where: {
    telefone: '11922222222',
  },
  update: {
    nome: 'Maria Souza',
    cpf: '22222222222',
    email: 'maria@teste.com',
  },
  create: {
    nome: 'Maria Souza',
    cpf: '22222222222',
    email: 'maria@teste.com',
    telefone: '11922222222',
  },
});

const cliente3 = await prisma.cliente.upsert({
  where: {
    telefone: '11933333333',
  },
  update: {
    nome: 'Carlos Lima',
    cpf: '33333333333',
    email: 'carlos@teste.com',
  },
  create: {
    nome: 'Carlos Lima',
    cpf: '33333333333',
    email: 'carlos@teste.com',
    telefone: '11933333333',
  },
});

  const clientes = [cliente1, cliente2, cliente3];

  function clienteAleatorio() {
    const indice = Math.floor(Math.random() * clientes.length);
    return clientes[indice];
  }


  const consultaNormal = await prisma.categoriaConsulta.create({
    data: {
      nomeCategoria: 'Consulta Clínica',
      valorConsulta: 120,
    },
  });

  const consultaDomiciliar = await prisma.categoriaConsulta.create({
    data: {
      nomeCategoria: 'Consulta Domiciliar',
      valorConsulta: 180,
    },
  });

  const consultaSilvestre = await prisma.categoriaConsulta.create({
    data: {
      nomeCategoria: 'Consulta de Silvestres',
      valorConsulta: 250,
    },
  });

  console.log(
    'Categorias criadas: Clínica, Domiciliar e Silvestres.'
  );



  const veterinarioClinico = await prisma.veterinario.create({
    data: {
      nome: 'Ana Souza',
      crmv: 'RJ12345',
      especialidade: 'Clínica Geral',
      email: 'ana@vetcare.com',
    },
  });

  const veterinarioDomiciliar = await prisma.veterinario.create({
    data: {
      nome: 'Bruno Lima',
      crmv: 'RJ23456',
      especialidade: 'Atendimento Domiciliar',
      email: 'bruno@vetcare.com',
    },
  });

  const veterinarioSilvestre = await prisma.veterinario.create({
    data: {
      nome: 'Carla Mendes',
      crmv: 'RJ34567',
      especialidade: 'Animais Silvestres e Exóticos',
      email: 'carla@vetcare.com',
    },
  });

  console.log('3 veterinários criados.');



  const thor = await prisma.animal.create({
    data: {
      nome: 'Thor',
      especie: 'Cachorro',
      raca: 'Labrador',
      datanascimento: new Date('2021-05-10'),
      selvagem: false,
      registroLegal: null,
      clienteId: cliente3.id,
      porte: 'Médio',
    },
  });

  const luna = await prisma.animal.create({
    data: {
      nome: 'Luna',
      especie: 'Gato',
      raca: 'Siamês',
      porte: 'Pequeno',
      selvagem: false,
      registroLegal: null,
      datanascimento: new Date('2022-08-15'),
      clienteId: cliente2.id,
    },
  });

  const joca = await prisma.animal.create({
    data: {
      nome: 'Joca',
      especie: 'Jabuti-piranga',
      raca: 'Jabuti',
      selvagem: true,
      porte: 'Pequeno',
      registroLegal: 'Registro Ambiental XYZ123',
      datanascimento: new Date('2018-03-20'),
      clienteId: cliente1.id,
    },
  });

  const loro = await prisma.animal.create({
    data: {
      nome: 'Loro',
      especie: 'Papagaio-verdadeiro',
      raca: 'Papagaio',
      selvagem: true,
      porte: 'Pequeno',
      registroLegal: 'Registro Ambiental ABC456',
      datanascimento: new Date('2020-01-12'),
      clienteId: cliente1.id,
    },
  });

  console.log('4 animais criados.');

  await prisma.consulta.create({
    data: {
      animalId: thor.id,
      veterinarioId: veterinarioClinico.id,
      categoriaId: consultaNormal.id,
      dataHorario: new Date('2026-09-10T10:00:00'),
      status: 'Agendada',
    },
  });

 
  await prisma.consulta.create({
    data: {
      animalId: luna.id,
      veterinarioId: veterinarioDomiciliar.id,
      categoriaId: consultaDomiciliar.id,
      dataHorario: new Date('2026-09-11T14:00:00'),
      status: 'Agendada',
    },
  });

  
  await prisma.consulta.create({
    data: {
      animalId: joca.id,
      veterinarioId: veterinarioSilvestre.id,
      categoriaId: consultaSilvestre.id,
      dataHorario: new Date('2026-09-12T09:00:00'),
      status: 'Agendada',
    },
  });

 
  await prisma.consulta.create({
    data: {
      animalId: loro.id,
      veterinarioId: veterinarioSilvestre.id,
      categoriaId: consultaSilvestre.id,
      dataHorario: new Date('2026-09-12T11:00:00'),
      status: 'Agendada',
    },
  });

  console.log('4 consultas de teste criadas.');

  console.log('Seed do VetCare concluído com sucesso!');
}

main()
  .catch((erro) => {
    console.error('Erro ao executar o seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });