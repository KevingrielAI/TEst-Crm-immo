import React, { useEffect } from 'react';
import { Section } from '../components/Section';
import { ContactForm } from '../components/ContactForm';
import { setPageMeta } from '../utils/seo';

export const Contact: React.FC = () => {
  useEffect(() => {
    setPageMeta({
      title: 'Contact | Kevin Griel Immobilier - Fréjus',
      description: 'Contactez Kevin Griel pour votre projet immobilier à Fréjus : gestion locative, transaction, estimation. Téléphone, email, WhatsApp ou formulaire.',
      keywords: 'contact Kevin Griel, immobilier Fréjus, rendez-vous, devis',
    });
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-custom mb-6">
            Parlons de votre projet
          </h1>
          <p className="text-xl text-gray-700">
            Une question ? Un projet immobilier ? Je vous réponds dans les 24h.
          </p>
        </div>
      </Section>

      {/* Contact Methods & Form */}
      <Section background="white">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Coordonnées */}
          <div>
            <h2 className="text-2xl font-bold text-slate-custom mb-6">
              Mes coordonnées
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <h3 className="font-semibold text-slate-custom mb-1">Zone d'intervention</h3>
                  <p className="text-gray-700">
                    Fréjus, Saint-Raphaël, Roquebrune-sur-Argens, Puget-sur-Argens,
                    Les Issambres, Bagnols-en-Forêt, Le Muy, Saint-Aygulf
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl">📞</span>
                <div>
                  <h3 className="font-semibold text-slate-custom mb-1">Téléphone</h3>
                  <a
                    href="tel:+33612345678"
                    className="text-amber-custom hover:underline text-lg"
                  >
                    06 12 34 56 78
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Du lundi au samedi, 9h-19h
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl">✉️</span>
                <div>
                  <h3 className="font-semibold text-slate-custom mb-1">Email</h3>
                  <a
                    href="mailto:contact@kevin-griel-immobilier.fr"
                    className="text-amber-custom hover:underline"
                  >
                    contact@kevin-griel-immobilier.fr
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Réponse sous 24h
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl">💬</span>
                <div>
                  <h3 className="font-semibold text-slate-custom mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/33612345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-custom hover:underline"
                  >
                    Envoyer un message
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Réponse rapide
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl">📅</span>
                <div>
                  <h3 className="font-semibold text-slate-custom mb-1">Prendre rendez-vous</h3>
                  <a
                    href="https://calendly.com/kevin-griel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-custom hover:underline"
                  >
                    Réserver un créneau (Calendly)
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Visio ou rendez-vous physique
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <h2 className="text-2xl font-bold text-slate-custom mb-6">
              Formulaire de contact
            </h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </div>
  );
};
