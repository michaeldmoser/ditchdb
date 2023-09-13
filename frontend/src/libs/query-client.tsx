import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = window.location.origin;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function QueryClientProvider(
  { children }: React.PropsWithChildren<{}>,
) {
  return (
    <Provider client={queryClient}>
      {children}
    </Provider>
  );
}
