import React, { useEffect } from 'react';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { FAQItem } from '../components/FAQItem';
import { SafeLink } from '../components/SafeLink';
import { setPageMeta, appendJsonLd } from '../utils/seo';

export const GestionLocative: React.FC = () => {
  useEffect(() => {
    // Set page meta
    setPageMeta({
      title: 'Gestion locative Fréjus | Kevin Griel (sélection locataires, GLI, suivi)',
      description: 'Gestion locative complète à Fréjus : sélection rigoureuse des locataires, mise en conformité, GLI, suivi administratif. Louez sans stress avec Kevin Griel.',
      keywords: 'gestion locative Fréjus, GLI, sélection locataires, conformité locative, gestion administrative',
    });

    // Add Service JSON-LD
    const cleanupService = appendJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Gestion locative',
      provider: {
        '@type': 'RealEstateAgent',
        name: 'Kevin Griel Immobilier',
      },
      areaServed: 'Fréjus, Saint-Raphaël, Var',
      description: 'Gestion locative complète : sélection locataires, mise en conformité, GLI, suivi administratif',
    });

    // Add FAQPage JSON-LD
    const cleanupFAQ = appendJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Combien coûte la gestion locative ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les honoraires dépendent du type de bien et des services choisis. Contactez-moi pour un devis personnalisé et transparent.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment sélectionnez-vous les locataires ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vérification complète : dossier financier, références employeur, précédents bailleurs, garanties. Seuls les profils solides sont retenus.',
          },
        },
        {
          '@type': 'Question',
          name: 'Que se passe-t-il en cas d\'impayé ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Avec la Garantie Loyers Impayés (GLI), vous êtes protégé. Je gère également les relances et procédures si nécessaire.',
          },
        },
      ],
    });

    return () => {
      cleanupService();
      cleanupFAQ();
    };
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-custom mb-6">
            Louer sans stress. Gérer avec méthode.
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Propriétaires bailleurs, confiez la gestion de votre bien à un expert local.
            De la sélection du locataire à la gestion quotidienne, je m'occupe de tout.
          </p>
          <SafeLink
            to="/contact"
            className="inline-block px-8 py-4 bg-amber-custom text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
          >
            Demander un audit locatif gratuit
          </SafeLink>
        </div>
      </Section>

      {/* Quatre avantages */}
      <Section background="white">
        <h2 className="text-3xl font-bold text-slate-custom text-center mb-12">
          Les avantages de la gestion locative avec Kevin Griel
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-slate-custom mb-2">
              Sélection rigoureuse
            </h3>
            <p className="text-sm text-gray-700">
              Vérification complète des dossiers pour des locataires fiables
            </p>
          </Card>
          <Card className="text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-lg font-semibold text-slate-custom mb-2">
              Protection GLI
            </h3>
            <p className="text-sm text-gray-700">
              Garantie Loyers Impayés pour sécuriser vos revenus
            </p>
          </Card>
          <Card className="text-center">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-lg font-semibold text-slate-custom mb-2">
              Conformité juridique
            </h3>
            <p className="text-sm text-gray-700">
              Mise en conformité DPE, électricité, baux conformes
            </p>
          </Card>
          <Card className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-slate-custom mb-2">
              Gestion complète
            </h3>
            <p className="text-sm text-gray-700">
              Quittances, régularisations, suivi administratif
            </p>
          </Card>
        </div>
      </Section>

      {/* Process en 5 étapes */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <h2 className="text-3xl font-bold text-slate-custom text-center mb-12">
          Mon process de gestion locative
        </h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-custom text-white rounded-full flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-custom mb-2">
                Estimation & stratégie locative
              </h3>
              <p className="text-gray-700">
                Analyse du marché local, estimation du loyer optimal, définition de la stratégie de mise en location.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-custom text-white rounded-full flex items-center justify-center font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-custom mb-2">
                Mise en valeur du bien
              </h3>
              <p className="text-gray-700">
                Photos professionnelles, annonces optimisées, diffusion ciblée sur les meilleurs supports.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-custom text-white rounded-full flex items-center justify-center font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-custom mb-2">
                Sélection rigoureuse des locataires
              </h3>
              <p className="text-gray-700">
                Vérification approfondie : situation financière, références employeur, précédents bailleurs, garanties.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-custom text-white rounded-full flex items-center justify-center font-bold text-xl">
              4
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-custom mb-2">
                Conformité juridique
              </h3>
              <p className="text-gray-700">
                Mise en conformité DPE, diagnostic électricité/gaz, rédaction du bail conforme à la loi Alur.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-custom text-white rounded-full flex items-center justify-center font-bold text-xl">
              5
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-custom mb-2">
                Gestion courante
              </h3>
              <p className="text-gray-700">
                Quittances mensuelles, régularisations de charges, suivi administratif et comptable tout au long du bail.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Offre Sérénité Bailleurs */}
      <Section background="white">
        <Card variant="highlight" className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-custom mb-4">
            Offre Sérénité Bailleurs
          </h2>
          <p className="text-gray-700 mb-6">
            Une formule tout-en-un pour louer l'esprit tranquille :
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-amber-custom text-xl">✓</span>
              <span className="text-gray-700">Estimation et stratégie locative</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-custom text-xl">✓</span>
              <span className="text-gray-700">Mise en conformité et valorisation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-custom text-xl">✓</span>
              <span className="text-gray-700">Sélection rigoureuse du locataire</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-custom text-xl">✓</span>
              <span className="text-gray-700">Garantie Loyers Impayés (GLI)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-custom text-xl">✓</span>
              <span className="text-gray-700">Gestion administrative complète</span>
            </li>
          </ul>
          <SafeLink
            to="/contact"
            className="inline-block px-6 py-3 bg-amber-custom text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
          >
            Demander un devis personnalisé
          </SafeLink>
        </Card>
      </Section>

      {/* Mention partenaire */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-custom mb-3">
              Partenariat de gestion
            </h3>
            <p className="text-gray-700 leading-relaxed">
              La gestion courante (quittances, régularisations, suivi administratif et comptable)
              est opérée via notre partenaire local agréé <strong>Argens Immobilier</strong>,
              sous ma supervision directe. Vous gardez un <strong>interlocuteur unique : Kevin Griel</strong>,
              pour toutes vos questions et démarches.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="white">
        <h2 className="text-3xl font-bold text-slate-custom text-center mb-12">
          Questions fréquentes
        </h2>
        <div className="max-w-3xl mx-auto space-y-2">
          <FAQItem
            question="Combien coûte la gestion locative ?"
            answer="Les honoraires dépendent du type de bien et des services choisis. Contactez-moi pour un devis personnalisé et transparent."
          />
          <FAQItem
            question="Comment sélectionnez-vous les locataires ?"
            answer="Vérification complète : dossier financier, références employeur, précédents bailleurs, garanties. Seuls les profils solides sont retenus."
          />
          <FAQItem
            question="Que se passe-t-il en cas d'impayé ?"
            answer="Avec la Garantie Loyers Impayés (GLI), vous êtes protégé. Je gère également les relances et procédures si nécessaire."
          />
          <FAQItem
            question="Combien de temps faut-il pour trouver un locataire ?"
            answer="En moyenne 2 à 4 semaines selon le bien et le marché. Je m'engage à diffuser rapidement et à sélectionner rigoureusement."
          />
          <FAQItem
            question="Puis-je résilier la gestion à tout moment ?"
            answer="Oui, le contrat de gestion est flexible. Un préavis de 3 mois est généralement appliqué, sauf clause particulière."
          />
        </div>
      </Section>

      {/* CTA Final */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-custom mb-4">
            Prêt à louer sans stress ?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Demandez votre audit locatif gratuit et discutons de votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SafeLink
              to="/contact"
              className="px-8 py-4 bg-amber-custom text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
            >
              Demander un audit gratuit
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
