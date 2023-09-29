import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "@/routes";

import QueryClientProvider from "@/libs/query-client";

export const AppProvider = () => (
  <QueryClientProvider>
    <RouterProvider router={AppRoutes} />
  </QueryClientProvider>
);
