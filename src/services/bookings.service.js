import BookingsRepository from "../repositories/bookings.repository.js";
import ServicesRepository from "../repositories/services.repository.js";

const bookingsRepository = new BookingsRepository();
const servicesRepository = new ServicesRepository();

export const getBookings = async () => {
  return bookingsRepository.getAll();
};

export const createBooking = async (bookingData) => {
  const requiredFields = [
    "clientName",
    "clientEmail",
    "date",
    "time",
    "status",
  ];

  for (const field of requiredFields) {
    if (!(field in bookingData)) {
      throw new Error(
        `Falta el campo requerido: ${field}`
      );
    }
  }

  const newBooking = {
    clientName: bookingData.clientName,
    clientEmail: bookingData.clientEmail,
    date: bookingData.date,
    time: bookingData.time,
    status: bookingData.status,
    services: [],
  };

  return bookingsRepository.create(newBooking);
};

export const getBookingById = async (id) => {
  return bookingsRepository.getById(id);
};

export const addServiceToBooking = async (
  bookingId,
  serviceId
) => {
  const booking =
    await bookingsRepository.getById(bookingId);

  if (!booking) {
    return {
      error: "Reserva no encontrada",
      status: 404,
    };
  }

  const service =
    await servicesRepository.getById(serviceId);

  if (!service) {
    return {
      error: "Servicio no encontrado",
      status: 404,
    };
  }

  const existingService = booking.services.find(
    (item) =>
      item.service.toString() ===
      service._id.toString()
  );

  if (existingService) {
    existingService.quantity += 1;
  } else {
    booking.services.push({
      service: service._id,
      quantity: 1,
    });
  }

  const updatedBooking =
    await bookingsRepository.update(
      bookingId,
      {
        services: booking.services,
      }
    );

  return {
    data: updatedBooking,
    status: 200,
  };
};