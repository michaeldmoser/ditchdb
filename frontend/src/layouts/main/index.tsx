import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';
import Main from './main';
import Sidebar from './sidebar';

export default function MainLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="grid grid-areas-layout grid-cols-layout grid-rows-layout h-full">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Sidebar />
      <Footer />
    </div>
  );
}
