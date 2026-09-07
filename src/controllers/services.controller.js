import {
  getServices as getServicesService,
  getServiceById as getServiceByIdService,
  createService as createServiceService,
  updateService as updateServiceService,
  deleteService as deleteServiceService,
} from "../services/services.service.js";

// GET - Obtener todos los servicios
export const getServices = (req, res) => {
  const services = getServicesService(req.query);

  res.status(200).json(services);
};

// GET - Obtener un servicio por ID
export const getServiceById = (req, res) => {
  const { sid } = req.params;

  const service = getServiceByIdService(sid);

  if (!service) {
    return res.status(404).json({
      error: "Servicio no encontrado",
    });
  }

  res.status(200).json(service);
};

// POST - Crear un nuevo servicio
export const createService = (req, res) => {
  try {
    const newService = createServiceService(req.body);

    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// PUT - Actualizar un servicio por ID
export const updateService = (req, res) => {
  const { sid } = req.params;

  const updatedService = updateServiceService(
    sid,
    req.body
  );

  if (!updatedService) {
    return res.status(404).json({
      error: "Servicio no encontrado",
    });
  }

  res.status(200).json(updatedService);
};

// DELETE - Eliminar un servicio por ID
export const deleteService = (req, res) => {
  const { sid } = req.params;

  const deletedService = deleteServiceService(sid);

  if (!deletedService) {
    return res.status(404).json({
      error: "Servicio no encontrado",
    });
  }

  res.status(200).json(deletedService);
};