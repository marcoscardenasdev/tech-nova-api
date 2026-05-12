<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Pasos para ejecutar el proyecto

1. Clonar el proyecto
2. Instalar las depedencias
```
npm install
```
3. Renombrar el archivo ```.env.template``` a ```.env``` y configurar las variables de entorno
4. Generar los modelos de prisma
```
npx prisma generate
```
5. Ejecutar el proyecto
```
npm run start:dev
```