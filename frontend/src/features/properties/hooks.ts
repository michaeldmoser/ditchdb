import { useParams } from "react-router-dom";

/**
 * @file Property specific hooks
 */

/**
 * Gets the property id from the url using the useParams hook from react-router-dom. Note that the parameter name in the URL must be "propertyId".
 * @returns The property id from the url.
 * @throws An error if the property id is not a number.
 */
export function usePropertyId() {
  const id: number = parseInt(
    useParams<{ propertyId: string }>()?.propertyId ?? "",
    10,
  );

  if (isNaN(id)) {
    throw new Error("No property id or an invalid property id provided");
  }

  return id;
}
