import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { env } from "./config/env.config.js";
import { connectDB } from "./config/database.js";

const startServer = async () => {
  try {
    await connectDB();

    const httpServer = createServer(app);

    const io = new Server(httpServer);

    app.set("io", io);

    io.on("connection", (socket) => {
      console.log(
        `Cliente conectado por Socket.io: ${socket.id}`
      );

      socket.on("disconnect", () => {
        console.log(
          `Cliente desconectado: ${socket.id}`
        );
      });
    });

    httpServer.listen(env.port, () => {
      console.log(
        `Servidor ejecutándose en http://localhost:${env.port}`
      );
    });
  } catch (error) {
    console.error(
      "No se pudo iniciar el servidor:",
      error.message
    );

    process.exit(1);
  }
};

startServer();