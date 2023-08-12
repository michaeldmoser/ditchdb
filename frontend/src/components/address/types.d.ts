import { HTMLAttributes } from "react";

type AddressProps = HTMLAttributes & {
  address1: string | null | undefined;
  address2: string | null | undefined;
  address3: string | null | undefined;
  city: string;
  state: string;
  zip: string;
};
