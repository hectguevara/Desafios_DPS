# 📚 BookTracker App — Desafío 3

Aplicación móvil desarrollada para el Desafío 3 de la materia DPS441. Permite a los usuarios llevar un registro de los libros que han leído, están leyendo o planean leer. Cada usuario puede registrarse, iniciar sesión y administrar su propia lista de libros.

La app está hecha con React Native (usando Expo) y se conecta a un backend creado con Node.js y Express, con base de datos SQLite usando Sequelize. Las rutas están protegidas con autenticación JWT y se almacenan los datos por usuario.

### Funcionalidades principales:
- Registro e inicio de sesión (con JWT)
- Agregar, editar y eliminar libros
- Estados del libro: por leer, leyendo, completado
- Campos opcionales: comentario, fecha de inicio, fecha de fin
- Libros privados para cada usuario

Probado con Postman y Expo Go. Proyecto dividido en carpetas `frontend/` y `backend/`.

**Estudiante:** H+ector David Guevara Escobar
**Carné:** GE233262  
**Materia:** DPS441  
**Universidad Don Bosco**