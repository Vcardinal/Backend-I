import ServicesRepository from "../repositories/services.repository.js";

const servicesRepository = new ServicesRepository();

export const getServices = (filters = {}) => {
  let services = servicesRepository.getAll();

  const { category, available } = filters;

  if (category) {
    services = services.filter(
      (service) =>
        service.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (available !== undefined) {
    const isAvailable =
      typeof available === "boolean"
        ? available
        : available === "true";

    services = services.filter(
      (service) => service.available === isAvailable
    );
  }

  return services;
};

export const getServiceById = (id) => {
  return servicesRepository.getById(id);
};

export const createService = (serviceData) => {
  const requiredFields = [
    "name",
    "description",
    "duration",
    "price",
    "category",
    "available",
  ];

  for (const field of requiredFields) {
    if (!(field in serviceData)) {
      throw new Error(`Falta el campo requerido: ${field}`);
    }
  }

  const newService = {
    name: serviceData.name,
    description: serviceData.description,
    duration: serviceData.duration,
    price: serviceData.price,
    category: serviceData.category,
    available: serviceData.available,
  };

  return servicesRepository.create(newService);
};

export const updateService = (id, updatedData) => {
  const { id: ignoredId, ...dataToUpdate } = updatedData;

  return servicesRepository.update(id, dataToUpdate);
};

export const deleteService = (id) => {
  return servicesRepository.delete(id);
};