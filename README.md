# 🏥 Clínica Médica — API REST & Frontend

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

**Link do vídeo:** https://drive.google.com/drive/folders/1WKumN4q6i6yxxQjrbWdzxNk2qUnlQmPl?usp=sharing

## Integrantes
* **Nome:** Robson Bevenuto da Silva | **RGM:** 45723133 - Responsável pelo Backend, Banco de Dados e Frontend.

## 📌 Sobre o Projeto
Sistema completo para gestão de clínica médica, desenvolvido em Node.js e TypeScript, aplicando boas práticas de arquitetura em camadas (Controllers, Services e Repositories), validação com Zod, persistência com Prisma ORM e banco de dados PostgreSQL.

## 🛠️ Tecnologias Utilizadas
* **Runtime & Linguagem:** Node.js & TypeScript
* **Framework Web:** Express
* **ORM:** Prisma
* **Validação:** Zod (schemas compartilhados entre API e frontend na pasta `shared/`)
* **Frontend:** React + Vite + Mantine + Axios
* **Senhas:** bcryptjs (hash)
* **Banco de Dados:** PostgreSQL 16
* **Containerização:** Docker & Docker Compose

## 📂 Arquitetura do Projeto (Monorepo)
```text
clinica/
├── package.json          # Configuração do Monorepo
├── docker-compose.yml    # Container do PostgreSQL
├── shared/               # Schemas de validação (Zod) compartilhados
│   └── src/
├── clinica-api/          # Backend (API REST)
│   ├── prisma/           # Schema, Migrations e Seed
│   └── src/
│       ├── controllers/  # Recebem as requisições
│       ├── middlewares/  # Validação com Zod
│       ├── repositories/ # Acesso ao banco (Prisma)
│       ├── routes/       # Definição das rotas
│       └── services/     # Regras de negócio
└── clinica-frontend/     # Frontend (React + Vite)
    └── src/

    🚀 Como Executar o Projeto
Pré-requisitos
Node.js (v20 ou superior)

Docker & Docker Compose (ou PostgreSQL instalado localmente)

1. Clonar o repositório
bash
git clone https://github.com/robsonbevenuto/clinica.git
cd clinica
2. Instalar as dependências (na raiz, instala todos os workspaces)
bash
npm install
3. Subir o banco de dados via Docker
bash
docker compose up -d
(Se estiver usando um banco local, pule este passo e certifique-se de que o PostgreSQL está rodando).

4. Configurar variáveis de ambiente
Crie o arquivo clinica-api/.env a partir do exemplo:

bash
cp clinica-api/.env.example clinica-api/.env
(Verifique se a DATABASE_URL no arquivo .env aponta para o seu banco, usando o usuário postgres e a senha 12345).

5. Gerar o Prisma Client, sincronizar o banco e rodar o seed
bash
cd clinica-api
npx prisma generate
npx prisma db push
npx prisma db seed
cd ..
6. Iniciar a API (Backend)
bash
npm run dev -w clinica-api
A API estará acessível em http://localhost:3000 e a documentação Swagger em http://localhost:3000/docs.

7. Iniciar o Frontend
Abra um novo terminal na raiz e rode:

bash
npm run dev -w clinica-frontend
O sistema estará acessível em http://localhost:5173.

🔑 Usuário para Teste (Seed)
E-mail: admin@clinica.com

Senha: 123456

🛰️ Rotas da API (Endpoints)
Pacientes
Método	Rota	Descrição
GET	/pacientes	Lista todos os pacientes
GET	/pacientes/:id	Retorna detalhes de um paciente específico
POST	/pacientes	Cadastra um novo paciente
PUT	/pacientes/:id	Atualiza os dados de um paciente
DELETE	/pacientes/:id	Remove um paciente da base
Médicos
Método	Rota	Descrição
GET	/medicos	Lista todos os médicos
GET	/medicos/:id	Retorna detalhes de um médico específico
POST	/medicos	Cadastra um novo médico
PUT	/medicos/:id	Atualiza os dados de um médico
DELETE	/medicos/:id	Remove um médico da base
Consultas
Método	Rota	Descrição
GET	/consultas	Lista todas as consultas (com dados do médico e paciente)
POST	/consultas	Agenda uma nova consulta
PUT	/consultas/:id	Atualiza os dados de uma consulta
DELETE	/consultas/:id	Remove uma consulta da base
text





