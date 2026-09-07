# Backend I - Sistema de Turnos y Reservas

Proyecto backend desarrollado con Node.js y Express para la gestión de servicios y reservas.

En esta entrega se migró la persistencia de datos desde FileSystem a MongoDB Atlas utilizando Mongoose, manteniendo la arquitectura en capas y los endpoints existentes.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- JavaScript ES Modules

## Arquitectura

El proyecto utiliza una arquitectura en capas:

```text
Router
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
DAO
  ↓
Mongoose
  ↓
MongoDB Atlas
```

### Router

Define los endpoints de la API y deriva las solicitudes hacia los controllers.

### Controller

Recibe las solicitudes HTTP, ejecuta la lógica correspondiente mediante la capa Service y devuelve las respuestas HTTP.

### Service

Contiene las validaciones y la lógica de negocio de la aplicación.

### Repository

Actúa como intermediario entre la lógica de negocio y la capa de acceso a datos.

### DAO

Gestiona el acceso a MongoDB utilizando los modelos de Mongoose.

## Estructura del proyecto

```text
src/
├── config/
│   ├── database.js
│   └── env.config.js
├── controllers/
│   ├── bookings.controller.js
│   └── services.controller.js
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
│   └── services.router.js
├── services/
│   ├── bookings.service.js
│   └── services.service.js
├── app.js
└── server.js
```

## Modelos de Mongoose

### Service

Los servicios contienen:

- `name`
- `description`
- `duration`
- `price`
- `category`
- `available`

### Booking

Las reservas contienen:

- `clientName`
- `clientEmail`
- `date`
- `time`
- `status`
- `services`

Los servicios asociados a una reserva se almacenan mediante referencias `ObjectId`:

```js
services: [
  {
    service: ObjectId,
    quantity: Number
  }
]
```

El campo `service` referencia al modelo `Service`.

### Message

Se incluye el modelo `Message` solicitado para la persistencia de mensajes en MongoDB.

No se agregaron endpoints de mensajes porque no forman parte de los endpoints requeridos en esta entrega.

## Endpoints

### Services

#### Obtener todos los servicios

```http
GET /api/services
```

Permite filtros opcionales por `category` y `available`.

#### Obtener un servicio por ID

```http
GET /api/services/:sid
```

#### Crear un servicio

```http
POST /api/services
```

#### Actualizar un servicio

```http
PUT /api/services/:sid
```

#### Eliminar un servicio

```http
DELETE /api/services/:sid
```

### Bookings

#### Crear una reserva

```http
POST /api/bookings
```

#### Obtener una reserva por ID

```http
GET /api/bookings/:bid
```

#### Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Si el servicio ya se encuentra asociado a la reserva, se incrementa su `quantity`.

## Variables de entorno

Crear un archivo `.env` tomando como referencia `.env.example`:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=URI_DE_CONEXION_A_MONGODB_ATLAS
```

La variable `MONGO_URI` contiene la cadena de conexión a MongoDB Atlas.

El archivo `.env` no se incluye en el repositorio para proteger las credenciales.

## Instalación

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
npm start
```

Con la configuración por defecto, la API estará disponible en:

```text
http://localhost:8080
```

## Persistencia

La aplicación utiliza MongoDB Atlas como base de datos.

Mongoose se utiliza para definir los modelos y realizar las operaciones de persistencia.

La migración reemplazó la persistencia anterior basada en archivos JSON sin modificar las rutas públicas de la API.

## Seguridad

El proyecto utiliza variables de entorno para almacenar información sensible.

Los siguientes archivos y carpetas no deben subirse al repositorio:

```text
.env
node_modules/
```