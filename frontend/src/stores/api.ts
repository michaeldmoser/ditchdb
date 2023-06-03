/**
 * Sets up the API client for the frontend.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      return headers;
    }
  }),
  endpoints: () => ({})
});

export default api;
