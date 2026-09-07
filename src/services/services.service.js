import ServicesRepository from "../repositories/services.repository.js";

const servicesRepository = new ServicesRepository();

export const getServices = async (filters = {}) => {
  let services = await servicesRepository.getAll();

  const { category, available } = filters;

  if (category) {
    services = services.filter(
      (service) =>
        service.category.toLowerCase() ===
        category.toLowerCase()
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

export const getServiceById = async (id) => {
  return servicesRepository.getById(id);
};

export const createService = async (serviceData) => {
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
      throw new Error(
        `Falta el campo requerido: ${field}`
      );
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

export const updateService = async (
  id,
  updatedData
) => {
  const {
    id: ignoredId,
    _id: ignoredMongoId,
    ...dataToUpdate
  } = updatedData;

  return servicesRepository.update(
    id,
    dataToUpdate
  );
};

export const deleteService = async (id) => {
  return servicesRepository.delete(id);
};