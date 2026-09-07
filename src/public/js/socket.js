const socket = io();

console.log("Socket.io conectado desde el navegador");

socket.on("connect", () => {
  console.log(
    `Conectado al servidor con ID: ${socket.id}`
  );
});

socket.on("serviceCreated", (service) => {
  console.log("Nuevo servicio recibido:", service);

  const container = document.getElementById(
    "services-container"
  );

  if (!container) {
    return;
  }

  const emptyMessage = container.querySelector(
    ".empty-message"
  );

  if (emptyMessage) {
    emptyMessage.remove();
  }

  const article = document.createElement("article");

  article.classList.add("service-card");

  article.innerHTML = `
    <h3>${service.name}</h3>

    <p>
      <strong>Descripción:</strong>
      ${service.description}
    </p>

    <p>
      <strong>Duración:</strong>
      ${service.duration} minutos
    </p>

    <p>
      <strong>Precio:</strong>
      $${service.price}
    </p>

    <p>
      <strong>Categoría:</strong>
      ${service.category}
    </p>

    <p>
      <strong>Disponibilidad:</strong>
      ${service.available
        ? "Disponible"
        : "No disponible"}
    </p>
  `;

  container.appendChild(article);
});