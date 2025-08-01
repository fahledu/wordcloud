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

---

## 🛠️ ETAPA 1 — Banco de Dados (PostgreSQL)

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

Estrutura de pastas:

```
/backend
  /routes
    auth.js
    groups.js
    words.js
  /middleware
    auth.js
  db.js
  app.js
  .env
```

Dependências:

```bash
npm install express cors pg bcrypt jsonwebtoken dotenv
```

`.env` exemplo:

```env
PORT=4000
DATABASE_URL=postgresql://usuario:senha@host:porta/dbname
JWT_SECRET=sua_chave_super_secreta
```

---

### ✨ Rotas protegidas com autenticação

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

Estrutura de pastas:

```
/frontend
  /src
    /pages
      LoginPage.jsx
      Dashboard.jsx
      GroupCloud.jsx       # Visualizar nuvem
      WordForm.jsx         # Enviar palavra
    /components
      ProtectedRoute.jsx
    api.js
    App.jsx
  .env
```

Dependências:

```bash
npm install axios react-router-dom react-d3-cloud d3 d3-cloud --legacy-peer-deps
```

Variáveis de ambiente:

```env
REACT_APP_API_URL=https://SEU_BACKEND.railway.app
```

---

## 🔗 URLs por grupo

- Visualização pública:  
  `https://seuapp.vercel.app/group/NOME_DO_GRUPO`

- Envio de palavras:  
  `https://seuapp.vercel.app/group/NOME_DO_GRUPO/submit`

---

## 🚀 Deploy

### Backend (Railway)

1. Crie projeto
2. Adicione PostgreSQL
3. Copie a `DATABASE_URL`
4. Faça deploy do repositório
5. Configure `.env` com `DATABASE_URL` e `JWT_SECRET`

### Frontend (Vercel)

1. Suba no GitHub
2. Importe no Vercel
3. Configure `REACT_APP_API_URL` com a URL pública do Railway

---

## ✅ Funcionalidades

- 🔐 Login com email e senha (JWT)
- 📋 CRUD de grupos autenticado
- 🌐 Visualização pública da nuvem
- ➕ Envio de palavras sem login
- 🎨 Nuvem com visual interativo usando `react-d3-cloud`
