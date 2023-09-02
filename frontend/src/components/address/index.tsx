import { HTMLAttributes } from "react";

type AddressProps = HTMLAttributes<HTMLDivElement> & {
  address1: string | null | undefined;
  address2?: string;
  address3?: string;
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
