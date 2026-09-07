import {
  createBooking as createBookingService,
  getBookingById as getBookingByIdService,
  addServiceToBooking as addServiceToBookingService,
} from "../services/bookings.service.js";

// POST - Crear una nueva reserva
export const createBooking = (req, res) => {
  try {
    const newBooking = createBookingService(req.body);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// GET - Obtener una reserva por ID
export const getBookingById = (req, res) => {
  const { bid } = req.params;

  const booking = getBookingByIdService(bid);

  if (!booking) {
    return res.status(404).json({
      error: "Reserva no encontrada",
    });
  }

  res.status(200).json(booking);
};

// POST - Agregar un servicio a una reserva
export const addServiceToBooking = (req, res) => {
  const { bid, sid } = req.params;

  const result = addServiceToBookingService(bid, sid);

  if (result.error) {
    return res.status(result.status).json({
      error: result.error,
    });
  }

  res.status(result.status).json(result.data);
};