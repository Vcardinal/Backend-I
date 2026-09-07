import mongoose from "mongoose";
import ServiceModel from "../models/service.model.js";

export default class ServicesDAO {
  async getAll({
    filter = {},
    page = 1,
    limit = 10,
    sort = {},
  } = {}) {
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      ServiceModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),

      ServiceModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      services,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
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