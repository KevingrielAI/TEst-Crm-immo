import React, { useState, useEffect } from 'react';
import { SafeLink } from './SafeLink';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics: true,
      timestamp: Date.now()
    }));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics: false,
      timestamp: Date.now()
    }));
    setIsVisible(false);
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const handleSaveCustom = (analytics: boolean) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics,
      timestamp: Date.now()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl border-t border-gray-200">
      <div className="max-w-6xl mx-auto p-6">
        {!showCustomize ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                Pour une navigation fluide et la mesure d'audience, nous utilisons des cookies.
                Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment.{' '}
                <SafeLink to="/confidentialite" className="text-amber-custom hover:underline">
                  En savoir plus
                </SafeLink>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-amber-custom text-white rounded-md hover:bg-amber-700 transition-colors font-medium"
              >
                Tout accepter
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Refuser
              </button>
              <button
                onClick={handleCustomize}
                className="px-4 py-2 border border-amber-custom text-amber-custom rounded-md hover:bg-amber-50 transition-colors font-medium"
              >
                Personnaliser
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-custom">Préférences de cookies</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-custom">Cookies nécessaires</p>
                  <p className="text-sm text-gray-600">Requis pour le fonctionnement du site</p>
                </div>
                <input type="checkbox" checked disabled className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-custom">Cookies analytiques</p>
                  <p className="text-sm text-gray-600">Nous aident à améliorer le site</p>
                </div>
                <input
                  type="checkbox"
                  id="analytics-cookie"
                  defaultChecked
                  className="w-4 h-4"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const analyticsCheckbox = document.getElementById('analytics-cookie') as HTMLInputElement;
                  handleSaveCustom(analyticsCheckbox?.checked || false);
                }}
                className="px-4 py-2 bg-amber-custom text-white rounded-md hover:bg-amber-700 transition-colors font-medium"
              >
                Enregistrer mes préférences
              </button>
              <button
                onClick={() => setShowCustomize(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Retour
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
