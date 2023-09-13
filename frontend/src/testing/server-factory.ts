import { env } from "process";
import axios from "axios";
import { propertyFactory } from "./factory";

const url = `http://localhost:${env.DJANGO_PORT ?? "5176"}`;
const requests = axios.create({
  baseURL: url,
});

export async function createProperty(overrides?: Property) {
  return requests.post<Property>(
    "/api/properties/",
    propertyFactory(overrides),
  ).then((response) => response.data);
}

export async function resetDatabase() {
  return requests.delete("/dev/reset-database");
}
