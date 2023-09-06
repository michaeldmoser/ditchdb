/**
 * @file The api calls for the properties feature.
 */
import axios from "axios";
import type { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Property, PropertyAddress, PropertyBilling, PropertyOwner } from ".";

export function useGetPropertyQuery(id: number) {
  return useQuery<Property, AxiosError>(
    {
      queryKey: ["property", id],
      queryFn: () => axios.get(`/api/properties/${id}`).then((res) => res.data),
    },
  );
}

export function useGetPropertiesQuery() {
  return useQuery<DjangoResponse<Property>, AxiosError>(
    {
      queryKey: ["properties"],
      queryFn: () => axios.get("/api/properties").then((res) => res.data),
    },
  );
}

export function useGetPropertyOwnersQuery(id: number) {
  return useQuery<PropertyOwner[], AxiosError>(
    {
      queryKey: ["propertyOwners", id],
      queryFn: () =>
        axios.get(`/api/properties/${id}/owners`).then((res) => res.data),
    },
  );
}

export function useGetPropertyAddressesQuery(id: number) {
  return useQuery<PropertyAddress[], AxiosError>(
    {
      queryKey: ["propertyAddresses", id],
      queryFn: () =>
        axios.get(`/api/properties/${id}/addresses`).then((res) => res.data),
    },
  );
}

export function useGetPropertyBillingQuery(id: number) {
  return useQuery<PropertyBilling, AxiosError>(
    {
      queryKey: ["propertyBilling", id],
      queryFn: () =>
        axios.get(`/api/properties/${id}/billing`).then((res) => res.data),
    },
  );
}

export function useCreatePropertyBilling() {
  const queryClient = useQueryClient();
  return useMutation<
    PropertyBilling,
    AxiosError,
    PropertyBilling & { propertyId: number }
  >(
    {
      mutationFn: ({ propertyId, ...billing }) => {
        return axios.post(`/api/properties/${propertyId}/billing`, billing);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["propertyBilling"] });
      },
    },
  );
}
