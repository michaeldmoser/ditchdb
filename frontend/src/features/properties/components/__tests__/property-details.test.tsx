import render from "@/testing/render";
import { PropertyDetailsSection } from "../detail";

describe("PropertyDetailsSection", () => {
  it.skip("should render", () => {
    const { getByRole } = render(
      <PropertyDetailsSection
        totmarket_acres={1.0}
        geocode={"geocode"}
        proptype={"proptype"}
      />,
    );

    expect(getByRole("definition", { name: "Acres" })).to.equal("1.00");
  });
});
