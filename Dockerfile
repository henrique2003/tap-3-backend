# Use uma imagem oficial do Node.js para build
FROM node:20-alpine AS builder

# Crie o diretório de trabalho
WORKDIR /app

# Copie package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instale as dependências
RUN npm install --production

# Copie o resto do código
COPY . .

# Compile o projeto NestJS
RUN npm run build

# --- Build final ---

FROM node:20-alpine

WORKDIR /app

# Copie apenas os arquivos necessários do build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Exponha a porta da aplicação (ajuste se for outra)
EXPOSE 3333

# Comando para rodar o app em produção
CMD ["node", "dist/main.js"]
