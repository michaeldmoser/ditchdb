// @ts-nocheck
import { faker } from "@faker-js/faker";
import { beforeAll } from "vitest";
import "./msw";

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

window.PointerEvent = class PointerEvent extends Event {};
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

global.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

window.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.window = window;
global.window = window;
