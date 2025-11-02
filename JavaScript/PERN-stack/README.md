# Proyecto PERN - Gestor de Tareas

Una aplicación web full-stack completa construida con el stack **PERN** (PostgreSQL, Express, React, Node.js). El proyecto implementa un sistema de autenticación de usuarios basado en JWT (guardado en cookies `httpOnly`) y un CRUD (Crear, Leer, Actualizar, Eliminar) completo para tareas personalizadas por usuario.

---

## 🚀 Características Principales

* **Autenticación de Usuarios:** Registro de nuevos usuarios e inicio de sesión.
* **Gestión de Sesión:** Uso de JSON Web Tokens (JWT) almacenados en cookies `httpOnly` para una sesión persistente y segura.
* **Rutas Protegidas:** Middleware en el backend (`isAuth`) y lógica en el frontend (`ProtectedRoute`) para proteger rutas.
* **CRUD de Tareas:** Los usuarios autenticados pueden crear, ver, editar y eliminar sus propias tareas.
* **Base de Datos Relacional:** Uso de PostgreSQL para almacenar usuarios y tareas.
* **Perfil de Usuario:** Los usuarios pueden ver su información de perfil, incluyendo un [Gravatar](https://es.gravatar.com/) generado a partir de su email.

---

## 🛠️ Stack de Tecnologías

Este proyecto utiliza una arquitectura de monorepo (o dos carpetas separadas) para el `frontend` y el `backend`.

### Backend
* **Node.js**
* **Express** (Para el servidor y enrutado de API)
* **PostgreSQL** (Base de datos)
* **`node-postgres` (pg)** (Cliente de PostgreSQL para Node.js)
* **`jsonwebtoken` (JWT)** (Para la generación de tokens de sesión)
* **`bcrypt`** (Para el hasheo de contraseñas)
* **`cookie-parser`** (Para manejar cookies en Express)
* **`cors`** (Para permitir la comunicación entre frontend y backend)

### Frontend
* **React**
* **Vite** (Como entorno de desarrollo y empaquetador)
* **React Router** (Para la navegación y rutas del cliente)
* **React Hook Form** (Para la gestión y validación de formularios)
* **Axios** (Para las peticiones a la API del backend)
* **Context API** (Para la gestión del estado global de autenticación y tareas)
* **Tailwind CSS** (Para el diseño y la interfaz de usuario)

---

## 🏁 Empezando (Guía de Instalación)

Sigue estos pasos para clonar y ejecutar el proyecto localmente.

### Prerrequisitos

* **Git**
* **Node.js** (Se recomienda usar `nvm` para gestionar versiones, ej: `nvm install 20`)
* **PostgreSQL** (Servidor de base de datos)

### 1. Configuración de la Base de Datos (PostgreSQL)

Primero, necesitas tener PostgreSQL instalado y un usuario y base de datos creados para el proyecto.

1.  **Instala PostgreSQL** (si aún no lo tienes):
    ```bash
    sudo apt update
    sudo apt install postgresql postgresql-contrib
    ```

2.  **Accede a la consola de PostgreSQL:**
    ```bash
    sudo -u postgres psql
    ```

3.  **Crea el usuario y la base de datos** (usa los nombres que definimos, o cámbialos y ajústalos en el `.env` del backend):
    ```sql
    -- 1. Crea el usuario (rol). RECUERDA cambiar 'tu_contraseña_segura'
    CREATE USER usuario WITH SUPERUSER PASSWORD 'tu_contraseña_segura';

    -- 2. Crea la base de datos
    CREATE DATABASE proyect_pern;

    -- 3. Asigna la base de datos al usuario
    ALTER DATABASE proyect_pern OWNER TO usuario;
    ```
4.  (Opcional) Si no lo tienes, instala **pgAdmin4** para visualizar la base de datos.

### 2. Configuración del Backend

1.  **Clona el repositorio:**
    ```bash
    git clone [https://tu-repositorio.git](https://tu-repositorio.git)
    cd tu-proyecto/backend 
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Crea el archivo de variables de entorno (`config.js`)** en la raíz de la carpeta `backend` y llénalo con los datos de tu base de datos:

    ```env
    # Configuración de la Base de Datos
    export const PORT = process.env.PORT || 3000;
    export const PG_PORT = process.env.PG_PORT || 5432;
    export const PG_HOST = process.env.PG_HOST || "localhost";
    export const PG_USER = process.env.PG_USER || "";
    export const PG_PASSWORD = process.env.PG_PASSWORD || "";
    export const PG_DATABASE = process.env.PG_DATABASE || "";
    export const ORIGIN = process.env.ORIGIN || "http://localhost:5173";

    # Secreto para firmar los JWT (usa un string largo y aleatorio)
    TOKEN_SECRET=un_secreto_muy_dificil_de_adivinar_123

    # URL del frontend (para CORS)
    FRONTEND_URL=http://localhost:5173
    ```

4.  **Ejecuta el servidor de backend:**
    ```bash
    npm run dev
    ```
    (El servidor debería estar corriendo en `http://localhost:3000`)

### 3. Configuración del Frontend

1.  **Abre una nueva terminal** y navega a la carpeta del frontend:
    ```bash
    cd tu-proyecto/frontend
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  (Opcional pero recomendado) Crea un archivo `.env` en la raíz de `frontend` para definir la URL de la API:
    ```env
    VITE_API_URL=http://localhost:3000/api
    ```
    *Asegúrate de que tu archivo `axios.js` lea esta variable (`import.meta.env.VITE_API_URL`) como `baseURL`.*

4.  **Ejecuta el cliente de desarrollo de Vite:**
    ```bash
    npm run dev
    ```
    (La aplicación estará disponible en `http://localhost:5173`)

---

## 📝 Nota sobre Cookies en Desarrollo (httpOnly)

Este proyecto está configurado para ejecutarse en un entorno de desarrollo `http://localhost`.

La configuración de cookies en el backend (`auth.controller.js`) está definida como:
```javascript
res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false // <-- false es crucial para localhost
});