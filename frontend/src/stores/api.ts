/**
 * Sets up the API client for the frontend.
 */

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

interface ApiError {
  data: {
    detail: string;
  };
  status: number;
}

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, ApiError, {}>,
  endpoints: () => ({}),
});

export default api;
