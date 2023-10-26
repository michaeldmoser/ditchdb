import render from "@/testing/render";
import { createBasicProperty, factory } from "@/testing/factory";
import { waitFor } from "@testing-library/react";

import { BillingSetupForm } from "../BillingSection";

describe("BillingSetupForm", () => {
  it("should fill in the address_to_line field", async () => {
    const property = createBasicProperty();
    const person = property.people[0];

    const { findByRole, getByRole, userEvent } = render(
      <BillingSetupForm
        propertyId={property.id}
        onSubmit={() => void (null)}
      />,
    );

    userEvent.selectOptions(
      await findByRole("combobox"),
      person.id.toString(),
    );

    await waitFor(() => {
      expect(getByRole("textbox", { name: "Billing To" })).to.have.value(
        person.name,
      );
    });
  });
});
