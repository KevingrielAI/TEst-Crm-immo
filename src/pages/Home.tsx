import React, { useEffect } from 'react';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { SafeLink } from '../components/SafeLink';
import { ContactForm } from '../components/ContactForm';
import { setPageMeta, appendJsonLd } from '../utils/seo';

export const Home: React.FC = () => {
  useEffect(() => {
    // Set page meta
    setPageMeta({
      title: 'Kevin Griel Immobilier | Consultant immobilier à Fréjus (Gestion locative & Transaction)',
      description: 'Consultant immobilier à Fréjus spécialisé en gestion locative et transaction. Louer ou vendre sans stress, avec un vrai suivi humain.',
      keywords: 'immobilier Fréjus, gestion locative, transaction immobilière, consultant immobilier, Saint-Raphaël',
    });

    // Add JSON-LD
    const cleanup = appendJsonLd({
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Kevin Griel Immobilier',
      description: 'Consultant immobilier à Fréjus spécialisé en gestion locative et transaction',
      areaServed: [
        'Fréjus',
        'Saint-Raphaël',
        'Roquebrune-sur-Argens',
        'Puget-sur-Argens',
        'Les Issambres',
        'Bagnols-en-Forêt',
        'Le Muy',
        'Saint-Aygulf',
      ],
      sameAs: [
        'https://www.linkedin.com/in/kevin-griel',
        // Add other social links here
      ],
    });

    return cleanup;
  }, []);

  const cities = [
    'Fréjus',
    'Saint-Raphaël',
    'Roquebrune-sur-Argens',
    'Puget-sur-Argens',
    'Les Issambres',
    'Bagnols-en-Forêt',
    'Le Muy',
    'Saint-Aygulf',
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-custom leading-tight mb-6">
              Louer ou vendre sans stress, avec un vrai suivi humain.
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Consultant immobilier à Fréjus, j'aide les propriétaires à gérer et valoriser leur bien, en toute sérénité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SafeLink
                to="/gestion-locative"
                className="px-8 py-4 bg-amber-custom text-white font-semibold rounded-md hover:bg-amber-700 transition-colors text-center"
              >
                Audit locatif gratuit
              </SafeLink>
              <SafeLink
                to="/vente"
                className="px-8 py-4 border-2 border-amber-custom text-amber-custom font-semibold rounded-md hover:bg-amber-50 transition-colors text-center"
              >
                Faire estimer mon bien
              </SafeLink>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-center px-4">
                [Photo de Kevin avec vue sur Fréjus]
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pourquoi moi */}
      <Section background="white">
        <h2 className="text-3xl font-bold text-slate-custom text-center mb-12">
          Pourquoi choisir Kevin Griel Immobilier ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Interlocuteur unique
            </h3>
            <p className="text-gray-700">
              Du premier contact à la signature, vous échangez avec moi directement. Pas d'intermédiaire, une relation de confiance.
            </p>
          </Card>
          <Card>
            <div className="text-4xl mb-4">🏖️</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Expertise locale
            </h3>
            <p className="text-gray-700">
              Basé à Fréjus, je connais parfaitement le marché de la région et ses spécificités.
            </p>
          </Card>
          <Card>
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Approche humaine
            </h3>
            <p className="text-gray-700">
              L'immobilier, ce sont avant tout des histoires de vie. Je prends le temps de comprendre vos besoins.
            </p>
          </Card>
        </div>
      </Section>

      {/* Location & Gestion - Prioritaire */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-custom mb-4">
              Louer sans stress. Gérer avec méthode.
            </h2>
            <p className="text-gray-700 mb-6">
              Vous avez un bien à louer, mais vous craignez les impayés, les démarches, la gestion au quotidien ? Je m'occupe de tout.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">✓</span>
                <span className="text-gray-700">Sélection rigoureuse des locataires</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">✓</span>
                <span className="text-gray-700">Mise en conformité et valorisation du bien</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">✓</span>
                <span className="text-gray-700">Garantie loyers impayés (GLI)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">✓</span>
                <span className="text-gray-700">Gestion administrative complète</span>
              </li>
            </ul>
            <SafeLink
              to="/gestion-locative"
              className="inline-block px-8 py-4 bg-amber-custom text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
            >
              Découvrir l'offre Gestion locative
            </SafeLink>
          </div>
          <div>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-center px-4">
                [Visuel mise en scène location]
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Transaction / Vente */}
      <Section background="white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-center px-4">
                [Visuel mise en scène vente]
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-slate-custom mb-4">
              Vendre au bon prix, sans précipitation.
            </h2>
            <p className="text-gray-700 mb-6">
              Votre projet de vente mérite une estimation précise et une stratégie adaptée à vos objectifs.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">✓</span>
                <span className="text-gray-700">Estimation fiable basée sur le marché local</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">✓</span>
                <span className="text-gray-700">Mise en valeur professionnelle du bien</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">✓</span>
                <span className="text-gray-700">Diffusion ciblée et négociation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">✓</span>
                <span className="text-gray-700">Accompagnement jusqu'à la signature notaire</span>
              </li>
            </ul>
            <SafeLink
              to="/vente"
              className="inline-block px-8 py-4 bg-amber-custom text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
            >
              Faire estimer mon bien
            </SafeLink>
          </div>
        </div>
      </Section>

      {/* Mon approche */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <h2 className="text-3xl font-bold text-slate-custom text-center mb-12">
          Mon approche en 3 étapes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-custom text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Écoute & Analyse
            </h3>
            <p className="text-gray-700">
              Je prends le temps de comprendre votre projet, vos contraintes et vos objectifs.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-custom text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Stratégie sur mesure
            </h3>
            <p className="text-gray-700">
              Je construis avec vous une stratégie adaptée : estimation, valorisation, calendrier.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-custom text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Suivi & Résultats
            </h3>
            <p className="text-gray-700">
              Je vous accompagne à chaque étape, avec transparence et réactivité, jusqu'au résultat.
            </p>
          </div>
        </div>
      </Section>

      {/* Avis clients */}
      <Section background="white">
        <h2 className="text-3xl font-bold text-slate-custom text-center mb-12">
          Ils me font confiance
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <div className="text-amber-custom text-2xl mb-4">★★★★★</div>
            <p className="text-gray-700 italic mb-4">
              "Kevin a su trouver un locataire sérieux pour mon appartement en moins de 3 semaines. Très pro et réactif !"
            </p>
            <p className="font-semibold text-slate-custom">— Sophie M., propriétaire à Fréjus</p>
          </Card>
          <Card>
            <div className="text-amber-custom text-2xl mb-4">★★★★★</div>
            <p className="text-gray-700 italic mb-4">
              "Grâce à Kevin, j'ai vendu ma villa au prix juste, sans stress. Un vrai accompagnement humain."
            </p>
            <p className="font-semibold text-slate-custom">— Marc L., vendeur à Saint-Raphaël</p>
          </Card>
          <Card>
            <div className="text-amber-custom text-2xl mb-4">★★★★★</div>
            <p className="text-gray-700 italic mb-4">
              "Enfin un interlocuteur unique qui répond présent. Je recommande les yeux fermés !"
            </p>
            <p className="font-semibold text-slate-custom">— Claire D., propriétaire à Puget</p>
          </Card>
        </div>
      </Section>

      {/* Zone d'intervention */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <h2 className="text-3xl font-bold text-slate-custom text-center mb-8">
          Zone d'intervention
        </h2>
        <div className="mb-8">
          <div className="aspect-[3/1] bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-center px-4">
              [Carte minimaliste de la zone Fréjus / Saint-Raphaël]
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {cities.map((city) => (
            <span
              key={city}
              className="px-4 py-2 bg-white text-slate-custom rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {city}
            </span>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-custom text-center mb-4">
            Parlons de votre projet
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Une question ? Un projet ? Je vous réponds dans les 24h.
          </p>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <a
              href="tel:+33612345678"
              className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <span className="text-2xl">📞</span>
              <div>
                <div className="font-semibold text-slate-custom">Téléphone</div>
                <div className="text-sm text-gray-600">06 12 34 56 78</div>
              </div>
            </a>
            <a
              href="https://wa.me/33612345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <span className="text-2xl">💬</span>
              <div>
                <div className="font-semibold text-slate-custom">WhatsApp</div>
                <div className="text-sm text-gray-600">Message rapide</div>
              </div>
            </a>
            <a
              href="https://calendly.com/kevin-griel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <span className="text-2xl">📅</span>
              <div>
                <div className="font-semibold text-slate-custom">Calendly</div>
                <div className="text-sm text-gray-600">Prendre RDV</div>
              </div>
            </a>
          </div>

          <ContactForm />
        </div>
      </Section>
    </div>
  );
};
