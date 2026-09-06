import { Router } from "express";
import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const router = Router();

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

// POST - Crear una nueva reserva
router.post("/", (req, res) => {
  try {
    const newBooking = bookingManager.createBooking(req.body);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// GET - Obtener una reserva por ID
router.get("/:bid", (req, res) => {
  const { bid } = req.params;

  const booking = bookingManager.getBookingById(bid);

  if (!booking) {
    return res.status(404).json({
      error: "Reserva no encontrada",
    });
  }

  res.status(200).json(booking);
});

// POST - Agregar un servicio a una reserva
router.post("/:bid/services/:sid", (req, res) => {
  const { bid, sid } = req.params;

  const booking = bookingManager.getBookingById(bid);

  if (!booking) {
    return res.status(404).json({
      error: "Reserva no encontrada",
    });
  }

  const service = serviceManager.getServiceById(sid);

  if (!service) {
    return res.status(404).json({
      error: "Servicio no encontrado",
    });
  }

  const updatedBooking =
    bookingManager.addServiceToBooking(bid, sid);

  res.status(200).json(updatedBooking);
});

export default router;