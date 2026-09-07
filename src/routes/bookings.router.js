import { Router } from "express";

import {
  createBooking,
  getBookingById,
  addServiceToBooking,
} from "../controllers/bookings.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  createBookingSchema,
  addServiceToBookingSchema,
} from "../validators/schemas.js";

const router = Router();

router.post(
  "/",
  validate(createBookingSchema),
  createBooking
);

router.get("/:bid", getBookingById);

router.post(
  "/:bid/services/:sid",
  validate(addServiceToBookingSchema, "params"),
  addServiceToBooking
);

export default router;