import React, { useState } from 'react';
import { SafeNavLink, SafeLink } from './SafeLink';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <SafeLink to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-custom rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">KG</span>
            </div>
            <div className="hidden md:block">
              <div className="font-bold text-slate-custom text-lg">Kevin Griel</div>
              <div className="text-xs text-gray-600">Immobilier Fréjus</div>
            </div>
          </SafeLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <SafeNavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-amber-custom' : 'text-slate-custom hover:text-amber-custom'
                }`
              }
            >
              Accueil
            </SafeNavLink>
            <SafeNavLink
              to="/gestion-locative"
              className={({ isActive }: { isActive: boolean }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-amber-custom' : 'text-slate-custom hover:text-amber-custom'
                }`
              }
            >
              Gestion locative
            </SafeNavLink>
            <SafeNavLink
              to="/vente"
              className={({ isActive }: { isActive: boolean }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-amber-custom' : 'text-slate-custom hover:text-amber-custom'
                }`
              }
            >
              Vente
            </SafeNavLink>
            <SafeNavLink
              to="/a-propos"
              className={({ isActive }: { isActive: boolean }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-amber-custom' : 'text-slate-custom hover:text-amber-custom'
                }`
              }
            >
              À propos
            </SafeNavLink>
            <SafeNavLink
              to="/contact"
              className={({ isActive }: { isActive: boolean }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-amber-custom' : 'text-slate-custom hover:text-amber-custom'
                }`
              }
            >
              Contact
            </SafeNavLink>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <SafeLink
              to="/gestion-locative"
              className="px-4 py-2 text-sm font-medium text-amber-custom border border-amber-custom rounded-md hover:bg-amber-50 transition-colors"
            >
              Audit locatif
            </SafeLink>
            <SafeLink
              to="/vente"
              className="px-4 py-2 text-sm font-medium text-white bg-amber-custom rounded-md hover:bg-amber-700 transition-colors"
            >
              Estimation vente
            </SafeLink>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-custom hover:text-amber-custom"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <SafeNavLink
                to="/"
                className="text-slate-custom hover:text-amber-custom font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </SafeNavLink>
              <SafeNavLink
                to="/gestion-locative"
                className="text-slate-custom hover:text-amber-custom font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gestion locative
              </SafeNavLink>
              <SafeNavLink
                to="/vente"
                className="text-slate-custom hover:text-amber-custom font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vente
              </SafeNavLink>
              <SafeNavLink
                to="/a-propos"
                className="text-slate-custom hover:text-amber-custom font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                À propos
              </SafeNavLink>
              <SafeNavLink
                to="/contact"
                className="text-slate-custom hover:text-amber-custom font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </SafeNavLink>
              <div className="flex flex-col gap-2 pt-2">
                <SafeLink
                  to="/gestion-locative"
                  className="px-4 py-2 text-center font-medium text-amber-custom border border-amber-custom rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Audit locatif
                </SafeLink>
                <SafeLink
                  to="/vente"
                  className="px-4 py-2 text-center font-medium text-white bg-amber-custom rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Estimation vente
                </SafeLink>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
