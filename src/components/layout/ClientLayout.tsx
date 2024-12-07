'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import PromoBanner from '../common/PromoBanner';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && (
        <>
          <Header />
          <PromoBanner />
        </>
      )}
      <main className={`${isDashboard ? 'min-h-screen' : ''}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}
