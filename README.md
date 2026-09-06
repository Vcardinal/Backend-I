# Backend I - Sistema de Turnos y Reservas

Proyecto desarrollado para Backend I.

Esta aplicación implementa una API REST para gestionar servicios y reservas de un sistema de turnos utilizando Node.js, Express y persistencia mediante FileSystem en archivos JSON.

## Tecnologías utilizadas

- Node.js
- JavaScript
- Express
- ECMAScript Modules (ESM)
- dotenv
- FileSystem (`fs`)
- JSON

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Variables de entorno

El proyecto utiliza `dotenv` para manejar las variables de entorno.

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

El servidor utiliza el puerto definido en `.env`.

Por ejemplo:

```text
http://localhost:8080
```

## Estructura del proyecto

```text
src/
├── app.js
├── server.js
├── routes/
│   ├── services.router.js
│   └── bookings.router.js
├── managers/
│   ├── ServiceManager.js
│   └── BookingManager.js
├── data/
│   ├── services.json
│   └── bookings.json
└── config/
    └── env.config.js

package.json
.env.example
.gitignore
README.md
```

# Servicios

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

## Endpoints de servicios

### Obtener todos los servicios

```http
GET /api/services
```

Respuesta exitosa:

```text
200 OK
```

También permite filtrar mediante query parameters.

Ejemplos:

```http
GET /api/services?category=Peluquería
```

```http
GET /api/services?available=true
```

### Obtener un servicio por ID

```http
GET /api/services/:sid
```

Respuestas posibles:

```text
200 OK
404 Not Found
```

### Crear un servicio

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

El `id` no se envía en el body porque se genera automáticamente.

Todos los campos son requeridos.

Respuestas posibles:

```text
201 Created
400 Bad Request
```

### Actualizar un servicio

```http
PUT /api/services/:sid
```

Ejemplo:

```json
{
  "duration": 90,
  "price": 2200,
  "available": false
}
```

El `id` original del servicio no puede modificarse.

Respuestas posibles:

```text
200 OK
404 Not Found
```

### Eliminar un servicio

```http
DELETE /api/services/:sid
```

Respuestas posibles:

```text
200 OK
404 Not Found
```

# Reservas

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

Una reserva puede crearse inicialmente con el array `services` vacío.

## Servicios dentro de una reserva

Cuando se agrega un servicio a una reserva se almacena de esta forma:

```json
{
  "service": 1,
  "quantity": 1
}
```

Si el mismo servicio se agrega nuevamente, no se crea otro elemento. En cambio, se incrementa `quantity`:

```json
{
  "service": 1,
  "quantity": 2
}
```

## Endpoints de reservas

### Crear una reserva

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

El `id` es generado automáticamente y la reserva puede comenzar con:

```json
"services": []
```

Respuesta exitosa:

```text
201 Created
```

Si faltan campos requeridos:

```text
400 Bad Request
```

### Obtener una reserva por ID

```http
GET /api/bookings/:bid
```

Respuestas posibles:

```text
200 OK
404 Not Found
```

### Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Ejemplo:

```http
POST /api/bookings/1/services/1
```

Antes de agregar el servicio se valida que:

- exista la reserva;
- exista el servicio.

Si ambos existen, el servicio se agrega con `quantity: 1`.

Si ya se encuentra en la reserva, se incrementa su `quantity`.

Respuestas posibles:

```text
200 OK
404 Not Found
```

# Managers

## ServiceManager

Ubicación:

```text
src/managers/ServiceManager.js
```

Métodos implementados:

- `getServices`
- `getServiceById`
- `addService`
- `updateService`
- `deleteService`

El manager se encarga de leer y modificar:

```text
src/data/services.json
```

## BookingManager

Ubicación:

```text
src/managers/BookingManager.js
```

Métodos implementados:

- `createBooking`
- `getBookingById`
- `addServiceToBooking`

El manager se encarga de leer y modificar:

```text
src/data/bookings.json
```

# Resumen de endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services/:sid` | Obtener servicio por ID |
| POST | `/api/services` | Crear servicio |
| PUT | `/api/services/:sid` | Actualizar servicio |
| DELETE | `/api/services/:sid` | Eliminar servicio |
| POST | `/api/bookings` | Crear reserva |
| GET | `/api/bookings/:bid` | Obtener reserva por ID |
| POST | `/api/bookings/:bid/services/:sid` | Agregar servicio a reserva |

# Persistencia con FileSystem

Los datos se almacenan en archivos JSON:

```text
src/data/services.json
src/data/bookings.json
```

Los managers utilizan FileSystem para leer y escribir estos archivos.

Por lo tanto, los datos persisten aunque el servidor sea reiniciado.

# Archivos ignorados

El proyecto utiliza `.gitignore` para evitar subir archivos que no deben formar parte del repositorio.

```text
node_modules/
.env
```

El archivo `.env.example` se incluye como referencia para configurar las variables de entorno necesarias.