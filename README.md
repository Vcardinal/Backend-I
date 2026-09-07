# Backend I - Sistema de Turnos y Reservas

API REST desarrollada con Node.js y Express para gestionar servicios y reservas de un sistema de turnos.

La aplicación utiliza FileSystem para la persistencia de datos en archivos JSON y una arquitectura en capas basada en Routers, Controllers, Services, Repositories y DAO.

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
├── services/
│   ├── services.service.js
│   └── bookings.service.js
├── repositories/
│   ├── services.repository.js
│   └── bookings.repository.js
├── dao/
│   ├── services.dao.js
│   └── bookings.dao.js
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

La API está organizada utilizando una arquitectura en capas.

El flujo de una solicitud es:

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
Archivo JSON
```

Cada capa tiene una responsabilidad específica.

### Routers

Los routers definen los endpoints de la API y conectan cada ruta con la función correspondiente del controller.

No contienen lógica de negocio ni acceden directamente a los archivos JSON.

Ubicación:

```text
src/routes/
```

### Controllers

Los controllers reciben las requests y generan las responses HTTP.

Son la única capa que utiliza objetos de Express como:

- `req.params`
- `req.query`
- `req.body`
- `res.status()`
- `res.json()`

Los controllers llaman a la capa de services y no acceden directamente a repositories, DAO ni archivos JSON.

Ubicación:

```text
src/controllers/
```

### Services

Los services contienen las reglas de negocio de la aplicación.

Entre sus responsabilidades se encuentran:

- validar los campos requeridos;
- aplicar filtros de servicios;
- impedir la modificación del ID de un servicio;
- validar la existencia de reservas y servicios;
- incrementar `quantity` cuando un servicio ya existe dentro de una reserva.

Los services no utilizan `req` ni `res` y no acceden directamente a los archivos JSON.

Ubicación:

```text
src/services/
```

### Repositories

Los repositories funcionan como intermediarios entre los services y los DAO.

Exponen métodos de acceso a datos sin contener reglas de negocio ni acceder directamente a FileSystem.

Ubicación:

```text
src/repositories/
```

### DAO

Los DAO son responsables del acceso directo a la persistencia.

Realizan las operaciones de lectura y escritura sobre:

```text
src/data/services.json
src/data/bookings.json
```

No contienen lógica de negocio ni utilizan `req` o `res`.

Ubicación:

```text
src/dao/
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

El `id` se genera automáticamente.

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

Si el servicio no existe, la API responde con estado `404`.

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

Los campos requeridos son:

- `name`
- `description`
- `duration`
- `price`
- `category`
- `available`

El `id` se genera automáticamente y no debe enviarse en el body.

#### Actualizar un servicio

```http
PUT /api/services/:sid
```

El ID original del servicio no puede ser modificado aunque se envíe un valor diferente en el body.

#### Eliminar un servicio

```http
DELETE /api/services/:sid
```

## Capa de servicios para services

El archivo:

```text
src/services/services.service.js
```

implementa:

- `getServices`
- `getServiceById`
- `createService`
- `updateService`
- `deleteService`

La capa utiliza `ServicesRepository` para acceder a los datos.

## Repository y DAO de services

El repository:

```text
src/repositories/services.repository.js
```

expone:

- `getAll`
- `getById`
- `create`
- `update`
- `delete`

El DAO:

```text
src/dao/services.dao.js
```

realiza la persistencia sobre:

```text
src/data/services.json
```

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

El `id` se genera automáticamente.

Una nueva reserva comienza con el array `services` vacío.

### Servicios dentro de una reserva

Los servicios asociados a una reserva se almacenan de la siguiente forma:

```json
{
  "service": 1,
  "quantity": 1
}
```

Si se agrega nuevamente el mismo servicio a la misma reserva, no se crea un elemento duplicado.

En su lugar se incrementa `quantity`:

```json
{
  "service": 1,
  "quantity": 2
}
```

Esta regla de negocio se encuentra en:

```text
src/services/bookings.service.js
```

y no en el DAO.

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

Si la reserva no existe, la API responde con estado `404`.

#### Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Antes de agregar el servicio se valida:

- que la reserva exista;
- que el servicio exista.

Si el servicio ya se encuentra asociado a la reserva, se incrementa su `quantity`.

## Capa de servicios para bookings

El archivo:

```text
src/services/bookings.service.js
```

implementa:

- `createBooking`
- `getBookingById`
- `addServiceToBooking`

En esta capa se encuentra la regla de negocio que incrementa `quantity` cuando se agrega nuevamente el mismo servicio.

## Repository y DAO de bookings

El repository:

```text
src/repositories/bookings.repository.js
```

expone:

- `create`
- `getById`
- `update`

El DAO:

```text
src/dao/bookings.dao.js
```

realiza la persistencia sobre:

```text
src/data/bookings.json
```

La lógica para incrementar `quantity` no se encuentra en el DAO.

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

Los datos se almacenan mediante FileSystem en:

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

El archivo `.env.example` se incluye como referencia para configurar las variables de entorno necesarias.