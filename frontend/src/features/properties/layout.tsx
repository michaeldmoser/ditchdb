import { Outlet } from 'react-router-dom';

/**
 * Layout for properties screen
 *
 * @function Layout
 * @returns {JSX.Element} properties page layout
 */
export default function Layout() {
  return (
    <section>
      <h2 className="text-2xl">Properties</h2>
      <Outlet />
    </section>
  );
}
