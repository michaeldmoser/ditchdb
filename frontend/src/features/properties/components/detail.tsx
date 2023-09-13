import { useId } from "react";
import { Address } from "@/components/address";

import { Card, CardBody, CardHeader } from "@/components/cards";
import NoBillingSetup from "./no-billing-setup";

import {
  useGetPropertyAddressesQuery,
  useGetPropertyBillingQuery,
  useGetPropertyOwnersQuery,
  useGetPropertyQuery,
} from "../api";

import { usePropertyId } from "../hooks";
import { ContentLoading } from "@/components/loaders";

type IdProps = {
  id: number;
};

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
              <BillingSection id={id} />
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
 * Header for Property Detail page
 */
function PropertyDetailHeader(
  {
    labelId,
    address,
  }: Property & { labelId: string },
) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between">
      <h2 id={labelId} className="text-2xl">
        {address}
      </h2>
    </header>
  );
}

/**
 * Display the proerty detail card
 */
function PropertyDetailsSection(
  {
    totmarket_acres,
    geocode,
    proptype,
  }: Property,
) {
  return (
    <Card>
      <CardHeader>
        Property Details
      </CardHeader>
      <CardBody>
        <dl className="grid grid-cols-2 gap-2">
          <dt>Acres</dt>
          <dd>{totmarket_acres?.toFixed(2)}</dd>
          <dt>Geocode</dt>
          <dd>{geocode}</dd>
          <dt>Property Type</dt>
          <dd>{proptype}</dd>
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

  return (
    <Card>
      <CardHeader>
        Property Owners
      </CardHeader>
      <CardBody>
        <ul>
          <ContentLoading<Owner[]> {...queryResult}>
            {(data) => (
              <>
                {data.map((owner, key) => (
                  <li key={key} className="text-error">
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
 * BillingSection is a component that displays the billing information for a property.
 */
function BillingSection({ id }: IdProps) {
  const queryResult = useGetPropertyBillingQuery(id);

  return (
    <Card>
      <CardHeader>
        Billing
      </CardHeader>
      <CardBody>
        <ContentLoading<Billing>
          {...queryResult}
          notFoundComponent={() => <NoBillingSetup propertyId={id} />}
        >
          {(data) => {
            const address = {
              addressTo: data.address_to_line,
              attentionTo: data.attention_to_line,
              streetAddress: data.street_address,
              city: data.city ?? "",
              state: data.state ?? "",
              zip: data.zip,
            };
            return (
              <dl className="grid grid-cols-2 gap-2">
                <dt>Yearly Assessment</dt>
                <dd>${45}</dd>
                <dt>Current Balance</dt>
                <dd>${data.current_balance}</dd>
                <dt>Billing Address</dt>
                <dd className="grid grid-cols-2">
                  <Address {...address} />
                </dd>
              </dl>
            );
          }}
        </ContentLoading>
      </CardBody>
    </Card>
  );
}

/**
 * AddresSection is a component that displays the addresses for a property.
 */
function AddresSection(
  { id }: IdProps,
) {
  const queryResult = useGetPropertyAddressesQuery(id);

  return (
    <Card>
      <CardHeader>Addresses</CardHeader>
      <CardBody>
        <ContentLoading<MailingAddress[]> {...queryResult}>
          {(data) => (
            <ul className="grid grid-cols-2 gap-2">
              {data.map((address, key: number) => {
                const addressProps = {
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
