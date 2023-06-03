import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@/routes';
import store from '@/stores';
import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';

const StoreProvider = ({ children }: PropsWithChildren) => (
  <Provider store={store}>{children}</Provider>
);

export const AppProvider = () => (
  <StoreProvider>
    <Router basename="/app">
      <AppRoutes />
    </Router>
  </StoreProvider>
);
