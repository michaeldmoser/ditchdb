import { useParams } from "react-router-dom";
import {
  useGetPropertyAddressesQuery,
  useGetPropertyBillingQuery,
  useGetPropertyOwnersQuery,
  useGetPropertyQuery,
} from "../api";

import { Indicator, Orion } from "@/components/indicators";
import { Address } from "@/components/address";

export default function PropertyDetail() {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useGetPropertyQuery(id);

  return isError
    ? <div>{error?.data?.detail}</div>
    : isLoading
    ? <div>Loading...</div>
    : (
      <article>
        <PropertyDetailHeader {...data} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <PropertyDetailsSection {...data} />
            <ProperOwnersSection id={id} />
            <BillingSection id={id} />
            <AddresSection id={id} />
          </div>
          <MiniMapSection />
        </div>
      </article>
    );
}

function PropertyDetailHeader(
  {
    addr_number,
    addr_predirectional,
    addr_street,
    addr_roadsuffix,
    addr_postdirectional,
  }: Property,
) {
  return (
    <h2 className="text-2xl">
      {addr_number} {addr_predirectional} {addr_street} {addr_roadsuffix}{" "}
      {addr_postdirectional}
    </h2>
  );
}

function PropertyDetailsSection(
  {
    totmarket_acres,
    geocode,
    proptype,
  }: Property,
) {
  return (
    <section className="card bg-neutral text-neutral-content shadow m-2">
      <div className="card-body">
        <h3 className="card-title">Property Details</h3>
        <dl className="grid grid-cols-2 gap-2">
          <dt>Acres</dt>
          <dd>{totmarket_acres?.toFixed(2)}</dd>
          <dt>Geocode</dt>
          <dd>{geocode}</dd>
          <dt>Property Type</dt>
          <dd>{proptype}</dd>
        </dl>
      </div>
    </section>
  );
}

function ProperOwnersSection(
  { id }: { id: string | undefined },
) {
  const {
    data: ownerData,
    isLoading: ownerIsLoading,
    error: ownerError,
    isError: ownerIsError,
  } = useGetPropertyOwnersQuery(id);

  return (
    <section className="card bg-neutral text-neutral-content shadow m-2">
      <div className="card-body">
        <h3 className="card-title">Property Owners</h3>
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
      </div>
    </section>
  );
}

function BillingSection({ id }: { id: string }) {
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
    <section className="card bg-neutral text-neutral-content shadow m-2">
      <div className="card-body">
        <h3 className="card-title">Billing</h3>
        <dl className="grid grid-cols-2 gap-2">
          <dt>Yearly Assessment</dt>
          <dd>${45}</dd>
          <dt>Current Balance</dt>
          <dd>${data.current_balance}</dd>
        </dl>
        <h4 className="text-md font-bold mt-3">Billing Address</h4>
        <Address {...address} />
      </div>
    </section>
  );
}

function AddresSection(
  { id }: { id: string | undefined },
) {
  const {
    data: addressData,
    isLoading: addressIsLoading,
    error: addressError,
    isError: addressIsError,
  } = useGetPropertyAddressesQuery(id);
  return (
    <section className="card bg-neutral text-neutral-content shadow m-2">
      <div className="card-body">
        <h3 className="card-title">Addresses</h3>
        {addressIsError
          ? <div>{addressError?.data?.detail}</div>
          : addressIsLoading
          ? <div>Loading...</div>
          : (
            <ul className="grid grid-cols-2 gap-2">
              {addressData.map((address, key: number) => (
                <li key={key}>
                  <Indicator>
                    <Address {...address} />
                  </Indicator>
                </li>
              ))}
            </ul>
          )}
      </div>
    </section>
  );
}

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
