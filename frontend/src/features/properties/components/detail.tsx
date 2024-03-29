import { useId } from "react";
import { Address } from "@/components/address";

import { Card, CardBody, CardHeader } from "@/components/cards";
import BillingSection from "./BillingSection";

import {
  useGetPropertyAddressesQuery,
  useGetPropertyBillingQuery,
  useGetPropertyOwnersQuery,
  useGetPropertyQuery,
} from "../api";

import { usePropertyId } from "../hooks";
import { ContentLoading } from "@/components/loaders";

type IdProps = Pick<Property, "id">;
/**
 * Property dpetail page
 */
export default function PropertyDetail() {
  const id = usePropertyId();
  const queryResult = useGetPropertyQuery(id);
  const propertyHeadingId = useId();

  return (
    <ContentLoading<Property, DjangoError> {...queryResult}>
      {(data) => (
        <article aria-labelledby={propertyHeadingId}>
          <PropertyDetailHeader {...data} labelId={propertyHeadingId} />
          <div className="grid grid-cols-2 gap-4">
            <section>
              <PropertyDetailsSection {...data} />
              <PropertyOwnersSection id={id} />
              <BillingSection propertyId={id} />
              <AddresSection id={id} />
            </section>
            <MiniMapSection />
          </div>
        </article>
      )}
    </ContentLoading>
  );
}

/**
 * Property is the data type for the property detail page
 * @property address - The address of the property
 */
type PropertyDetailHeaderProps = Pick<Property, "address"> & {
  labelId: string;
};
/**
 * Header for Property Detail page
 */
function PropertyDetailHeader(
  {
    labelId,
    address,
  }: PropertyDetailHeaderProps,
) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between">
      <h2 id={labelId} className="text-2xl">
        {address}
      </h2>
    </header>
  );
}

type PropertyDetailsProps = Pick<
  Property,
  "totmarket_acres" | "geocode" | "proptype"
>;
/**
 * Display the proerty detail card
 */
export function PropertyDetailsSection(
  {
    totmarket_acres,
    geocode,
    proptype,
  }: PropertyDetailsProps,
) {
  return (
    <Card>
      <CardHeader>
        Property Details
      </CardHeader>
      <CardBody>
        <dl className="grid grid-cols-2 gap-2">
          <dt id="term-acres">Acres</dt>
          <dd aria-labelledby="term-acres">
            {totmarket_acres?.toFixed(2)}
          </dd>
          <dt id="term-geocode">Geocode</dt>
          <dd aria-labelledby="term-geocode">{geocode}</dd>
          <dt id="term-property-type">Property Type</dt>
          <dd aria-labelledby="term-property-type">{proptype}</dd>
        </dl>
      </CardBody>
    </Card>
  );
}

/**
 * Display the property owners card
 */
function PropertyOwnersSection(
  { id }: IdProps,
) {
  const queryResult = useGetPropertyOwnersQuery(id);
  const propertyOwnersId = useId();

  return (
    <Card>
      <CardHeader id={propertyOwnersId}>
        Property Owners
      </CardHeader>
      <CardBody>
        <ul aria-labelledby={propertyOwnersId}>
          <ContentLoading<Owner[]> {...queryResult}>
            {(data) => (
              <>
                {data.map((owner, key) => (
                  <li key={key}>
                    {owner.fullname}
                  </li>
                ))}
              </>
            )}
          </ContentLoading>
        </ul>
      </CardBody>
    </Card>
  );
}

/**
 * AddresSection is a component that displays the addresses for a property.
 *
 * @param id - The property id
 */
function AddresSection(
  { id }: IdProps,
) {
  const queryResult = useGetPropertyAddressesQuery(id);
  const addressLabelId = useId();

  return (
    <Card>
      <CardHeader id={addressLabelId}>Addresses</CardHeader>
      <CardBody>
        <ContentLoading<MailingAddress[]> {...queryResult}>
          {(data) => (
            <ul
              className="grid grid-cols-2 gap-2"
              aria-labelledby={addressLabelId}
            >
              {data.map((address, key: number) => {
                const addressProps = {
                  addressTo: address.address2 && address.address1,
                  streetAddress: address.address3 || address.address2 ||
                    address.address1,
                  city: address.city ?? "",
                  state: address.state ?? "",
                  zip: address.zip,
                };
                return (
                  <li key={key}>
                    <Address {...addressProps} />
                  </li>
                );
              })}
            </ul>
          )}
        </ContentLoading>
      </CardBody>
    </Card>
  );
}

/**
 * MiniMapSection is a component that displays a mini map for a property.
 */
function MiniMapSection() {
  return (
    <section>
      <div>A mini map goes heres</div>
    </section>
  );
}
