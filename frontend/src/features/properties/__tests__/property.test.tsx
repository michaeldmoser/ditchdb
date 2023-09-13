import render from "@/testing/render";

import { createProperty, resetDatabase } from "@/testing/server-factory";
import Layout from "@/features/properties/layout";
import { contains } from "@/testing/utils";

describe("Property", async () => {
  it("should create a property", async () => {
    await resetDatabase();
    const t = await createProperty();

    const { findByText, getByText, getByRole } = render(<Layout />, {
      initialEntries: [`/${t.id}`],
    });

    expect(await findByText(t.geocode!)).to.exist;
    expect(getByText(t.proptype!)).to.exist;
    expect(getByText(t.totmarket_acres!.toFixed(2))).to.exist;

    expect(getByRole("heading", { name: contains(t.address!) }))
      .to.exist;
  });
});
