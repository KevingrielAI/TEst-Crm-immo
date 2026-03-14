'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property } from './types';
import { getProperties, deleteProperty, getLeadsByProperty } from './lib/storage';
import {
  Plus, Home, Eye, Users, Trash2, ExternalLink,
  TrendingUp, Share2, Copy, CheckCircle, BarChart3,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [leadCounts, setLeadCounts] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const props = getProperties();
    setProperties(props);
    const counts: Record<string, number> = {};
    props.forEach(p => {
      counts[p.id] = getLeadsByProperty(p.id).length;
    });
    setLeadCounts(counts);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce bien ? Cette action est irréversible.')) {
      deleteProperty(id);
      setProperties(getProperties());
    }
  };

  const copyLink = (slug: string, id: string) => {
    const url = `${window.location.origin}/bien/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalViews = properties.reduce((acc, p) => acc + (p.viewCount || 0), 0);
  const totalLeads = Object.values(leadCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-gray-900 text-lg">ImmoPrestige</span>
                <span className="ml-2 text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">Pro</span>
              </div>
            </div>
            <Link
              href="/creer"
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg text-sm"
            >
              <Plus className="w-4 h-4" />
              Nouveau bien
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Biens publiés</p>
                <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Vues totales</p>
                <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Prospects capturés</p>
                <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Properties List */}
        {properties.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-4">
              <Home className="w-10 h-10 text-violet-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Aucun bien créé</h2>
            <p className="text-gray-500 mb-6">Créez votre premier mini-site de présentation</p>
            <Link
              href="/creer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all shadow-md"
            >
              <Plus className="w-5 h-5" />
              Créer mon premier bien
            </Link>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { icon: <Zap className="w-6 h-6 text-amber-500" />, title: "Capture de prospects", desc: "Formulaires, popups et CTAs optimisés pour convertir les visiteurs en prospects." },
                { icon: <TrendingUp className="w-6 h-6 text-green-500" />, title: "Techniques marketing", desc: "FOMO, urgence, preuve sociale, offres limitées — tout pour maximiser les contacts." },
                { icon: <Share2 className="w-6 h-6 text-violet-500" />, title: "Partage facile", desc: "Partagez votre mini-site par WhatsApp, email ou réseaux sociaux en 1 clic." },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Vos mini-sites ({properties.length})</h2>
            {properties.map(property => (
              <div key={property.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                <div className="flex items-stretch gap-0">
                  <div className="w-36 flex-shrink-0 relative overflow-hidden">
                    {property.photos[0] ? (
                      <img src={property.photos[0]} alt={property.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full min-h-[112px] bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
                        <Home className="w-8 h-8 text-violet-400" />
                      </div>
                    )}
                    {property.isExclusive && (
                      <span className="absolute top-2 left-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                        EXCLU
                      </span>
                    )}
                  </div>

                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{property.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{property.address}, {property.city}</p>
                        <p className="text-lg font-bold text-violet-600 mt-1">
                          {property.price.toLocaleString('fr-FR')} €
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-gray-500 justify-end">
                          <Eye className="w-3 h-3" /> {property.viewCount || 0} vues
                        </div>
                        <div className="flex items-center gap-1 text-xs text-violet-600 justify-end mt-0.5">
                          <Users className="w-3 h-3" /> {leadCounts[property.id] || 0} prospects
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <Link
                        href={`/bien/${property.slug}`}
                        target="_blank"
                        className="flex items-center gap-1.5 text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> Voir le site
                      </Link>
                      <button
                        onClick={() => copyLink(property.slug, property.id)}
                        className="flex items-center gap-1.5 text-xs bg-violet-50 hover:bg-violet-100 text-violet-700 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {copiedId === property.id ? (
                          <><CheckCircle className="w-3 h-3 text-green-500" /> Copié!</>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copier le lien</>
                        )}
                      </button>
                      <Link
                        href={`/creer?edit=${property.id}`}
                        className="flex items-center gap-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Modifier
                      </Link>
                      <Link
                        href={`/prospects/${property.id}`}
                        className="flex items-center gap-1.5 text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <BarChart3 className="w-3 h-3" /> Prospects
                      </Link>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="ml-auto flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
