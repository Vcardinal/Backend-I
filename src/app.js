import { env } from "./config/env.config.js";
import ServiceManager from "./managers/ServiceManager.js";

const serviceManager = new ServiceManager();

console.log("Aplicación iniciada correctamente");
console.log(`PORT: ${env.port}`);
console.log(`NODE_ENV: ${env.nodeEnv}`);

console.log("Servicios disponibles:");
console.log(serviceManager.getServices());