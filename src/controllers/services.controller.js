import ServiceManager from "../managers/ServiceManager.js";

const serviceManager = new ServiceManager();

// GET - Obtener todos los servicios
export const getServices = (req, res) => {
  let services = serviceManager.getServices();

  const { category, available } = req.query;

  if (category) {
    services = services.filter(
      (service) =>
        service.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (available !== undefined) {
    const isAvailable = available === "true";

    services = services.filter(
      (service) => service.available === isAvailable
    );
  }

  res.status(200).json(services);
};

// GET - Obtener un servicio por ID
export const getServiceById = (req, res) => {
  const { sid } = req.params;

  const service = serviceManager.getServiceById(sid);

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
    const newService = serviceManager.addService(req.body);

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

  const updatedService = serviceManager.updateService(
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

  const deletedService = serviceManager.deleteService(sid);

  if (!deletedService) {
    return res.status(404).json({
      error: "Servicio no encontrado",
    });
  }

  res.status(200).json(deletedService);
};