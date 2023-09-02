import { Route, Routes } from "react-router-dom";
import PropertyDetail from "./components/detail";
import PropertyMap from "./components/map";
import PropertiesSearch from "./components/search";

/**
 * Layout for properties screen
 */
export default function Layout() {
  return (
    <article>
      <div className="grid grid-cols-[2fr_10fr] gap-4 p-2">
        <PropertiesSearch />
        <section>
          <Routes>
            <Route path="/:propertyId" element={<PropertyDetail />} />
            <Route path="/" element={<PropertyMap />} />
          </Routes>
        </section>
      </div>
    </article>
  );
}
