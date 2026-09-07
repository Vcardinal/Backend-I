import ServicesDAO from "../dao/services.dao.js";

const servicesDAO = new ServicesDAO();

export default class ServicesRepository {
  async getAll(options = {}) {
    return servicesDAO.getAll(options);
  }

  async getById(id) {
    return servicesDAO.getById(id);
  }

  async create(serviceData) {
    return servicesDAO.create(serviceData);
  }

  async update(id, updatedData) {
    return servicesDAO.update(id, updatedData);
  }

  async delete(id) {
    return servicesDAO.delete(id);
  }
}