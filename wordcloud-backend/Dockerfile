FROM node:22

WORKDIR /app

# Copiar apenas os manifests primeiro (melhora cache de build)
COPY package*.json ./

# Instalar dependências
RUN npm install --production

# Copiar código da aplicação
COPY . .

EXPOSE 3001

CMD ["npm", "start"]