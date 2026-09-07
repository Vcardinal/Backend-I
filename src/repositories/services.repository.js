import ServicesDAO from "../dao/services.dao.js";

const servicesDAO = new ServicesDAO();

export default class ServicesRepository {
  getAll() {
    return servicesDAO.getAll();
  }

  getById(id) {
    return servicesDAO.getById(id);
  }

  create(serviceData) {
    return servicesDAO.create(serviceData);
  }

  update(id, updatedData) {
    return servicesDAO.update(id, updatedData);
  }

  delete(id) {
    return servicesDAO.delete(id);
  }
}