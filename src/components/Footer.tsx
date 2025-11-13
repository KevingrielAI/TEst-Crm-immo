import React from 'react';
import { SafeLink } from './SafeLink';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-custom text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Kevin Griel Immobilier. Tous droits réservés.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <SafeLink to="/mentions" className="hover:text-amber-custom transition-colors">
              Mentions légales
            </SafeLink>
            <SafeLink to="/confidentialite" className="hover:text-amber-custom transition-colors">
              Politique de confidentialité
            </SafeLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
