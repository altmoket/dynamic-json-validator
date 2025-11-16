# 1. Imagen base
FROM node:20-alpine

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar todo el código
COPY . .

# 6. Compilar TypeScript
RUN npm run build

# 7. Exponer el puerto
EXPOSE 3000

# 8. Comando por defecto
CMD ["node", "dist/src/index.js"]