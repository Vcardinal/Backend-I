import mongoose from "mongoose";
import ServiceModel from "../models/service.model.js";

export default class ServicesDAO {
  async getAll() {
    return ServiceModel.find().lean();
  }

  async getById(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }

    return ServiceModel.findById(id).lean();
  }

  async create(serviceData) {
    const service = await ServiceModel.create(serviceData);

    return service.toObject();
  }

  async update(id, updatedData) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }

    return ServiceModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  }

  async delete(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }

    return ServiceModel.findByIdAndDelete(id).lean();
  }
}