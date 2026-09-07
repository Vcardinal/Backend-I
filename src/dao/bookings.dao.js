import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookingsPath = path.join(
  __dirname,
  "../data/bookings.json"
);

export default class BookingsDAO {
  constructor() {
    this.path = bookingsPath;
  }

  getAll() {
    if (!fs.existsSync(this.path)) {
      return [];
    }

    const data = fs.readFileSync(this.path, "utf-8");

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  }

  getById(id) {
    const bookings = this.getAll();

    const booking = bookings.find(
      (booking) => booking.id === Number(id)
    );

    return booking || null;
  }

  create(bookingData) {
    const bookings = this.getAll();

    const newId =
      bookings.length > 0
        ? Math.max(...bookings.map((booking) => booking.id)) + 1
        : 1;

    const newBooking = {
      id: newId,
      ...bookingData,
    };

    bookings.push(newBooking);

    fs.writeFileSync(
      this.path,
      JSON.stringify(bookings, null, 2)
    );

    return newBooking;
  }

  update(id, updatedData) {
    const bookings = this.getAll();

    const bookingIndex = bookings.findIndex(
      (booking) => booking.id === Number(id)
    );

    if (bookingIndex === -1) {
      return null;
    }

    bookings[bookingIndex] = {
      ...bookings[bookingIndex],
      ...updatedData,
      id: bookings[bookingIndex].id,
    };

    fs.writeFileSync(
      this.path,
      JSON.stringify(bookings, null, 2)
    );

    return bookings[bookingIndex];
  }
}