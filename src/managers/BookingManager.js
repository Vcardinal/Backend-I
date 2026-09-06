import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookingsPath = path.join(
  __dirname,
  "../data/bookings.json"
);

export default class BookingManager {
  constructor() {
    this.path = bookingsPath;
  }

  getBookings() {
    if (!fs.existsSync(this.path)) {
      return [];
    }

    const data = fs.readFileSync(this.path, "utf-8");

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  }

  getBookingById(id) {
    const bookings = this.getBookings();

    const booking = bookings.find(
      (booking) => booking.id === Number(id)
    );

    return booking || null;
  }

  createBooking(bookingData) {
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

    const bookings = this.getBookings();

    const newId =
      bookings.length > 0
        ? Math.max(
            ...bookings.map((booking) => booking.id)
          ) + 1
        : 1;

    const newBooking = {
      id: newId,
      clientName: bookingData.clientName,
      clientEmail: bookingData.clientEmail,
      date: bookingData.date,
      time: bookingData.time,
      status: bookingData.status,
      services: [],
    };

    bookings.push(newBooking);

    fs.writeFileSync(
      this.path,
      JSON.stringify(bookings, null, 2)
    );

    return newBooking;
  }

  addServiceToBooking(bookingId, serviceId) {
    const bookings = this.getBookings();

    const bookingIndex = bookings.findIndex(
      (booking) => booking.id === Number(bookingId)
    );

    if (bookingIndex === -1) {
      return null;
    }

    const booking = bookings[bookingIndex];

    const existingService = booking.services.find(
      (item) => item.service === Number(serviceId)
    );

    if (existingService) {
      existingService.quantity += 1;
    } else {
      booking.services.push({
        service: Number(serviceId),
        quantity: 1,
      });
    }

    bookings[bookingIndex] = booking;

    fs.writeFileSync(
      this.path,
      JSON.stringify(bookings, null, 2)
    );

    return booking;
  }
}