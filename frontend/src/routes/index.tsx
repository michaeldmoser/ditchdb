import { Outlet, useRoutes } from 'react-router-dom';

import MainLayout from '@/layouts/main';

import PropertiesRoutes from '@/features/properties/routes';

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const AppRoutes = () => {
  const element = useRoutes([
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
  ]);

  return <>{element}</>;
};
