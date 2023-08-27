import { Route, Routes } from "react-router-dom";

import Layout from "./layout";

export default function PropertiesRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}
