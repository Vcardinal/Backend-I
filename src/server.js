import app from "./app.js";
import { env } from "./config/env.config.js";
import { connectDB } from "./config/database.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
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