/**
 * Wrapper around @reduxjs/toolkit `configureStore()` that configures the store for the application. This takes nearly all of the default options, but allows for the addition of middleware and enhancers.
 */

import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root-reducer';
import api from './api';

const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      ...rootReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware)
  });

  return store;
};

export default configureAppStore;
