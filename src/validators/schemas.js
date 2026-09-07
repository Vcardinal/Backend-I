import { z } from "zod";

export const createServiceSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio"),

  description: z
    .string()
    .min(1, "La descripción es obligatoria"),

  duration: z
    .number()
    .positive("La duración debe ser mayor a 0"),

  price: z
    .number()
    .nonnegative("El precio no puede ser negativo"),

  category: z
    .string()
    .min(1, "La categoría es obligatoria"),

  available: z.boolean(),
});

export const updateServiceSchema = z
  .object({
    name: z
      .string()
      .min(1, "El nombre no puede estar vacío")
      .optional(),

    description: z
      .string()
      .min(1, "La descripción no puede estar vacía")
      .optional(),

    duration: z
      .number()
      .positive("La duración debe ser mayor a 0")
      .optional(),

    price: z
      .number()
      .nonnegative("El precio no puede ser negativo")
      .optional(),

    category: z
      .string()
      .min(1, "La categoría no puede estar vacía")
      .optional(),

    available: z.boolean().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message:
        "Debe enviar al menos un campo para actualizar",
    }
  );

export const createBookingSchema = z.object({
  clientName: z
    .string()
    .min(1, "El nombre del cliente es obligatorio"),

  clientEmail: z
    .string()
    .email("El email no es válido"),

  date: z
    .string()
    .min(1, "La fecha es obligatoria"),

  time: z
    .string()
    .min(1, "La hora es obligatoria"),

  status: z
    .string()
    .min(1, "El estado es obligatorio"),
});

export const addServiceToBookingSchema = z.object({
  bid: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "El ID de la reserva no es válido"
    ),

  sid: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "El ID del servicio no es válido"
    ),
});