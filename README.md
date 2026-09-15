# Sistema de Inscripción - U.E. Especial Guido Villagómez Anexo

Proyecto de Diseño de Sistemas (SIS-3651) - Facultad Nacional de Ingeniería - UTO

## Equipo
## Estructura

sistemas-inscripcion-diseno/
- backend/  -> Node.js + Express + TypeScript
- frontend/ -> React + Vite + TypeScript

## Como ejecutar

### 1. Clonar

git clone https://github.com/maucito7/sistema-inscripcion-guido-villagomez.git
cd sistema-inscripcion-guido-villagomez

### 2. Instalar dependencias

cd backend
npm install
cd ../frontend
npm install

### 3. Arrancar Backend (Terminal 1)

cd backend
npm run dev

Debe mostrar: Servidor corriendo en http://localhost:4000

### 4. Arrancar Frontend (Terminal 2)

cd frontend
npm run dev

Debe mostrar: VITE ready - http://localhost:5173

### 5. Abrir en navegador

http://localhost:5173

## Usuarios de prueba

- admin / admin123 (ADMINISTRADOR)
- secretaria / secre123 (SECRETARIA)
- tutor / tutor123 (TUTOR)

## Integracion con Base de Datos Real

Actualmente el backend usa un array en memoria en backend/src/services/usuarios.service.ts.

Para conectar la base de datos real:

1. Crear tabla Usuarios con campos: id, usuario, contrasena (hash bcrypt), rol, nombre
2. Reemplazar el array usuariosDB por consultas SQL
3. Instalar driver: npm install mssql (SQL Server), npm install mysql2 (MySQL) o npm install pg (PostgreSQL)
4. Configurar credenciales de conexion en un archivo .env

## Endpoint de Login

POST http://localhost:4000/api/auth/login

Body:
{ "usuario": "admin", "contrasena": "admin123" }

Respuesta:
{ "exito": true, "token": "...", "usuario": { "id": 1, "nombre": "Denzel Yugar", "rol": "ADMINISTRADOR" } }

## Tecnologias

- Backend: Node.js, Express, TypeScript, bcrypt, jsonwebtoken
- Frontend: React, Vite, TypeScript, axios
- Seguridad: JWT + hash bcrypt

## Notas

- Contrasenas encriptadas con bcrypt (nunca en texto plano)
- Bloqueo tras 3 intentos fallidos
- Token JWT expira en 2 horas
- Redireccion por rol (ADMINISTRADOR / SECRETARIA / TUTOR)
