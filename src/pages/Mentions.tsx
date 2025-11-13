import React, { useEffect } from 'react';
import { Section } from '../components/Section';
import { setPageMeta } from '../utils/seo';

export const Mentions: React.FC = () => {
  useEffect(() => {
    setPageMeta({
      title: 'Mentions légales | Kevin Griel Immobilier',
      description: 'Mentions légales du site Kevin Griel Immobilier.',
    });
  }, []);

  return (
    <div className="pt-20">
      <Section background="white">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-4xl font-bold text-slate-custom mb-8">Mentions légales</h1>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">Éditeur du site</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Kevin Griel Immobilier</strong><br />
            Consultant immobilier indépendant<br />
            Basé à Fréjus, France<br />
            Email : contact@kevin-griel-immobilier.fr<br />
            Téléphone : 06 12 34 56 78
          </p>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">Hébergement</h2>
          <p className="text-gray-700 leading-relaxed">
            [Nom de l'hébergeur]<br />
            [Adresse de l'hébergeur]<br />
            [Coordonnées de l'hébergeur]
          </p>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">Propriété intellectuelle</h2>
          <p className="text-gray-700 leading-relaxed">
            L'ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété
            exclusive de Kevin Griel Immobilier, sauf mention contraire. Toute reproduction,
            distribution ou utilisation sans autorisation préalable est interdite.
          </p>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">Responsabilité</h2>
          <p className="text-gray-700 leading-relaxed">
            Kevin Griel Immobilier s'efforce de fournir des informations exactes et à jour.
            Toutefois, des erreurs ou omissions peuvent survenir. L'éditeur ne saurait être tenu
            responsable des dommages directs ou indirects résultant de l'utilisation de ce site.
          </p>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">Données personnelles</h2>
          <p className="text-gray-700 leading-relaxed">
            Les informations collectées via le formulaire de contact sont destinées exclusivement
            à Kevin Griel Immobilier et ne sont en aucun cas transmises à des tiers.
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression
            de vos données personnelles. Pour exercer ce droit, contactez-nous à l'adresse
            contact@kevin-griel-immobilier.fr.
          </p>

          <h2 className="text-2xl font-semibold text-slate-custom mt-8 mb-4">Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            Ce site utilise des cookies pour améliorer l'expérience utilisateur et mesurer l'audience.
            Pour plus d'informations, consultez notre{' '}
            <a href="#/confidentialite" className="text-amber-custom hover:underline">
              Politique de confidentialité
            </a>.
          </p>
        </div>
      </Section>
    </div>
  );
};
