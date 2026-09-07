import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesPath = path.join(
  __dirname,
  "../data/services.json"
);

export default class ServicesDAO {
  constructor() {
    this.path = servicesPath;
  }

  getAll() {
    if (!fs.existsSync(this.path)) {
      return [];
    }

    const data = fs.readFileSync(this.path, "utf-8");

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  }

  getById(id) {
    const services = this.getAll();

    const service = services.find(
      (service) => service.id === Number(id)
    );

    return service || null;
  }

  create(serviceData) {
    const services = this.getAll();

    const newId =
      services.length > 0
        ? Math.max(...services.map((service) => service.id)) + 1
        : 1;

    const newService = {
      id: newId,
      ...serviceData,
    };

    services.push(newService);

    fs.writeFileSync(
      this.path,
      JSON.stringify(services, null, 2)
    );

    return newService;
  }

  update(id, updatedData) {
    const services = this.getAll();

    const serviceIndex = services.findIndex(
      (service) => service.id === Number(id)
    );

    if (serviceIndex === -1) {
      return null;
    }

    services[serviceIndex] = {
      ...services[serviceIndex],
      ...updatedData,
      id: services[serviceIndex].id,
    };

    fs.writeFileSync(
      this.path,
      JSON.stringify(services, null, 2)
    );

    return services[serviceIndex];
  }

  delete(id) {
    const services = this.getAll();

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