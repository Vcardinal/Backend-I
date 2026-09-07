# Backend I - Sistema de Turnos y Reservas

API backend desarrollada con Node.js y Express para la gestión de servicios y reservas.

Utiliza MongoDB Atlas con Mongoose, arquitectura en capas, validación con Zod, vistas con Handlebars y comunicación en tiempo real mediante Socket.io.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Zod
- Handlebars
- Socket.io
- dotenv
- JavaScript ES Modules

## Arquitectura

```text
Routes
  ↓
Middlewares / Validación
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
DAO
  ↓
Mongoose
  ↓
MongoDB Atlas
```

## API REST

### Services

```text
GET    /api/services
GET    /api/services/:sid
POST   /api/services
PUT    /api/services/:sid
DELETE /api/services/:sid
```

`GET /api/services` admite:

```text
category
available
page
limit
sortBy
order
```

Ejemplo:

```text
GET /api/services?category=Bienestar&available=true&page=1&limit=5&sortBy=price&order=desc
```

La respuesta incluye el listado y metadatos de paginación:

```text
total
page
limit
totalPages
hasPrevPage
hasNextPage
```

### Bookings

```text
POST /api/bookings
GET  /api/bookings/:bid
POST /api/bookings/:bid/services/:sid
```

Los servicios de una reserva se almacenan como referencias `ObjectId` junto con su `quantity`.

`GET /api/bookings/:bid` utiliza `populate` para devolver los datos completos de los servicios asociados.

## Validaciones

Zod valida los datos antes de llegar a MongoDB en:

```text
POST /api/services
PUT  /api/services/:sid
POST /api/bookings
POST /api/bookings/:bid/services/:sid
```

Los datos inválidos devuelven `400` con un mensaje descriptivo.

## Vistas

```text
GET /views/services
GET /views/availability
```

Las vistas utilizan Handlebars y datos reales almacenados en MongoDB.

## Socket.io

Al crear un servicio, el servidor emite `serviceCreated` y la vista de servicios se actualiza automáticamente sin recargar la página.

## Variables de entorno

Crear `.env` a partir de `.env.example`:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=URI_DE_MONGODB_ATLAS
```

`.env` y `node_modules/` están excluidos del repositorio.

## Instalación

```bash
npm install
npm start
```

Servidor:

```text
http://localhost:8080
```