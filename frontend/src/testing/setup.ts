/// <reference path="chai.d.ts" />
/// <reference path="types.d.ts" />
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

chai.Assertion.addProperty("disabled", function () {
  const obj = chai.util.flag(this, "object");

  this.assert(
    !!obj.attributes?.disabled,
    "expected " + obj?.toString() + " to have an attribute #{exp}",
    "expected " + obj?.toString() + " not to have an attribute #{exp}",
    "disabled",
  );
});

chai.Assertion.addProperty("required", function () {
  const obj = chai.util.flag(this, "object");

  const hasRequired = obj.attributes?.required ||
    obj.attributes?.["aria-required"];

  this.assert(
    hasRequired,
    "expected " + obj?.toString() + " to have an attribute #{exp}",
    "expected " + obj?.toString() + " not to have an attribute #{exp}",
    "required",
  );
});

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
