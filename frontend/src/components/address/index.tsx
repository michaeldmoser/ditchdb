import { HTMLAttributes } from "react";

type AddressProps = HTMLAttributes<"div"> & {
  address1: string | null | undefined;
  address2: string | null | undefined;
  address3: string | null | undefined;
  city: string;
  state: string;
  zip: string;
};

/**
 * Displays an address on the screen.
 */
export function Address(
  { address1, address2, address3, city, state, zip, ...props }: AddressProps,
) {
  return (
    <div {...props}>
      {!!address1 && <div>{address1}</div>}
      {!!address2 && <div>{address2}</div>}
      {!!address3 && <div>{address3}</div>}
      <div>{city}, {state} {zip}</div>
    </div>
  );
}
