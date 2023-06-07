import { PropsWithChildren } from 'react';

export default function Main({ children }: PropsWithChildren<{}>) {
  return (
    <main className="grid grid-areas-main grid-cols-main grid-rows-main overflow-y-auto">
      {children}
    </main>
  );
}
