import Select from "@/components/forms/Select";
import { forwardRef } from "react";
import { useGetBillingContactsQuery } from "../api";

function assertIsStringOrNumber(
  value: unknown,
): asserts value is string | number {
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error("Value must be a string or number");
  }
}

/**
 * BillToSelect is a component that displays the billing information for a property.
 * @param propertyId - The id the property
 */
const BillToSelect = forwardRef<HTMLSelectElement, BillToSelectProps>((
  { propertyId, ...props }: BillToSelectProps,
  ref,
) => {
  const { data } = useGetBillingContactsQuery(propertyId);

  if (data === undefined) {
    return null;
  }

  return (
    <div className="my-4">
      <Select
        name="bill_to"
        label="Bill To Owner"
        placeholder="Select a person or organization owner"
        options={data.map((item) => {
          assertIsStringOrNumber(item.id);
          return ({
            value: item.id,
            label: `${item.first_name} ${item.last_name}`,
          });
        })}
        {...props}
        ref={ref}
      />
    </div>
  );
});

type BillToSelectProps =
  & PropertyIdProp
  & React.SelectHTMLAttributes<HTMLSelectElement>;

export default BillToSelect;
