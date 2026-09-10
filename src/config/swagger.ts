import swaggerJSDoc from 'swagger-jsdoc';

// Este arquivo monta o DOCUMENTO OpenAPI da API inteira.
//
// A "definition" abaixo é a parte central e fixa do documento (título, versão,
// servidores, segurança e schemas reutilizáveis). A documentação de cada
// endpoint fica escrita em comentários "@openapi" dentro dos próprios arquivos
// de rota (src/routes/*.ts) — o swagger-jsdoc varre esses arquivos (campo
// "apis" lá no final) e junta tudo num único JSON.
export const swaggerSpec = swaggerJSDoc({
  definition: {
    // Versão da ESPECIFICAÇÃO OpenAPI (a "gramática" do documento),
    // não confundir com a versão da nossa API (que fica em info.version).
    openapi: '3.0.3',

    info: {
      title: 'VetCare API',
      version: '1.0.0',
      description:
  'API RESTful do sistema de clínica veterinária VetCare. ' +
  'Permite o gerenciamento de clientes, animais, veterinários, consultas e prontuários. ' +
  'Faça login para obter um token JWT e use o botão **Authorize** para testar as rotas protegidas.',
    },

    servers: [
      { url: 'http://localhost:3333', description: 'Ambiente de desenvolvimento' },
    ],

    
    tags: [
      { name: 'Autenticação', description: 'Login e emissão de token JWT' },
      { name: 'Clientes', description: 'Cadastro e consulta de clientes, consultas e prontuários' },
      { name: 'Animais', description: 'Cadastro e consulta de animais' },
      { name: 'Veterinários', description: 'Cadastro e consulta de veterinários, consultas e prontuários, criação de prontuários e consultas' },
      { name: 'Prontuários', description: 'Registro de prontuários' },
       { name: 'Consultas', description: 'Registro de consultas' },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Cosle aqui o token devolvido pelo POST /api/auth/login (sem o prefixo "Bearer").',
        },
      },

      // Schemas reutilizáveis: cada um descreve o FORMATO de um objeto que a
      // API recebe ou devolve. As rotas referenciam com:
      //   $ref: '#/components/schemas/NomeDoSchema'
      schemas: {
        RespostaErro: {
          type: 'object',
          properties: {
            erro: { type: 'string', example: 'Mensagem explicando o que deu errado.' },
          },
        },

        Cliente: {
          type: 'object',
           description: 'Cliente cadastrado na clínica veterinária.',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Cliente Teste' },
            cpf: { type: 'string', example: '12345678900' },
            email: { type: 'string', format: 'email', example: 'cliente@teste.com' },
            telefone: { type: 'string', example: '11999999999' },
            criadoEm: { type: 'string', format: 'date-time' },
            atualizadoEm: { type: 'string', format: 'date-time' },
          },
        },

        CategoriaConsulta: {
          type: 'object',
          description: 'Veterinário cadastrado na clínica veterinária.',
          properties: {
            id: { type: 'integer', example: 1 },
            nomeCategoria: { type: 'string', example: 'Consulta Clínica' },
            valorConsulta: { type: 'number', example: 120 },
            criadoEm: { type: 'string', format: 'date-time' },
            atualizadoEm: { type: 'string', format: 'date-time' },
           
          },
        },

      Animal: {
          type: 'object',
          description: 'Animal da cadastrado na clínica veterinária.',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Cliente Teste' },
            raça: { type: 'string', example: 'Persa' },
            especie: { type: 'string', example: 'Gato' },
            dataNascimento: { type: 'string', example: '2022-01-01' },
            porte: { type: 'string', example: 'Grande' },
            selvagem: { type: 'boolean', example: false },
            registroLegal: { type: 'string', nullable: true, example: null },
            clienteId: { type: 'integer', example: 1 },
            criadoEm: { type: 'string', format: 'date-time' },
            atualizadoEm: { type: 'string', format: 'date-time' },
          },
        },

       Veterinario: {
          type: 'object',
          description: 'Veterinário da clínica veterinária.',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Veterinário Teste' },
            crmv: { type: 'string', example: 'RJ23456' },
            especialidade: { type: 'string', example: 'Clínica Geral' },
            email: { type: 'string', format: 'email', example: 'veterinario@teste.com' },
            telefone: { type: 'string', example: '11999999999' },
            criadoEm: { type: 'string', format: 'date-time' },
            atualizadoEm: { type: 'string', format: 'date-time' },
          },
        },

     Consulta: {
  type: 'object',
  description: 'Consulta veterinária agendada para um animal.',
  properties: {
    id: { type: 'integer', example: 6 },
    categoriaId: { type: 'integer', example: 1 },
    animalId: { type: 'integer', example: 5 },
    veterinarioId: { type: 'integer', example: 3 },
    dataHorario: { type: 'string', format: 'date-time', example: '2026-10-12T14:00:00.000Z' },
    status: { type: 'string', example: 'Agendada' },
    domiciliar: { type: 'boolean', example: false },
    categoria: { $ref: '#/components/schemas/CategoriaConsulta' },
  },
},

Prontuario: {
  type: 'object',
  description: 'Prontuário veterinário vinculado a uma consulta.',
  properties: {
    id: { type: 'integer', example: 1 },
    consultaId: { type: 'integer', example: 6 },
    diagnostico: { type: 'string', nullable: true, example: 'Otite leve' },
    prescricao: { type: 'string', nullable: true, example: 'Medicação por 7 dias' },
    dataRetorno: { type: 'string', format: 'date-time', nullable: true, example: '2026-10-28T14:00:00.000Z' },



          
         },
        },
      },
    },
  },

  // Onde o swagger-jsdoc procura os comentários "@openapi".
  // O segundo padrão cobre a versão COMPILADA (npm run build + npm start):
  // o tsc mantém os comentários no .js gerado, então a documentação
  // continua funcionando em produção.
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
});