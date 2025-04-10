Proyecto de Autenticación con JWT y Gestión de Roles
----------------------------------------------------

Requisitos:
- Node.js (v12 o superior)
- MySQL (u otro gestor de base de datos)

Instalación:
1. Clona el repositorio y ubícate en la carpeta del proyecto.
2. Ejecuta "npm install" para instalar las dependencias.
3. Crea un archivo ".env" en la raíz del proyecto con el siguiente formato:

   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=Nombre_basededatos
   JWT_SECRET=frase_secreta
   PORT=3000

4. En tu gestor de base de datos, crea la base "Unidad3F".
5. Ejecuta el script de migración ubicado en "migrations/migration.sql" para crear las tablas necesarias.
6. Ejecuta "node server.js" para iniciar el servidor.
7. Abre tu navegador en "http://localhost:3000" y realiza las pruebas: regístrate, inicia sesión y prueba las operaciones en los posts.

Notas:
- Las operaciones de creación, actualización y eliminación de posts están restringidas a usuarios Admin.
- Los usuarios Editor solo pueden visualizar los posts.
- Asegúrate de que el archivo .env esté excluido del repositorio.

Alumno:
- Lisnar Valera

Materia: Backend
Universidad: Valle del Momboy
Docente: Yerson Gonzalez
