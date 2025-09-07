# 💬 Word Cloud App por Grupo

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=node.js\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat\&logo=react\&logoColor=61DAFB)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat\&logo=docker\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat\&logo=postgresql\&logoColor=white)

Crie grupos e compartilhe palavras em nuvens interativas.
Sistema de nuvem de palavras segregada por grupos, cada grupo possui uma URL exclusiva onde usuários podem visualizar e enviar palavras. A criação e gerenciamento de grupos é autenticada via JWT.

---

## 📑 Índice

* [Tecnologias](#-tecnologias)
* [Rodando com Docker](#-rodando-com-docker)
* [Banco de Dados (PostgreSQL)](#-banco-de-dados-postgresql)
* [Backend com Node.js + Express](#-backend-com-nodejs--express)

  * [Dependências](#dependências)
  * [.env exemplo](#env-exemplo)
  * [Rotas protegidas](#✨-rotas-protegidas-autenticadas)
  * [Rotas públicas](#🌐-rotas-públicas)
* [Frontend com React](#-frontend-com-react)

  * [Dependências](#dependências-1)
  * [Variáveis de ambiente](#variáveis-de-ambiente)
* [Usabilidade](#usabilidade)
* [Funcionalidades](#-funcionalidades)

---

## 🧩 Tecnologias

* Frontend: React (com rotas, axios, react-d3-cloud)
* Backend: Node.js + Express
* Banco de Dados: PostgreSQL
* Autenticação: JWT
* Contêinerização: Docker, Docker Compose

---

## 🐳 Rodando com Docker

### Pré-requisitos

1. Clone o repositório:

```bash
git clone https://github.com/fahledu/wordcloud
cd wordcloud
```

2. Crie e configure os arquivos `.env` backend e frontend.

#### Backend `.env` (wordcloud-backend)

```env
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@db:5432/wordcloud
JWT_SECRET=sua_chave_super_secreta
```

> **Nota:** Você pode gerar uma chave JWT com:

```bash
openssl rand -hex 32
```

#### Frontend `.env` (wordcloud-frontend)

```env
REACT_APP_API_URL=http://localhost:3001
```

3. Na raiz do projeto (onde está o `docker-compose.yml`), rode:

```bash
docker-compose up --build
```

Aplicações:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:3001](http://localhost:3001)
* PostgreSQL: `localhost:5432`

---

## 🛠️ Banco de Dados (PostgreSQL)

> **Nota:** Ao subir o container já é criado o banco e as tabelas automaticamente via script `wordcloud-backend/init.sql`.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
  word VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ⚙️ Backend com Node.js + Express

### Dependências

```bash
npm install express cors pg bcrypt jsonwebtoken dotenv
```

### ✨ Rotas protegidas (autenticadas)

Usuário:

* `POST /auth/register` — Criação de usuário
* `POST /auth/login` — Retorna token JWT

Grupos:

* `GET /groups` — Listar grupos (privado)
* `POST /groups` — Criar grupo (privado)
* `PUT /groups/:id` — Editar grupo (privado)
* `DELETE /groups/:id` — Excluir grupo (privado)

### 🌐 Rotas públicas

* `GET /words/:groupName` — Listar palavras do grupo
* `POST /words/:groupName` — Adicionar palavra à nuvem

---

## 💻 Frontend com React

### Dependências

```bash
npm install axios react-router-dom react-d3-cloud d3 d3-cloud --legacy-peer-deps
```

> **Nota:** A flag `--legacy-peer-deps` é usada para forçar a compatibilidade do `react-d3-cloud` com React 19.

### Variáveis de ambiente

```env
REACT_APP_API_URL=http://localhost:3001
```

---

## Usabilidade

Após subir os containers e configurar o `.env`:

1. Crie um usuário enviando requisição POST usando o cliente de sua preferência (Postman, Insomnia, curl, etc) para `http://localhost:3001/auth/register`:

Exemplo:

```json
{
  "email" : "teste@teste.com",
  "password" : "123"
}
```

2. Faça login no frontend: [http://localhost:3000/login](http://localhost:3000/login)
3. Crie um novo grupo
4. Acesse URLs por grupo:

* Visualização pública: `http://localhost:3000/group/NOME_DO_GRUPO`
* Envio de palavras: `http://localhost:3000/group/NOME_DO_GRUPO/submit`

---

## ✅ Funcionalidades

* 🔐 Login com email e senha (JWT)
* 📋 CRUD de grupos autenticado
* 🌐 Visualização pública da nuvem
* ➕ Envio de palavras sem login
* 🎨 Nuvem com visual interativo usando `react-d3-cloud`
