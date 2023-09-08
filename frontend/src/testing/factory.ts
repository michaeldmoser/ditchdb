import { Property } from "@/features/properties";
import { faker } from "@faker-js/faker";

export function propertyFactory(props?: Property): Property {
  return Object.assign({}, propertyBaseFactory(), props);
}

const propertyIdFactory = autoIncrementingIdFactory(10000000);
function propertyBaseFactory(): Property {
  return {
    id: propertyIdFactory(),
    geocode: gecodeFactory(),
    addr_number: faker.number.int({ min: 1, max: 99999 }).toString(),
    addr_predirectional: faker.helpers.arrayElement(["N", "S", "E", "W"]),
    addr_street: faker.location.street(),
    addr_roadsuffix: faker.helpers.arrayElement([
      "ST",
      "AVE",
      "BLVD",
      "CT",
      "DR",
      "LN",
      "RD",
      "WAY",
    ]),
    addr_postdirectional: faker.helpers.arrayElement([
      "N",
      "S",
      "E",
      "W",
      "NW",
      "NE",
      "SW",
      "SE",
    ]),
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
  };
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
