import React, { useEffect } from 'react';
import { Section } from '../components/Section';
import { setPageMeta } from '../utils/seo';

export const Confidentialite: React.FC = () => {
  useEffect(() => {
    setPageMeta({
      title: 'Politique de confidentialité | Kevin Griel Immobilier',
      description: 'Politique de confidentialité et gestion des cookies de Kevin Griel Immobilier.',
    });
  }, []);

  return (
    <div className="pt-20">
      <Section background="white">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-4xl font-bold text-slate-custom mb-8">
            Politique de confidentialité & Cookies
          </h1>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">
            Collecte et utilisation des données personnelles
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kevin Griel Immobilier collecte des données personnelles (nom, email, téléphone, message)
            uniquement via le formulaire de contact présent sur ce site.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ces données sont utilisées exclusivement pour répondre à vos demandes et ne sont jamais
            transmises à des tiers sans votre consentement explicite.
          </p>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">
            Vos droits (RGPD)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification en cas d'erreur</li>
            <li>Droit de suppression (droit à l'oubli)</li>
            <li>Droit d'opposition au traitement de vos données</li>
            <li>Droit à la portabilité de vos données</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Pour exercer ces droits, contactez-nous à l'adresse :{' '}
            <a href="mailto:contact@kevin-griel-immobilier.fr" className="text-amber-custom hover:underline">
              contact@kevin-griel-immobilier.fr
            </a>
          </p>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">
            Utilisation des cookies
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Ce site utilise des cookies pour améliorer votre expérience de navigation et mesurer l'audience.
          </p>

          <h3 className="text-xl font-semibold text-slate-custom mt-6 mb-3">
            Types de cookies utilisés
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
            <li>
              <strong>Cookies nécessaires</strong> : indispensables au fonctionnement du site
              (stockage de vos préférences de cookies)
            </li>
            <li>
              <strong>Cookies analytiques</strong> : mesure d'audience anonyme pour améliorer le site
              (Google Analytics ou équivalent, si activé)
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-custom mt-6 mb-3">
            Gestion des cookies
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Vous pouvez à tout moment accepter, refuser ou personnaliser vos préférences de cookies
            via le bandeau qui s'affiche lors de votre première visite.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Vous pouvez également gérer les cookies directement depuis les paramètres de votre navigateur.
          </p>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">
            Sécurité des données
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kevin Griel Immobilier met en œuvre toutes les mesures techniques et organisationnelles
            appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte ou divulgation.
          </p>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">
            Mise à jour de cette politique
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Cette politique de confidentialité peut être mise à jour. La date de dernière mise à jour
            sera indiquée en haut de cette page. Nous vous invitons à la consulter régulièrement.
          </p>

          <p className="text-gray-700 leading-relaxed mt-8">
            <em>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</em>
          </p>
        </div>
      </Section>
    </div>
  );
};
