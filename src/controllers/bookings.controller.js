import {
  createBooking as createBookingService,
  getBookingById as getBookingByIdService,
  addServiceToBooking as addServiceToBookingService,
} from "../services/bookings.service.js";

// POST - Crear una nueva reserva
export const createBooking = async (req, res) => {
  try {
    const newBooking = await createBookingService(
      req.body
    );

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// GET - Obtener una reserva por ID
export const getBookingById = async (req, res) => {
  try {
    const { bid } = req.params;

    const booking = await getBookingByIdService(
      bid
    );

    if (!booking) {
      return res.status(404).json({
        error: "Reserva no encontrada",
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// POST - Agregar un servicio a una reserva
export const addServiceToBooking = async (
  req,
  res
) => {
  try {
    const { bid, sid } = req.params;

    const result =
      await addServiceToBookingService(
        bid,
        sid
      );

    if (result.error) {
      return res.status(result.status).json({
        error: result.error,
      });
    }

    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};