# Usa una imagen base de Node
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que el servidor Angular estará escuchando
EXPOSE 4200

# Comando para iniciar el servidor Angular
CMD ["npm", "start"]
