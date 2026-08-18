import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["PORT", "NODE_ENV"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(
      `Falta la variable de entorno requerida: ${envVar}`
    );
  }
}

export const env = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
};