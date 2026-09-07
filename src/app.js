import express from "express";
import { engine } from "express-handlebars";
import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

// Configuración de Handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static("./src/public"));

// API REST
app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);

// Vistas
app.use("/views", viewsRouter);

export default app;