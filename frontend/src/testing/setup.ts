import { env } from "process";
import { faker } from "@faker-js/faker";
import { beforeAll } from "vitest";

import chaiDom from "chai-dom";
import chaiString from "chai-string";
import spies from "chai-spies";

chai.use(chaiDom);
chai.use(spies);
chai.use(chaiString);
chai.should(); // add should() chainable to objects

beforeAll(() => {
  faker.seed(329487);
});

const url = `http://localhost:${env.DJANGO_PORT ?? "5176"}`;
// @ts-ignore
const window = new Window({
  url,
});
// @ts-ignore
globalThis.window = window;
