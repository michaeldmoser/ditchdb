import { Route, Routes } from 'react-router-dom';

import Layout from './layout';
import List from './list';

export default function PropertiesRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}
