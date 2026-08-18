import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesPath = path.join(__dirname, "../data/services.json");

export default class ServiceManager {
  constructor() {
    this.path = servicesPath;
  }

  getServices() {
    if (!fs.existsSync(this.path)) {
      return [];
    }

    const data = fs.readFileSync(this.path, "utf-8");

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  }

  getServiceById(id) {
    const services = this.getServices();

    const service = services.find(
      (service) => service.id === Number(id)
    );

    return service || null;
  }

  addService(serviceData) {
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

    const services = this.getServices();

    const newId =
      services.length > 0
        ? Math.max(...services.map((service) => service.id)) + 1
        : 1;

    const newService = {
      id: newId,
      name: serviceData.name,
      description: serviceData.description,
      duration: serviceData.duration,
      price: serviceData.price,
      category: serviceData.category,
      available: serviceData.available,
    };

    services.push(newService);

    fs.writeFileSync(
      this.path,
      JSON.stringify(services, null, 2)
    );

    return newService;
  }

  updateService(id, updatedData) {
    const services = this.getServices();

    const serviceIndex = services.findIndex(
      (service) => service.id === Number(id)
    );

    if (serviceIndex === -1) {
      return null;
    }

    const { id: ignoredId, ...dataToUpdate } = updatedData;

    services[serviceIndex] = {
      ...services[serviceIndex],
      ...dataToUpdate,
      id: services[serviceIndex].id,
    };

    fs.writeFileSync(
      this.path,
      JSON.stringify(services, null, 2)
    );

    return services[serviceIndex];
  }

  deleteService(id) {
    const services = this.getServices();

    const serviceIndex = services.findIndex(
      (service) => service.id === Number(id)
    );

    if (serviceIndex === -1) {
      return null;
    }

    const deletedService = services[serviceIndex];

    services.splice(serviceIndex, 1);

    fs.writeFileSync(
      this.path,
      JSON.stringify(services, null, 2)
    );

    return deletedService;
  }
}