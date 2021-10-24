# challenge-fullstack-reactjs-jorge-garcia

## Back-End

### Configuración de la base de datos

En el directorio **config** se encuentra el archivo json de configuracion **config.json**.

Se deben reemplazar los siguientes parametros en **development**:

* "username": "nombre_usuario_db",
* "password": "password_usuario_db",
* "database": "nombre_db",
* "host": "127.0.0.1",

### Instalar dependencias

* npm install

### Correr migracion de modelos

El proceso de migracion de modelos es muy similar a realizar una migración con Rails.
1. Instalar sequelize globalmente: `npm i sequelize -g`.
2. Correr migración: `sequelize db:migrate`.
3. Correr seed: `sequelize db:seed:all`.

En este punto, se han creado las tablas en la base de datos que representan los modelos con sus respectivas asociasiones.

### Correr proyecto

* npm run dev

### EndPoint 

Se utiliza el software Insomnia rest: https://insomnia.rest/download.

El archivo `Insomnia_2021-10-24.json` es una exportacion de la collección que se realizo para probar los distintos end_point de la aplicación.

