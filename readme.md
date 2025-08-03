
# 💬 Word Cloud App por Grupo

Sistema de nuvem de palavras segregada por grupos. Cada grupo possui uma URL exclusiva onde usuários podem visualizar e enviar palavras. A criação e gerenciamento de grupos é autenticada via JWT.

---

## 🧩 Tecnologias

- Frontend: React (com rotas, axios, react-wordcloud)
- Backend: Node.js + Express
- Banco de Dados: PostgreSQL
- Autenticação: JWT
- Deploy:
  - Frontend: Vercel
  - Backend: Railway
- Contêinerização: Docker, Docker Compose

---

## 🛠️ ETAPA 1 — Banco de Dados (PostgreSQL)

> **Nota:** O `docker-compose` já cria o banco e executa as tabelas automaticamente via script.

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

## ⚙️ ETAPA 2 — Backend com Node.js + Express

### Dependências:

```bash
npm install express cors pg bcrypt jsonwebtoken dotenv
```

### `.env` exemplo:

```env
PORT=3001
DATABASE_URL=postgresql://usuario:senha@host:porta/dbname
JWT_SECRET=sua_chave_super_secreta
```

---

### ✨ Rotas protegidas (autenticadas)

- `POST /auth/register` — Criação de usuário
- `POST /auth/login` — Retorna token JWT
- `GET /groups` — Listar grupos (privado)
- `POST /groups` — Criar grupo (privado)
- `PUT /groups/:id` — Editar grupo (privado)
- `DELETE /groups/:id` — Excluir grupo (privado)

---

### 🌐 Rotas públicas

- `GET /words/:groupName` — Listar palavras do grupo
- `POST /words/:groupName` — Adicionar palavra à nuvem

---

## 💻 ETAPA 3 — Frontend com React

### Dependências:

```bash
npm install axios react-router-dom react-d3-cloud d3 d3-cloud --legacy-peer-deps
```

> **Nota:** A flag `--legacy-peer-deps` é usada para forçar a compatibilidade do `react-d3-cloud` com React 19. Caso prefira usar React 18, não é necessário usar essa flag.

### Variáveis de ambiente:

```env
REACT_APP_API_URL=http://localhost:3001
```

---

## 🔗 URLs por grupo

- Visualização pública:  
  `http://localhost:3000/group/NOME_DO_GRUPO`

- Envio de palavras:  
  `http://localhost:3000/group/NOME_DO_GRUPO/submit`

---

## 🐳 ETAPA 4 — Rodando com Docker

1. Certifique-se de ter Docker e Docker Compose instalados.
2. Configure os arquivos `.env` no backend e frontend com as variáveis necessárias.
3. Na raiz do projeto (onde está o `docker-compose.yml`), rode:

```bash
docker-compose up --build
```

4. Acesse as aplicações:

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend API: [http://localhost:3001](http://localhost:3001)  
- PostgreSQL: `localhost:5432` (use um cliente PostgreSQL para acessar, se desejar)

---

## 🚀 Deploy

### Backend (Railway)

1. Crie um projeto no Railway.
2. Adicione o plugin PostgreSQL.
3. Copie a variável `DATABASE_URL`.
4. Faça deploy do repositório.
5. Configure o arquivo `.env` no Railway com `DATABASE_URL` e `JWT_SECRET`.

### Frontend (Vercel)

1. Suba o código no GitHub.
2. Importe o projeto no Vercel.
3. Configure a variável `REACT_APP_API_URL` com a URL pública do backend no Railway.

---

## ✅ Funcionalidades

- 🔐 Login com email e senha (JWT)
- 📋 CRUD de grupos autenticado
- 🌐 Visualização pública da nuvem
- ➕ Envio de palavras sem login
- 🎨 Nuvem com visual interativo usando `react-d3-cloud`

---

Se quiser, posso ajudar a revisar outras partes do projeto ou criar exemplos de código. Só avisar!
