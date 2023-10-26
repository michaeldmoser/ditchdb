import { rest } from "msw";
import { factory } from "./factory";
import { assertIsString } from "@/utils/guards";

export const handlers = [
  ...factory.properties.toHandlers(
    "rest",
    "http://localhost:3000/api",
  ),
  rest.get(
    "http://localhost:3000/api/properties/:id/billto",
    (req, res, ctx) => {
      const { id } = req.params;
      assertIsString(id);

      const property = factory.properties.fetchById(id);
      if (!property) {
        return notFoundResponse(res, ctx);
      }

      const persons = property.people.map((person) => {
        return removeOwnerFrom(person);
      });

      return res(
        ctx.status(200),
        ctx.json(persons),
      );
    },
  ),
  rest.get(
    "http://localhost:3000/api/billto/:id",
    (req, res, ctx) => {
      try {
        const { id } = req.params;
        assertIsString(id);

        const person = factory.people.fetchById(id);
        if (!person) {
          return notFoundResponse(res, ctx);
        }

        const addresses = getOwnerAddresses(person);
        if (!addresses) {
          return emptyListResponse(res, ctx);
        }

        const address = removeOwnerFrom(addresses[0]);
        const response = {
          ...address,
          name: person.name,
        };

        return res(
          ctx.status(200),
          ctx.json(response),
        );
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  ),
];

function removeOwnerFrom(address: any) {
  const { owner, ...rest } = address;
  return rest;
}

function getOwnerAddresses(
  person: ReturnType<typeof factory.people.fetchById>,
) {
  return person.owner?.addresses || null;
}

function emptyListResponse(res: RestResponse, ctx: RestContext) {
  return res(
    ctx.status(200),
    ctx.json([]),
  );
}

function notFoundResponse(res: RestResponse, ctx: RestContext) {
  return res(
    ctx.status(404),
    ctx.json({
      detail: "Not found.",
    }),
  );
}

type RestContext = Parameters<Parameters<typeof rest.get>[1]>[2];
type RestResponse = Parameters<Parameters<typeof rest.get>[1]>[1];
