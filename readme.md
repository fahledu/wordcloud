# 💬 Word Cloud App por Grupo

Sistema de nuvem de palavras segregada por grupos. Cada grupo possui uma URL exclusiva onde usuários podem visualizar e enviar palavras. A criação e gerenciamento de grupos é autenticada via JWT.


🧩 Tecnologias
- Frontend: React (com rotas e Axios)
- Backend: Node.js + Express
- Banco de Dados: PostgreSQL
- Autenticação: JWT
- Deploy:
    - Frontend: Vercel
    - Backend: Railway

## 🛠️ ETAPA 1 — Banco de Dados (PostgreSQL)

Tabela de grupos
```sql
CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Tabela de palavras
```sql
CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
  word VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```
💡 Use o console SQL da Railway ou ferramentas como DBeaver ou PgAdmin para executar os comandos.

## ⚙️ ETAPA 2 — Backend com Node.js + Express

Estrutura de pastas

```bash
/backend
  /controllers
  /routes
  /middleware
  app.js
  db.js
  .env
```

Instalar dependências
```bash
npm install express cors pg bcrypt jsonwebtoken dotenv
```

Explicações das dependências
- express: servidor web rápido e minimalista
- cors: permite acesso do frontend (CORS headers)
- pg: cliente para conexão com PostgreSQL
- bcrypt: criptografia de senhas
- jsonwebtoken: geração e verificação de tokens JWT
- dotenv: carrega variáveis de ambiente do .env

Arquivo .env (exemplo)
```env
PORT=4000
DATABASE_URL=postgresql://usuario:senha@host:porta/dbname
JWT_SECRET=sua_chave_secreta
```

## 🌐 ETAPA 3 — Frontend com React
```bash
/frontend
  /pages
    /login
    /dashboard
    /group/[groupName] (público)
```

Instalar dependências
```bash
npm install axios react-router-dom
```

Explicações:
- axios: biblioteca para fazer requisições HTTP de forma simples (GET, POST, etc.)
- react-router-dom: biblioteca de rotas SPA (Single Page Application)

## 🔗 URL exclusiva por grupo
Cada grupo possui uma rota pública com a nuvem de palavras acessível por qualquer pessoa:

```bash
https://seuapp.vercel.app/group/<nome-do-grupo>
```

## 🚀 Deploy

### Backend (Railway)

1. Crie projeto no Railway
2. Provision PostgreSQL
3. Copie a DATABASE_URL
4. Conecte ao GitHub e deploye seu projeto
5. Configure .env com as variáveis do backend

### Frontend (Vercel)

1. Suba o frontend no GitHub
2. Importe para Vercel
3. Configure variável de ambiente:

```env
REACT_APP_API_URL=https://SEU_BACKEND.railway.app
```

## ✅ Funcionalidades

- 🔒 Criar/Login de grupo com senha (JWT)
- 🌐 Visualização pública de nuvem por grupo
- ➕ Envio de palavras sem login
- 🛡️ Cada grupo isolado (não vê palavras de outros)
- 🧠 Interface simples, didática e funcional