import mongoose from "mongoose";
import BookingModel from "../models/booking.model.js";

export default class BookingsDAO {
  async getById(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }

    return BookingModel.findById(id).lean();
  }

  async create(bookingData) {
    const booking = await BookingModel.create(
      bookingData
    );

    return booking.toObject();
  }

  async update(id, updatedData) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }

    return BookingModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  }
}