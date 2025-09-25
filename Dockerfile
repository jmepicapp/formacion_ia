# Dockerfile
# Imagen base ligera con Node.js LTS
FROM node:18-alpine

# Crear y usar directorio de trabajo
WORKDIR /app

# Copiar manifiestos primero para aprovechar la caché de Docker
COPY package*.json ./

# Instalar dependencias (usa npm por requisito)
# Si tienes dependencias opcionales que pueden fallar en Alpine, añade --omit=optional
RUN npm install

# Copiar el resto del código
COPY . .

# Establecer variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer el puerto de la app
EXPOSE 3000

# Comando por defecto (ajusta si tu start script es distinto)
# Asegúrate de tener "start" en package.json, p.ej. "node server.js"
CMD ["npm", "start"]