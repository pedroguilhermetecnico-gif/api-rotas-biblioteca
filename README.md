# API de Gestão de Biblioteca Digital

API RESTful desenvolvida em Node.js com TypeScript para gerenciamento de usuários, acervo de livros e controle de empréstimos.

## Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Framework:** Express
- **ORM:** Prisma
- **Banco de Dados:** SQLite
- **Autenticação:** JWT (JSON Web Token)
- **Criptografia:** bcryptjs
- **Validação de Dados:** Zod

## Arquitetura do Projeto

O projeto segue uma arquitetura em camadas bem definida:

- `src/controllers`: Responsável pelo recebimento das requisições e respostas HTTP.
- `src/services`: Contém as regras de negócio e comunicação com o banco via Prisma.
- `src/models`: Schemas de validação Zod e tipagens.
- `src/routes`: Mapeamento e proteção de endpoints.
- `src/middlewares`: Middlewares de validação de token JWT.

## Como Executar o Projeto

1. Clone o repositório e instale as dependências:
   ```bash
   npm install