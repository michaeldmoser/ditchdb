import { Outlet, createBrowserRouter, useRoutes } from 'react-router-dom';

import MainLayout from '@/layouts/main';

import PropertiesRoutes from '@/features/properties/routes';

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const AppRoutes = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'properties/*',
          element: <PropertiesRoutes />
        }
      ]
    }
  ],
  { basename: '/app' }
);
