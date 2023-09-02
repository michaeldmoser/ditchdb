import { useId } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Address } from "@/components/address";

import { Card, CardBody, CardHeader } from "@/components/cards";
import { ErrorAlert } from "@/components/alerts";
import type { Property, PropertyOwner } from "../";
import NoBillingSetup from "./no-billing-setup";

import {
  useGetPropertyAddressesQuery,
  useGetPropertyBillingQuery,
  useGetPropertyOwnersQuery,
  useGetPropertyQuery,
} from "../api";

import { usePropertyId } from "../hooks";

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
            <article>
              <PropertyDetailsSection {...data} />
              <PropertyOwnersSection id={id} />
              <BillingSection id={id} />
              <AddresSection id={id} />
            </article>
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
    addr_number,
    addr_predirectional,
    addr_street,
    addr_roadsuffix,
    addr_postdirectional,
  }: Property & { labelId: string },
) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between">
      <h2 id={labelId} className="text-2xl">
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
          <ContentLoading<PropertyOwner[]> {...queryResult}>
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
  const {
    data,
    isLoading,
    error,
    isError,
  } = useGetPropertyBillingQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError && error?.response?.status === 404) {
    return <NoBillingSetup />;
  }
  if (isError) return <div>{error?.message}</div>;

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
          <dt>Billing Address</dt>
          <dd className="grid grid-cols-2">
            <Address {...address} />
          </dd>
        </dl>
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
    data,
    isLoading,
    error,
    isError,
  } = useGetPropertyAddressesQuery(id);

  return (
    <Card>
      <CardHeader>Addresses</CardHeader>
      <CardBody>
        {isError
          ? <div>{error?.data?.detail}</div>
          : isLoading
          ? <div>Loading...</div>
          : (
            <ul className="grid grid-cols-2 gap-2">
              {data.map((address, key: number) => (
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

/**
 * Guard function to check if an error is a isDjangoError
 */
function isDjangoError(error: any): error is DjangoError {
  return error && error.isAxiosError;
}

function isNotFound(error: any) {
  return error.response?.status === 404;
}

/**
 * Display a a notFoundComponent if the error is a 404, otherwise display the errorComponent if it exists, otherwise display the error message.
 *
 * @param error The error from react-query
 * @param errorComponent A component to display when an error occurs. This must be a render function.
 * @param notFoundComponent A component to display when a 404 occurs. This must be a render function.
 */
function displayError<Terror>(
  { error, errorComponent, notFoundComponent }:
    & { error: Terror }
    & {
      errorComponent?: (error: Terror) => React.ReactNode;
      notFoundComponent?: (error: Terror) => React.ReactNode;
    },
) {
  if (isDjangoError(error) && isNotFound(error)) {
    return notFoundComponent ? notFoundComponent(error) : <div>Not Found</div>;
  }

  if (isDjangoError(error)) {
    return errorComponent ? errorComponent(error) : <div>{error.message}</div>;
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  throw new Error("Unhandled error");
}

/**
 * Display and error message from react-query if one exists, otherwise display the content when loading is completed, otherwise display a loading message.
 * @param children The content to display when loading is completed. This must be a render function.
 * @param error The error from react-query
 * @param isLoading The loading state from react-query
 * @param data The data from react-query
 * @param ErrorComponent A component to display when an error occurs. This must be a render function.
 */
function ContentLoading<Tdata = any, Terror = DjangoError>(
  { error, children, isLoading, data, errorComponent, notFoundComponent }:
    & UseQueryResult<Tdata, Terror>
    & {
      children: (data: Tdata) => React.ReactNode;
      errorComponent?: (error: Terror) => React.ReactNode;
      notFoundComponent?: (error: Terror) => React.ReactNode;
    },
) {
  if (error) {
    return (
      <>
        {displayError<Terror>(
          { error, errorComponent, notFoundComponent },
        )}
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="flex animate-pulse">
        <div className="ml-4 mt-2 w-full">
          <h3
            className="h-4 bg-gray-200 rounded-md dark:bg-gray-700"
            style={{ width: "40%" }}
          >
          </h3>

          <ul className="mt-5 space-y-3">
            <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700">
            </li>
            <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700">
            </li>
            <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700">
            </li>
            <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700">
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return <>{children(data)}</>;
}

/**
 * Determine the error message to display from an error object.
 */
function parseError(error: DjangoError) {
  return ("response" in error && error.response?.status === 404)
    ? "The record could not be found."
    : ("response" in error && error.response?.data)
    ? error.response?.data?.detail
    : ("message" in error)
    ? error.message
    : "An unknown error has occurred.";
}
