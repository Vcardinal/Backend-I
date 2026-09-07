import ServicesRepository from "../repositories/services.repository.js";

const servicesRepository = new ServicesRepository();

export const getServices = async (query = {}) => {
  const {
    category,
    available,
    page = "1",
    limit = "10",
    sortBy,
    order = "asc",
  } = query;

  const filter = {};

  if (category) {
    filter.category = {
      $regex: `^${category}$`,
      $options: "i",
    };
  }

  if (available !== undefined) {
    if (
      available !== "true" &&
      available !== "false" &&
      typeof available !== "boolean"
    ) {
      throw new Error(
        "El parámetro available debe ser true o false"
      );
    }

    filter.available =
      typeof available === "boolean"
        ? available
        : available === "true";
  }

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (
    !Number.isInteger(parsedPage) ||
    parsedPage < 1
  ) {
    throw new Error(
      "El parámetro page debe ser un entero mayor a 0"
    );
  }

  if (
    !Number.isInteger(parsedLimit) ||
    parsedLimit < 1
  ) {
    throw new Error(
      "El parámetro limit debe ser un entero mayor a 0"
    );
  }

  const allowedSortFields = [
    "name",
    "duration",
    "price",
    "category",
    "available",
  ];

  const sort = {};

  if (sortBy) {
    if (!allowedSortFields.includes(sortBy)) {
      throw new Error(
        `sortBy debe ser uno de: ${allowedSortFields.join(
          ", "
        )}`
      );
    }

    if (order !== "asc" && order !== "desc") {
      throw new Error(
        "El parámetro order debe ser asc o desc"
      );
    }

    sort[sortBy] = order === "desc" ? -1 : 1;
  }

  return servicesRepository.getAll({
    filter,
    page: parsedPage,
    limit: parsedLimit,
    sort,
  });
};

export const getServiceById = async (id) => {
  return servicesRepository.getById(id);
};

export const createService = async (serviceData) => {
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