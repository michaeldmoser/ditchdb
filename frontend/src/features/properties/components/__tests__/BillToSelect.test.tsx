import render from "@/testing/render";
import { factory } from "@/testing/factory";
import BillToSelect from "../BillToSelect";
import { screen, waitFor } from "@testing-library/react";

describe("BillToSelect", () => {
  it("should have options", async () => {
    const property = factory.properties.create({
      people: factory.people.createMany(3),
    });
    const persons = property.people;

    const { findByRole, userEvent } = render(
      <BillToSelect propertyId={property.id} />,
    );

    await waitFor(async () => {
      await userEvent.click(await findByRole("combobox"));
    });

    expectPersonToBeListed(persons[0]);
    expectPersonToBeListed(persons[1]);
    expectPersonToBeListed(persons[2]);
  });
});

/**
 * Asserts that a person is listed in the select options.
 */
async function expectPersonToBeListed(person: Person) {
  const { findByRole } = screen;
  expect(
    await findByRole("option", {
      name: `${person.first_name} ${person.last_name}`,
    }),
  ).to.exist;
}
