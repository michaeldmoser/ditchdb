import React from "react";
import { render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import QueryClientProvider from "@/libs/query-client";

export default function render(ui: React.ReactElement, {
  initialEntries = ["/"],
  ...renderOptions
} = {}) {
  const TestEnvironmentWrapper = ({ children }: React.PropsWithChildren) => (
    <React.StrictMode>
      <MemoryRouter initialEntries={initialEntries}>
        <QueryClientProvider>
          {children}
        </QueryClientProvider>
      </MemoryRouter>
    </React.StrictMode>
  );

  return {
    ...rtlRender(ui, { wrapper: TestEnvironmentWrapper, ...renderOptions }),
    userEvent: userEvent.setup(),
  };
}
