FROM node:22

WORKDIR /app

COPY package*.json ./

# `--legacy-peer-deps` evita conflitos de React 19 com libs antigas
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
