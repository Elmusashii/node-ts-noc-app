# Consejos

1. Verificar la función de creación de la carpeta "Logs" o crearla manualmente.

# dev 
1. Clonar el archivo ".env.template" a un archivo ".env"
2. Configurar las variables de entorno.
3. Ejecutar el comando ``` npm install```
4. Levantar las bases de datos con el comando
```
docker compose up -d
```
5. Ejecutar 
``` 
npx prisma migrate dev
```
6. Verificar que en el archivo "schema.prisma" se encuentre la propiedad "createdAt" y coincida con la propiedad del "log.entity.ts"
7. Ejecutar ``` npm run dev```

