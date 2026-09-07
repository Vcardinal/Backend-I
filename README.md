# Backend I - Sistema de Turnos y Reservas

API backend desarrollada con Node.js y Express para la gestión de servicios y reservas.

El proyecto utiliza MongoDB Atlas con Mongoose, arquitectura en capas, vistas renderizadas con Handlebars y comunicación en tiempo real mediante Socket.io.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Handlebars
- Socket.io
- dotenv
- JavaScript ES Modules

## Arquitectura

```text
Routes
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

## Estructura

```text
src/
├── config/
│   ├── database.js
│   └── env.config.js
├── controllers/
│   ├── bookings.controller.js
│   ├── services.controller.js
│   └── views.controller.js
├── dao/
│   ├── bookings.dao.js
│   └── services.dao.js
├── models/
│   ├── booking.model.js
│   ├── message.model.js
│   └── service.model.js
├── repositories/
│   ├── bookings.repository.js
│   └── services.repository.js
├── routes/
│   ├── bookings.router.js
│   ├── services.router.js
│   └── views.router.js
├── services/
│   ├── bookings.service.js
│   └── services.service.js
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── services.handlebars
│   └── availability.handlebars
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── socket.js
├── app.js
└── server.js
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

### Bookings

```text
POST /api/bookings
GET  /api/bookings/:bid
POST /api/bookings/:bid/services/:sid
```

Las reservas almacenan los servicios mediante referencias `ObjectId` al modelo `Service`.

## Vistas

```text
GET /views/services
GET /views/availability
```

Las vistas utilizan datos reales almacenados en MongoDB y acceden a ellos mediante la arquitectura en capas existente.

## Socket.io

Al crear un servicio mediante:

```text
POST /api/services
```

el servidor emite el evento `serviceCreated`.

`public/js/socket.js` escucha este evento y actualiza la vista de servicios automáticamente sin recargar la página.

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