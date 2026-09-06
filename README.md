# Backend I - Sistema de Turnos y Reservas

API REST desarrollada con Node.js y Express para gestionar servicios y reservas de un sistema de turnos.

En esta versión, la aplicación utiliza FileSystem para la persistencia de datos en archivos JSON y una arquitectura organizada en rutas, controllers y managers.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- ECMAScript Modules (ESM)
- FileSystem
- JSON
- dotenv

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Ejemplo:

```env
PORT=8080
NODE_ENV=development
```

El archivo `.env` no se incluye en el repositorio.

## Ejecución

Para iniciar el servidor:

```bash
npm start
```

El servidor utiliza el puerto configurado en `.env`.

Ejemplo:

```text
http://localhost:8080
```

## Estructura del proyecto

```text
src/
├── config/
│   └── env.config.js
├── controllers/
│   ├── services.controller.js
│   └── bookings.controller.js
├── managers/
│   ├── ServiceManager.js
│   └── BookingManager.js
├── routes/
│   ├── services.router.js
│   └── bookings.router.js
├── data/
│   ├── services.json
│   └── bookings.json
├── app.js
└── server.js

package.json
.env.example
.gitignore
README.md
```

## Arquitectura

La API está organizada separando responsabilidades en tres capas principales:

```text
Router → Controller → Manager → JSON
```

### Routers

Los routers se encargan únicamente de definir los endpoints y conectarlos con las funciones correspondientes de los controllers.

No contienen lógica de negocio ni acceso directo a los archivos JSON.

Ubicación:

```text
src/routes/
```

### Controllers

Los controllers reciben las requests y generan las responses.

Se encargan de utilizar:

- `req.params`
- `req.query`
- `req.body`
- `res.status().json()`

También llaman a los managers para realizar las operaciones necesarias.

Ubicación:

```text
src/controllers/
```

### Managers

Los managers contienen la lógica relacionada con los datos y la persistencia mediante FileSystem.

No utilizan `req` ni `res`.

Ubicación:

```text
src/managers/
```

## Servicios

El recurso `services` representa los servicios disponibles para reservar.

Cada servicio tiene la siguiente estructura:

```json
{
  "id": 1,
  "name": "Corte de cabello",
  "description": "Corte de cabello personalizado",
  "duration": 60,
  "price": 1500,
  "category": "Peluquería",
  "available": true
}
```

El `id` es generado automáticamente.

### Endpoints de servicios

#### Obtener todos los servicios

```http
GET /api/services
```

También permite filtros mediante query parameters:

```http
GET /api/services?category=Peluquería
```

```http
GET /api/services?available=true
```

#### Obtener un servicio por ID

```http
GET /api/services/:sid
```

#### Crear un servicio

```http
POST /api/services
```

Ejemplo de body:

```json
{
  "name": "Masaje relajante",
  "description": "Sesión de masaje relajante",
  "duration": 60,
  "price": 1800,
  "category": "Bienestar",
  "available": true
}
```

El `id` es generado automáticamente y no debe enviarse en el body.

#### Actualizar un servicio

```http
PUT /api/services/:sid
```

El `id` original no puede ser modificado.

#### Eliminar un servicio

```http
DELETE /api/services/:sid
```

## Controller de servicios

El archivo:

```text
src/controllers/services.controller.js
```

implementa las siguientes funciones:

- `getServices`
- `getServiceById`
- `createService`
- `updateService`
- `deleteService`

Estas funciones interactúan con `ServiceManager`.

## Reservas

El recurso `bookings` representa las reservas realizadas por los clientes.

Cada reserva tiene la siguiente estructura:

```json
{
  "id": 1,
  "clientName": "Ana Pérez",
  "clientEmail": "ana@email.com",
  "date": "2026-09-10",
  "time": "15:00",
  "status": "pending",
  "services": []
}
```

El `id` es generado automáticamente.

Una reserva puede iniciarse con el array `services` vacío.

### Servicios dentro de una reserva

Los servicios asociados a una reserva se almacenan de la siguiente forma:

```json
{
  "service": 1,
  "quantity": 1
}
```

Si se agrega nuevamente el mismo servicio, se incrementa `quantity` en lugar de crear un elemento duplicado.

Ejemplo:

```json
{
  "service": 1,
  "quantity": 2
}
```

### Endpoints de reservas

#### Crear una reserva

```http
POST /api/bookings
```

Ejemplo de body:

```json
{
  "clientName": "Ana Pérez",
  "clientEmail": "ana@email.com",
  "date": "2026-09-10",
  "time": "15:00",
  "status": "pending"
}
```

#### Obtener una reserva por ID

```http
GET /api/bookings/:bid
```

#### Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Antes de agregar el servicio se valida:

- que la reserva exista;
- que el servicio exista.

La existencia del servicio es validada desde el controller mediante `ServiceManager`.

## Controller de reservas

El archivo:

```text
src/controllers/bookings.controller.js
```

implementa:

- `createBooking`
- `getBookingById`
- `addServiceToBooking`

Estas funciones interactúan con `BookingManager`.

Para agregar un servicio a una reserva también se utiliza `ServiceManager` para validar que el servicio exista.

## Managers

### ServiceManager

Ubicación:

```text
src/managers/ServiceManager.js
```

Métodos:

- `getServices`
- `getServiceById`
- `addService`
- `updateService`
- `deleteService`

Administra la persistencia de:

```text
src/data/services.json
```

### BookingManager

Ubicación:

```text
src/managers/BookingManager.js
```

Métodos:

- `createBooking`
- `getBookingById`
- `addServiceToBooking`

Administra la persistencia de:

```text
src/data/bookings.json
```

## Resumen de endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services/:sid` | Obtener un servicio por ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings/:bid` | Obtener una reserva por ID |
| POST | `/api/bookings/:bid/services/:sid` | Agregar un servicio a una reserva |

## Persistencia

Los datos se almacenan utilizando FileSystem en:

```text
src/data/services.json
src/data/bookings.json
```

Los datos permanecen almacenados aunque el servidor sea reiniciado.

## Archivos ignorados

El archivo `.gitignore` evita subir al repositorio:

```text
node_modules/
.env
```

`.env.example` se incluye como referencia para configurar las variables de entorno necesarias.