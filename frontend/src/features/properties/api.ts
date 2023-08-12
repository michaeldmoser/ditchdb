/**
 * @file The api calls for the properties feature.
 */

import api from "@/stores/api";

const propertiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<DjangoResponse<Property>, void>({
      query: () => "/properties/",
    }),
    getProperty: builder.query({
      query: (id) => `/properties/${id}`,
    }),
    createProperty: builder.mutation({
      query: (property) => ({
        url: "/properties",
        method: "POST",
        body: property,
      }),
    }),
    updateProperty: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/properties/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
    }),
    getPropertyOwners: builder.query({
      query: (id) => ({
        url: `/properties/${id}/owners`,
      }),
    }),
    getPropertyAddresses: builder.query({
      query: (id) => ({
        url: `/properties/${id}/addresses`,
      }),
    }),
  }),
});

api.enhanceEndpoints({ addTagTypes: ["Properties"] });

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetPropertyOwnersQuery,
  useGetPropertyAddressesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertiesApi;
