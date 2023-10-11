import { rest } from "msw";
import { factory, whereById } from "./factory";

export const handlers = [
  ...factory.properties.toHandlers(
    "rest",
    "http://localhost:3000/api",
  ),
];
