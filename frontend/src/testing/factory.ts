import { faker } from "@faker-js/faker";

import {
  drop,
  factory as mswFactory,
  manyOf,
  nullable,
  primaryKey,
} from "@mswjs/data";

type FactoryReturn = ReturnType<typeof mswFactory>;

export const factory = mswFactory({
  properties: {
    id: primaryKey(() => faker.number.int({ min: 10000000, max: 99999999 })),
    geocode: () => gecodeFactory(),
    addr_city: () => "Missoula",
    addr_state: () => "MT",
    addr_zip: () =>
      faker.helpers.arrayElement([59801, 59804, 59808]).toString(),
    addr_unitnumber: nullable(() => null),
    addr_unittype: nullable(() => null),
    proptype: () =>
      faker.helpers.arrayElement([
        "CONDO_U - Condo - Urban",
        "TU - Townhouse Urban",
        "EP - Exempt Property",
        "VAC_R - Vacant Land - Rural",
        "APT_U - Apartment Urban",
        "NV - Non-Valued Property",
        "TR - Townhouse Rural",
        "IMP_R - Improved Property - Rural",
        "IMP_U - Improved Property - Urban",
        "KU - Condominium Urban",
        "VAC_U - Vacant Land - Urban",
        "EP_PART - Partial Exempt Property",
        "PARK_U - Manufactured Home Park -  Urban",
        "GRAVEL - Gravel Pit",
      ]),
    totmarket_acres: () =>
      faker.number.float({ min: 0, max: 26, precision: 0.01 }),
    propcategory: nullable(() => null),
    propsubcategory: nullable(() => null),
    propsubcategory_desc: nullable(() => null),
    address: () => faker.location.streetAddress(),

    people: manyOf("people"),
  },
  people: {
    id: primaryKey(() => faker.number.int({ min: 10000000, max: 99999999 })),
    first_name: faker.person.firstName,
    last_name: faker.person.lastName,
    email: faker.internet.email,
    phone: faker.phone.number,
  },
});

export function propertyFactory(props?: Property): Property {
  return Object.assign({}, propertyBaseFactory(), props);
}

const propertyIdFactory = autoIncrementingIdFactory(10000000);
function propertyBaseFactory() {
  const property: Property = {
    id: propertyIdFactory(),
    geocode: gecodeFactory(),
    addr_city: "Missoula",
    addr_state: "MT",
    addr_zip: faker.helpers.arrayElement([59801, 59804, 59808]).toString(),
    addr_unitnumber: null,
    addr_unittype: null,
    proptype: faker.helpers.arrayElement([
      "CONDO_U - Condo - Urban",
      "TU - Townhouse Urban",
      "EP - Exempt Property",
      "VAC_R - Vacant Land - Rural",
      "APT_U - Apartment Urban",
      "NV - Non-Valued Property",
      "TR - Townhouse Rural",
      "IMP_R - Improved Property - Rural",
      "IMP_U - Improved Property - Urban",
      "KU - Condominium Urban",
      "VAC_U - Vacant Land - Urban",
      "EP_PART - Partial Exempt Property",
      "PARK_U - Manufactured Home Park -  Urban",
      "GRAVEL - Gravel Pit",
    ]),
    totmarket_acres: faker.number.float({ min: 0, max: 26, precision: 0.01 }),
    propcategory: null,
    propsubcategory: null,
    propsubcategory_desc: null,
    address: faker.location.streetAddress(),
  };

  return property;
}

/**
 * Creates a geocode number in the form of 04-2200-20-1-20-22-5003
 */
function gecodeFactory() {
  const geocode = [
    "04", // Missoula County
    faker.number.int({ min: 1, max: 9999 }).toString().padStart(4, "0"),
    faker.number.int({ min: 1, max: 99 }).toString().padStart(2, "0"),
    faker.number.int({ min: 1, max: 9 }).toString(),
    faker.number.int({ min: 1, max: 99 }).toString().padStart(2, "0"),
    faker.number.int({ min: 1, max: 99 }).toString().padStart(2, "0"),
    faker.number.int({ min: 1, max: 9999 }).toString().padStart(4, "0"),
  ];

  return geocode.join("-");
}

/**
 * Creates a function that returns an auto-incrementing id.
 */
function autoIncrementingIdFactory(startingId = 1) {
  let id = startingId;
  return () => id++;
}

/**
 * Fetch a record from the mock database by it's ID. This pretty much wraps `db.record.findFirst({where: { id: { equals: id } }})`
 *
 * @param  id ID of the record to fetch
 * @returns
 */
function fetchById(this: FactoryReturn, id: number) {
  return this.findFirst(whereById(id)); // tslint:disable-line
}

/**
 * Creates `count` randomly populated records
 *
 * @param count The number of records to create
 * @param properties The properties to be set on each created record. Any property not passed in will be auto-generated.
 *
 * @returns The list of generated records.
 */
function createMany(
  this: FactoryReturn,
  count: number = 1,
  properties: any = {},
) {
  return Array(count).fill(null).map(() => this.create(properties));
}

/**
 * Patch each of the entities with the following functions
 *  - createMany()
 *  - fetchById()
 */
Object.entries(factory).forEach((args) =>
  Object.assign(args[1], { createMany, fetchById })
);

export function whereById(id: number) {
  return {
    where: { id: { equals: id } },
  };
}

/**
 * Forces the database to reset before each test ensuring we have a clean environment to work with.
 */
if (typeof beforeEach === "function") {
  beforeEach(() => {
    drop(factory);
  });
}
