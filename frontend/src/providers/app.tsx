import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "@/routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// axios.defaults.baseURL = window.location.host + "/api";
// console.log("axios.defaults.baseURL", axios.defaults.baseURL);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProvider = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={AppRoutes} />
  </QueryClientProvider>
);
