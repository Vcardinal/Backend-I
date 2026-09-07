import {
  getServices as getServicesService,
} from "../services/services.service.js";

import {
  getBookings as getBookingsService,
} from "../services/bookings.service.js";

// GET - Vista de servicios
export const renderServices = async (req, res) => {
  try {
    const services = await getServicesService();

    res.render("services", {
      title: "Servicios",
      services,
    });
  } catch (error) {
    res.status(500).send(
      "Error al cargar los servicios"
    );
  }
};

// GET - Vista de disponibilidad y reservas
export const renderAvailability = async (
  req,
  res
) => {
  try {
    const bookings = await getBookingsService();

    res.render("availability", {
      title: "Disponibilidad y Reservas",
      bookings,
    });
  } catch (error) {
    res.status(500).send(
      "Error al cargar las reservas"
    );
  }
};