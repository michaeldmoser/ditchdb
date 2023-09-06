import { HTMLAttributes } from "react";

type AddressProps = HTMLAttributes<HTMLDivElement> & {
  addressTo?: string | null | undefined;
  attentionTo?: string | null | undefined;
  streetAddress?: string | null | undefined;
  city: string;
  state: string;
  zip?: string | null | undefined;
};

/**
 * Displays an address on the screen.
 */
export function Address(
  { addressTo, attentionTo, streetAddress, city, state, zip, ...props }:
    AddressProps,
) {
  return (
    <div {...props}>
      {!!addressTo && <div>{addressTo}</div>}
      {!!attentionTo && <div>{attentionTo}</div>}
      {!!streetAddress && <div>{streetAddress}</div>}
      <div>{city}, {state} {zip}</div>
    </div>
  );
}
