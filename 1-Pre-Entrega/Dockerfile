FROM node

# Establece el directorio de trabajo en /home/app
WORKDIR /home/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package.json ./

COPY .env ./

# Instala las dependencias
RUN npm install

# Copia el código fuente al directorio de trabajo
COPY src/ ./src/

# Expone el puerto en el que la aplicación escucha (puede que necesites ajustar esto)
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm", "start"]