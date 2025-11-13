import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';

// Pages
import { Home } from '../pages/Home';
import { GestionLocative } from '../pages/GestionLocative';
import { Vente } from '../pages/Vente';
import { APropos } from '../pages/APropos';
import { Contact } from '../pages/Contact';
import { Mentions } from '../pages/Mentions';
import { Confidentialite } from '../pages/Confidentialite';

/**
 * ScrollToTop component - scrolls to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * App Layout with Header and Footer
 */
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}

/**
 * Main App Router with HashRouter
 */
export function AppRouter() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gestion-locative" element={<GestionLocative />} />
          <Route path="/vente" element={<Vente />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions" element={<Mentions />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
