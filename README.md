# Backend I - Sistema de Turnos y Reservas

Proyecto desarrollado con Node.js para gestionar servicios de un sistema de turnos y reservas.

El proyecto utiliza una clase `ServiceManager` que permite crear, consultar, actualizar y eliminar servicios, almacenando la información en un archivo JSON.

## Requisitos

* Node.js
* npm

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Variables de entorno

El proyecto utiliza `dotenv` para gestionar las variables de entorno.

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Variables necesarias:

```env
PORT=8080
NODE_ENV=development
```


El archivo `.env.example` contiene:

```env
PORT=
NODE_ENV=
```

## Ejecución

Para ejecutar el proyecto:

```bash
npm start
```

## Recurso Services

Cada servicio representa una prestación disponible dentro del sistema de turnos y reservas.

La estructura de un servicio es:

```js
{
  id,
  name,
  description,
  duration,
  price,
  category,
  available
}
```

### Propiedades

* `id`: identificador único generado automáticamente.
* `name`: nombre del servicio.
* `description`: descripción del servicio.
* `duration`: duración del servicio.
* `price`: precio del servicio.
* `category`: categoría a la que pertenece.
* `available`: indica si el servicio está disponible.

Los servicios se almacenan en:

```text
src/data/services.json
```

## ServiceManager

La clase `ServiceManager` se encuentra en:

```text
src/managers/ServiceManager.js
```

Permite gestionar los servicios mediante los siguientes métodos.

### getServices()

Devuelve todos los servicios almacenados.

```js
const services = serviceManager.getServices();

console.log(services);
```

### getServiceById(id)

Busca un servicio por su identificador.

```js
const service = serviceManager.getServiceById(1);

console.log(service);
```

Si el servicio no existe, devuelve `null`.

### addService(serviceData)

Agrega un nuevo servicio.

El `id` se genera automáticamente y no debe enviarse como parámetro.

```js
const newService = serviceManager.addService({
  name: "Corte de cabello",
  description: "Corte de cabello personalizado",
  duration: 45,
  price: 1200,
  category: "Peluquería",
  available: true
});

console.log(newService);
```

Los campos requeridos son:

* `name`
* `description`
* `duration`
* `price`
* `category`
* `available`

Si falta alguno de estos campos, el servicio no se agrega.

### updateService(id, updatedData)

Actualiza los datos de un servicio existente.

```js
const updatedService = serviceManager.updateService(1, {
  duration: 60,
  price: 1500
});

console.log(updatedService);
```

El `id` del servicio no puede ser modificado.

Si el servicio no existe, devuelve `null`.

### deleteService(id)

Elimina un servicio según su identificador.

```js
const deletedService = serviceManager.deleteService(1);

console.log(deletedService);
```

Si el servicio no existe, devuelve `null`.

## Estructura del proyecto

```text
src/
  config/
    env.config.js
  managers/
    ServiceManager.js
  data/
    services.json
  app.js
package.json
.env.example
.gitignore
README.md
```

## Tecnologías utilizadas

* Node.js
* JavaScript
* ESM
* dotenv
