/**
 * @file The api calls for the properties feature.
 */
import axios from "axios";
import type { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  return useQuery<Owner[], AxiosError>(
    {
      queryKey: ["propertyOwners", id],
      queryFn: () =>
        axios.get(`/api/properties/${id}/owners`).then((res) => res.data),
    },
  );
}

export function useGetPropertyAddressesQuery(id: number) {
  return useQuery<MailingAddress[], AxiosError>(
    {
      queryKey: ["mailingAddress", id],
      queryFn: () =>
        axios.get(`/api/properties/${id}/addresses`).then((res) => res.data),
    },
  );
}

export function useGetPropertyBillingQuery(id: number) {
  return useQuery<Billing, AxiosError>(
    {
      queryKey: ["billing", id],
      queryFn: () =>
        axios.get(`/api/properties/${id}/billing`).then((res) => res.data),
    },
  );
}

export function useCreatePropertyBilling() {
  const queryClient = useQueryClient();
  return useMutation<
    Billing,
    AxiosError,
    Billing & { propertyId: number }
  >(
    {
      mutationFn: ({ propertyId, ...billing }) => {
        return axios.post(`/api/properties/${propertyId}/billing`, billing);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["billing"] });
      },
    },
  );
}
