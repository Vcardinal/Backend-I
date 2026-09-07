import BookingsDAO from "../dao/bookings.dao.js";

const bookingsDAO = new BookingsDAO();

export default class BookingsRepository {
  async getAll() {
    return bookingsDAO.getAll();
  }

  async create(bookingData) {
    return bookingsDAO.create(bookingData);
  }

  async getById(id) {
    return bookingsDAO.getById(id);
  }

  async update(id, updatedData) {
    return bookingsDAO.update(id, updatedData);
  }
}