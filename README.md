# La sorpresa

### Estado
Este proyecto se encuentra parcialmente completado, es posible que algunas de sus interfaces se encuentren temporalmente con datos representativos, y no con datos en tiempo real, principalmente los modulos que manejan información de los retos en la sección de cursos.

### Descripción del proyecto:
<p>La sorpresa es un proyecto desarrollado para la evaluación del segundo semestre del tercer año de la carrera de diseño gráfico y multimedia, el principal objetivo es la creación de una interfaz que admita videos y usuarios</p>

<p>Este proyecto busca poner a prueba la creatividad y capacidad de los estudiantes para la creación de interfaces interactivas y atractivas para usuarios, además de evaluar la capacidad para la creación de videos educativos que posteriormente subirán a la plataforma creada. El proyecto se encuentra desarrollado utilizando una arquitectura dividida en <strong>Frontend</strong> y <strong>Backend</strong>, permitiendo separar la interfaz de usuario de la lógica del servidor y la conexión con la base de datos.</p>

### Algunos requisitos que necesitas antes de instalar y ejecutar la aplicación son:
<p>NOTA: Los requerimientos que se presentan a continuación son correspondientes al nivel en el que se encuentra actualmente el proyecto, por lo que es posible que en un futuro se actualicen o se agreguen nuevos.</p>

##### **Requerimientos técnicos (Frontend):**

- Node.js
- npm
- React 19.2.7
- Vite 8.1.1

**Librerías principales:**

- axios
- emailjs/browser
- react-icons
- react-router-dom
- tailwindcss
- react-hot-toast
- lucide-react

##### **Requerimientos tecnicos (Backend):**

- Node.js >= 22.18.0
- npm >= 10.9.3
- Express >= 5.1.0
- MySQL

**Librerías principales:**

- cors
- dotenv
- bcrypt
- express
- helmet
- jsonwebtoken
- mysql
- nodemon

### Instalación:

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

```text
  1. Requisitos previos

  - Node.js y npm instalados.
  - MySQL instalado y en funcionamiento.
  - Visual Studio Code u otro editor de código.
```

```text
2. Clona el repositorio:

-> git clone https://github.com/Cristmp/LaSorpresa.git
```

```text
3. Abre el proyecto desde Visual Studio Code y desde la terminal navega hasta la carpeta del proyecto:

-> cd La-sorpresa-Vite
```

**Instalación del Backend:**

```text
4. Navega hasta la carpeta backend:

-> cd backend
```

```text
5. Instala las dependencias: 

-> npm install
```

**Instalación del Frontend:**

```text
5. Sal de la carpeta backend y entra a la carpeta de frontend para instalar las dependencias necesarias:

-> cd ..
-> cd frontend
-> npm install
```

```text
Crear la estructura de base de datos:
-> En la estructura principal del proyecto, abre la carpeta "docs", luego Queries-Lasorpresa.sql , ahí encontraras el código de base de datos, con datos de prueba también
-> En MySQL crea una nueva base de datos y en un scrypt usa la estructura encontrada en el archivo Queries-Lasorpresa.sql para crear la base de datos.
```

los queries de los videos predeternimados en la seccion del curso funcionan de manera local, es decir, los queries llaman a la ruta del proyecto, ya que los videos no se guardan de manera externa.
```text
si quieres visualizar los videos dentro del mismo proyecto, primero descarga los videos adjuntados en el siguiente drive:

"https://drive.google.com/drive/folders/1TR1hNl3YExRICQMnrdgK3xrCB7CxHXVh?usp=drive_link"

crea una carpeta dentro de frontend/public/ con el nombre de "videos", y ahí agrega todos los videos que descargaste en el drive. Con todo eso hecho, los queries se ejecutan correctamente y se pueden vizualizar los videos sin problema
```

```text
Luego regresa a visual studio code y configura las variables de entorno:
-> Crea un archivo ".env" en la carpeta backend

El backend utiliza variables de entorno para establecer la conexión con la base de datos MySQL.

Debes crear un archivo .env dentro de la carpeta backend:

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=tu_password
- DB_NAME=lasorpresa

Debes reemplazar los valores anteriores por las credenciales correspondientes a tu instalación de MySQL
```

```text
Ejecuta la aplicación: 
-> Abre una primera terminal y navega hasta la carpeta backend:

-> cd La-sorpresa-Vite/backend
-> Ejecuta npm start
```

```text
-> Luego abre una segunda terminal y navega hasta la carpeta frontend(Dejando la primera terminal en funcionamiento):

-> cd La-sorpresa-Vite/frontend
-> Ejecuta npm run dev
```

### Estructura Modular

```text
La-sorpresa-Vite/
│
├── backend/            # Servidor (Node.js/Express)
│   ├── config/
│   │   └── db.js         # Conexión a la base de datos
│   ├── controllers/      # Controladores
│   ├── routes/
│   │   └── rutas.js      # Rutas de las API'S
│   ├── src/
│   │   └── server.js         # Configuración de express y servidor
│   └── package.json
│
└── frontend/           # Vista de la aplicación web (React + Vite)
     ├── src/
     │   ├── components/     # Componentes globales (Login, Navbar, etc.)
     │   ├── pages/          # Vistas principales (Inicio, Catálogo, Cursos.)
     │   ├── App.jsx         # Enrutamiento y estructura principal
     │   └── main.jsx        # Punto de entrada de la app
     ├── public/             # Archivos estáticos públicos
     └── package.json

```
### Scripts disponibles:
**Frontend:**

- **npm run dev** - Inicia el servidor de desarrollo de Vite.

**backend:**

- **npm start** - Inicia el servidor Express utilizando Nodemon.

### Usabilidad:

Una vez iniciados el frontend y backend:

- Abre el navegador y en la barra de URL utiliza http://localhost:5173/
- Desde la pantalla inicial podrás acceder a varias pantallas y al inicio de sesión.
- Una vez has iniciado sesión en la aplicación podrás navegar entre las diferentes funcionalidades.

### Contribución:

Para contribuir al proyecto:

- Crea una nueva rama para tu funcionalidad a través de Git 
- Realiza cambios manteniendo la estructura modular del proyecto.
- Utiliza buenas prácticas de programación y commits.
- Verifica que el proyecto continúe funcionando correctamente.

### Futuras mejoras:

Algunas funcionalidades que pueden incorporarse posteriormente son:

- Creación de pantallas para los roles de administrador
- Implementación de autenticación más robusta.
- Mejoras de rendimiento y experiencia de usuario.
- Mejoras en el responsive

### Licencia:

<p>Este proyecto se encuentra bajo la licencia MIT.</p>
