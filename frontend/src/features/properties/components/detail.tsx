import { useParams } from "react-router-dom";
import {
  useGetPropertyAddressesQuery,
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
            <AssessmentSection />
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
        <h4 className="card-title">Property Details</h4>
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
        <h4 className="card-title">Property Owners</h4>
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

function AssessmentSection() {
  return (
    <section className="card bg-neutral text-neutral-content shadow m-2">
      <div className="card-body">
        <h4 className="card-title">Assessments</h4>
        <dl className="grid grid-cols-2 gap-2">
          <dt>Yearly Assessment</dt>
          <dd>${45}</dd>
          <dt>Current Balance</dt>
          <dd>${450}</dd>
        </dl>
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
        <h4 className="card-title">Addresses</h4>
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
