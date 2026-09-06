# Backend I - Sistema de Turnos y Reservas

Proyecto desarrollado para Backend I.

La aplicación implementa una API REST para gestionar servicios de un sistema de turnos y reservas utilizando Node.js, Express y persistencia en un archivo JSON.

## Tecnologías utilizadas

- Node.js
- JavaScript
- Express
- ECMAScript Modules (ESM)
- dotenv
- File System (`fs`)
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

El servidor se ejecutará utilizando el puerto definido en `.env`.

Por ejemplo:

```text
http://localhost:8080
```

## Estructura del proyecto

```text
src/
├── config/
│   └── env.config.js
├── data/
│   └── services.json
├── managers/
│   └── ServiceManager.js
├── routes/
│   └── services.router.js
├── app.js
└── server.js
```

## Recurso Service

Cada servicio utiliza la siguiente estructura:

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

### Propiedades

- `id`: identificador único generado automáticamente.
- `name`: nombre del servicio.
- `description`: descripción del servicio.
- `duration`: duración del servicio.
- `price`: precio del servicio.
- `category`: categoría a la que pertenece.
- `available`: indica si el servicio está disponible.

## ServiceManager

La lógica de gestión de servicios se encuentra en:

```text
src/managers/ServiceManager.js
```

El manager permite:

- Obtener todos los servicios.
- Obtener un servicio por ID.
- Crear un servicio.
- Actualizar un servicio.
- Eliminar un servicio.
- Persistir los cambios en `src/data/services.json`.

El ID de cada nuevo servicio es generado internamente.

Al actualizar un servicio, su ID original no puede ser modificado.

## API REST

La API utiliza como ruta base:

```text
/api/services
```

### Obtener todos los servicios

```http
GET /api/services
```

Respuesta exitosa:

```text
200 OK
```

### Filtrar servicios

Se pueden utilizar query parameters para filtrar por categoría y disponibilidad.

Por categoría:

```http
GET /api/services?category=Peluquería
```

Por disponibilidad:

```http
GET /api/services?available=true
```

Los filtros se obtienen mediante `req.query`.

### Obtener un servicio por ID

```http
GET /api/services/:sid
```

El ID se obtiene mediante `req.params`.

Respuestas:

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

No se debe enviar un `id`, ya que es generado automáticamente.

El body se obtiene mediante `req.body`.

Respuestas:

```text
201 Created
400 Bad Request
```

Se devuelve `400 Bad Request` cuando falta alguno de los campos requeridos.

### Actualizar un servicio

```http
PUT /api/services/:sid
```

Ejemplo de body:

```json
{
  "duration": 90,
  "price": 2200,
  "available": false
}
```

El ID del servicio no puede ser modificado.

Respuestas:

```text
200 OK
404 Not Found
```

### Eliminar un servicio

```http
DELETE /api/services/:sid
```

Respuestas:

```text
200 OK
404 Not Found
```

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/services` | Obtiene todos los servicios |
| GET | `/api/services?category=...` | Filtra por categoría |
| GET | `/api/services?available=true` | Filtra por disponibilidad |
| GET | `/api/services/:sid` | Obtiene un servicio por ID |
| POST | `/api/services` | Crea un nuevo servicio |
| PUT | `/api/services/:sid` | Actualiza un servicio |
| DELETE | `/api/services/:sid` | Elimina un servicio |

## Códigos HTTP utilizados

- `200 OK`: operación realizada correctamente.
- `201 Created`: servicio creado correctamente.
- `400 Bad Request`: faltan datos requeridos.
- `404 Not Found`: servicio no encontrado.

## Persistencia

Los servicios se almacenan en:

```text
src/data/services.json
```

El `ServiceManager` utiliza el módulo `fs` de Node.js para leer y escribir los datos.

## Seguridad y configuración

Los siguientes archivos y directorios no deben subirse al repositorio:

```text
node_modules/
.env
```

Estos se encuentran incluidos en `.gitignore`.

El archivo `.env.example` se utiliza como referencia de las variables de entorno necesarias.