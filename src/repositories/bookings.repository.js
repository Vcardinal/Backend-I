import BookingsDAO from "../dao/bookings.dao.js";

const bookingsDAO = new BookingsDAO();

export default class BookingsRepository {
  create(bookingData) {
    return bookingsDAO.create(bookingData);
  }

  getById(id) {
    return bookingsDAO.getById(id);
  }

  update(id, updatedData) {
    return bookingsDAO.update(id, updatedData);
  }
}