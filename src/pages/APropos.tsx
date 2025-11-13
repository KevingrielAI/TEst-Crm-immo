import React, { useEffect } from 'react';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { setPageMeta } from '../utils/seo';

export const APropos: React.FC = () => {
  useEffect(() => {
    setPageMeta({
      title: 'À propos | Kevin Griel - Consultant immobilier Fréjus',
      description: 'Découvrez Kevin Griel, consultant immobilier indépendant à Fréjus. Transparence, expertise locale et accompagnement humain pour vos projets immobiliers.',
      keywords: 'Kevin Griel, consultant immobilier, Fréjus, à propos',
    });
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-custom mb-6">
                Je m'appelle Kevin Griel.
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Je rends les projets immobiliers simples, transparents et humains.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Basé à Fréjus, je suis consultant immobilier indépendant spécialisé en
                <strong> gestion locative</strong> et <strong>transaction</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Mon objectif : accompagner les propriétaires avec méthode, transparence et disponibilité,
                pour que chaque projet se déroule sereinement, du début à la fin.
              </p>
            </div>
            <div>
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-center px-4">
                  [Portrait professionnel de Kevin]
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Mes valeurs */}
      <Section background="white">
        <h2 className="text-3xl font-bold text-slate-custom text-center mb-12">
          Mes valeurs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Transparence
            </h3>
            <p className="text-gray-700">
              Pas de jargon, pas de surprise. Je vous explique tout clairement : prix, démarches, délais.
              Vous savez toujours où vous en êtes.
            </p>
          </Card>
          <Card className="text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Expertise
            </h3>
            <p className="text-gray-700">
              Connaissance approfondie du marché local, veille juridique permanente, formation continue.
              Votre projet mérite un vrai professionnel.
            </p>
          </Card>
          <Card className="text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold text-slate-custom mb-3">
              Disponibilité
            </h3>
            <p className="text-gray-700">
              Vous avez une question ? Besoin d'un conseil ? Je suis joignable et réactif.
              Votre interlocuteur, c'est moi, et seulement moi.
            </p>
          </Card>
        </div>
      </Section>

      {/* Parcours */}
      <Section className="bg-gradient-to-br from-amber-50 to-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-custom text-center mb-8">
            Mon parcours
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <p className="text-gray-700 leading-relaxed mb-4">
              Après plusieurs années dans le secteur immobilier, j'ai décidé de créer
              <strong> Kevin Griel Immobilier</strong> pour offrir un service sur mesure,
              centré sur l'humain et la proximité.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mon approche repose sur trois piliers :
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">•</span>
                <span className="text-gray-700">
                  <strong>Écoute</strong> : je prends le temps de comprendre vos besoins et contraintes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">•</span>
                <span className="text-gray-700">
                  <strong>Méthode</strong> : un process clair, des étapes structurées, des résultats mesurables
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-custom text-xl">•</span>
                <span className="text-gray-700">
                  <strong>Suivi</strong> : un accompagnement continu jusqu'à l'aboutissement de votre projet
                </span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Aujourd'hui, je suis fier d'accompagner des propriétaires bailleurs et vendeurs sur
              <strong> Fréjus, Saint-Raphaël et tout le Var Est</strong>, avec un seul objectif :
              faire de votre projet immobilier une réussite.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-custom mb-4">
            Discutons de votre projet
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Que vous souhaitiez louer, vendre ou simplement obtenir un conseil,
            je suis à votre écoute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-amber-custom text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
            >
              Me contacter
            </a>
            <a
              href="tel:+33612345678"
              className="px-8 py-4 border-2 border-amber-custom text-amber-custom font-semibold rounded-md hover:bg-amber-50 transition-colors"
            >
              06 12 34 56 78
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};
