import { useId } from "react";
import { useParams } from "react-router-dom";
import {
  useGetPropertyAddressesQuery,
  useGetPropertyBillingQuery,
  useGetPropertyOwnersQuery,
  useGetPropertyQuery,
} from "../api";

import { Address } from "@/components/address";

import { Card, CardBody, CardHeader } from "@/components/cards";
import { Info } from "@/components/alerts";
import { Button } from "@/components/buttons";

type PropertyDetailParams = {
  id: string;
};

type IdProps = {
  id: string | undefined;
};

/**
 * Property dpetail page
 */
export default function PropertyDetail() {
  const { id } = useParams<PropertyDetailParams>();
  const { data, isLoading, error, isError } = useGetPropertyQuery(id);
  const propertyHeadingId = useId();

  if (isError && "data" in error) {
    return <div>{error?.data?.detail}</div>;
  }

  return isLoading
    ? <div>Loading...</div>
    : (
      <article aria-labelledby={propertyHeadingId}>
        <PropertyDetailHeader {...data} id={propertyHeadingId} />
        <div className="grid grid-cols-2 gap-4">
          <article>
            <PropertyDetailsSection {...data} />
            <ProperOwnersSection id={id} />
            <BillingSection id={id} />
            <AddresSection id={id} />
          </article>
          <MiniMapSection />
        </div>
      </article>
    );
}

/**
 * Header for Property Detail page
 */
function PropertyDetailHeader(
  {
    id,
    addr_number,
    addr_predirectional,
    addr_street,
    addr_roadsuffix,
    addr_postdirectional,
  }: Property & { id: string },
) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between">
      <h2 id={id} className="text-2xl">
        {addr_number} {addr_predirectional} {addr_street} {addr_roadsuffix}{" "}
        {addr_postdirectional}
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
function ProperOwnersSection(
  { id }: IdProps,
) {
  const {
    data: ownerData,
    isLoading: ownerIsLoading,
    error: ownerError,
    isError: ownerIsError,
  } = useGetPropertyOwnersQuery(id);

  return (
    <Card>
      <CardHeader>
        Property Owners
      </CardHeader>
      <CardBody>
        <ul>
          {ownerIsError
            ? <div>{ownerError?.data?.detail}</div>
            : ownerIsLoading
            ? <div>Loading...</div>
            : (
              ownerData.map((owner, key) => (
                <li key={key} className="text-error">
                  {owner.fullname}
                </li>
              ))
            )}
        </ul>
      </CardBody>
    </Card>
  );
}

/**
 * BillingSection is a component that displays the billing information for a property.
 */
function BillingSection({ id }: IdProps) {
  const {
    data,
    isLoading,
    error,
    isError,
  } = useGetPropertyBillingQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError && "status" in error && error?.status === 404) {
    return <NoBillingSetup />;
  }
  if (isError && "status" in error) return <div>{error?.data?.detail}</div>;

  const address = {
    address1: data.address_to_line,
    address2: data.attention_to_line,
    city: data.city,
    state: data.state,
    zip: data.zip,
  };

  return (
    <Card>
      <CardHeader>
        Billing
      </CardHeader>
      <CardBody>
        <dl className="grid grid-cols-2 gap-2">
          <dt>Yearly Assessment</dt>
          <dd>${45}</dd>
          <dt>Current Balance</dt>
          <dd>${data.current_balance}</dd>
        </dl>
        <h4 className="text-md font-bold mt-3">Billing Address</h4>
        <Address {...address} />
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
  const {
    data: addressData,
    isLoading: addressIsLoading,
    error: addressError,
    isError: addressIsError,
  } = useGetPropertyAddressesQuery(id);

  return (
    <Card>
      <CardHeader>Addresses</CardHeader>
      <CardBody>
        {addressIsError
          ? <div>{addressError?.data?.detail}</div>
          : addressIsLoading
          ? <div>Loading...</div>
          : (
            <ul className="grid grid-cols-2 gap-2">
              {addressData.map((address, key: number) => (
                <li key={key}>
                  <Address {...address} />
                </li>
              ))}
            </ul>
          )}
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

function NoBillingSetup() {
  return (
    <section className="card bg-neutral text-neutral-content shadow m-2">
      <div className="card-body">
        <h3 className="card-title">Billing</h3>
        <p className="mt-3">No billing has been setup yet.</p>
      </div>
    </section>
  );
}
