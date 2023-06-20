import { Route, Routes } from 'react-router-dom';
import List from './list';
import PropertyDetail from './components/detail';
import PropertyMap from './components/map';

/**
 * Layout for properties screen
 *
 * @function Layout
 * @returns {JSX.Element} properties page layout
 */
export default function Layout() {
  return (
    <article>
      <h2 className="text-2xl">Properties</h2>
      <div className="grid grid-cols-[2fr_10fr] gap-4">
        <section className='bg-neutral text-neutral-content'>
          <List />
        </section>
        <section>
          <Routes>
            <Route path="/:id" element={<PropertyDetail />} />
            <Route path="/" element={<PropertyMap />} />
          </Routes>
        </section>
      </div>
    </article>
  );
}
