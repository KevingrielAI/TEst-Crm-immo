import React, { useEffect } from 'react';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { SafeLink } from '../components/SafeLink';
import { setPageMeta } from '../utils/seo';

export const Vente: React.FC = () => {
  useEffect(() => {
    setPageMeta({
      title: 'Vente immobilière Fréjus | Estimation fiable & stratégie',
      description: 'Vendre votre bien immobilier à Fréjus avec Kevin Griel : estimation fiable, valorisation professionnelle, diffusion ciblée et accompagnement jusqu\'à la signature.',
      keywords: 'vente immobilière Fréjus, estimation bien, transaction immobilière, agent immobilier Fréjus',
    });
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-custom mb-6">
            Vendre au bon prix, sans précipitation.
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Votre projet de vente mérite une estimation précise et une stratégie adaptée à vos objectifs.
            Je vous accompagne de A à Z, en toute transparence.
          </p>
          <SafeLink
            to="/contact"
            className="inline-block px-8 py-4 bg-amber-custom text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
          >
            Faire estimer mon bien gratuitement
          </SafeLink>
        </div>
      </Section>

      {/* Méthode */}
      <Section background="white">
        <h2 className="text-3xl font-bold text-slate-custom text-center mb-12">
          Ma méthode de vente
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Estimation fiable
            </h3>
            <p className="text-gray-700">
              Analyse du marché local, comparaison avec les ventes récentes, évaluation précise du potentiel de votre bien.
            </p>
          </Card>
          <Card>
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Valorisation soignée
            </h3>
            <p className="text-gray-700">
              Photos professionnelles, visite virtuelle si besoin, home staging conseil pour maximiser l'attractivité.
            </p>
          </Card>
          <Card>
            <div className="text-4xl mb-4">📢</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Diffusion ciblée
            </h3>
            <p className="text-gray-700">
              Annonces optimisées sur les meilleurs portails, réseau local, communication maîtrisée pour attirer les bons profils.
            </p>
          </Card>
          <Card>
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Négociation
            </h3>
            <p className="text-gray-700">
              Gestion des visites, présélection des acquéreurs sérieux, négociation pour obtenir le meilleur prix.
            </p>
          </Card>
          <Card>
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Suivi notaire
            </h3>
            <p className="text-gray-700">
              Accompagnement jusqu'à la signature, coordination avec le notaire, gestion des documents et diagnostics.
            </p>
          </Card>
          <Card>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Transparence totale
            </h3>
            <p className="text-gray-700">
              Point régulier sur les retours de visites, statistiques de diffusion, conseils pour ajuster la stratégie si besoin.
            </p>
          </Card>
        </div>
      </Section>

      {/* Pourquoi vendre avec Kevin */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-custom text-center mb-12">
            Pourquoi vendre avec Kevin Griel ?
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="text-amber-custom text-3xl">✓</span>
              <div>
                <h3 className="text-xl font-semibold text-slate-custom mb-2">
                  Expertise locale reconnue
                </h3>
                <p className="text-gray-700">
                  Je connais parfaitement le marché de Fréjus et ses alentours : prix au m², quartiers recherchés, profils d'acheteurs.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-amber-custom text-3xl">✓</span>
              <div>
                <h3 className="text-xl font-semibold text-slate-custom mb-2">
                  Interlocuteur unique et disponible
                </h3>
                <p className="text-gray-700">
                  Vous traitez directement avec moi, du début à la fin. Pas d'intermédiaire, une vraie relation de confiance.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-amber-custom text-3xl">✓</span>
              <div>
                <h3 className="text-xl font-semibold text-slate-custom mb-2">
                  Stratégie sur mesure
                </h3>
                <p className="text-gray-700">
                  Chaque bien est unique. J'adapte la communication, le prix et le calendrier à votre situation et vos objectifs.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-amber-custom text-3xl">✓</span>
              <div>
                <h3 className="text-xl font-semibold text-slate-custom mb-2">
                  Accompagnement humain
                </h3>
                <p className="text-gray-700">
                  Vendre un bien, c'est souvent un moment important. Je suis là pour vous rassurer, vous conseiller et vous accompagner sereinement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Final */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-custom mb-4">
            Prêt à vendre votre bien ?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Demandez une estimation gratuite et sans engagement. Discutons ensemble de votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SafeLink
              to="/contact"
              className="px-8 py-4 bg-amber-custom text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
            >
              Demander une estimation
            </SafeLink>
            <a
              href="tel:+33612345678"
              className="px-8 py-4 border-2 border-amber-custom text-amber-custom font-semibold rounded-md hover:bg-amber-50 transition-colors"
            >
              Appeler maintenant
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};
