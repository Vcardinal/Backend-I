import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

// POST - Crear una nueva reserva
export const createBooking = (req, res) => {
  try {
    const newBooking = bookingManager.createBooking(req.body);

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

  const booking = bookingManager.getBookingById(bid);

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
};