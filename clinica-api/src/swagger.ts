import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clínica API',
      version: '1.0.0',
      description: 'Documentação da API do sistema de clínica',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Vai ler os comentários nas rotas
};

export const swaggerSpec = swaggerJSDoc(options);