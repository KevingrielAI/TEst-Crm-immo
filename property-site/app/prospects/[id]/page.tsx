'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Lead, Property } from '../../types';
import { getLeadsByProperty, getProperties } from '../../lib/storage';
import {
  ArrowLeft, Users, Phone, Mail, MessageCircle,
  Clock, ExternalLink, Download, Filter
} from 'lucide-react';

const SOURCE_LABELS: Record<string, { label: string; color: string }> = {
  sidebar: { label: 'Formulaire sidebar', color: 'bg-violet-100 text-violet-700' },
  inline_mobile: { label: 'Formulaire mobile', color: 'bg-blue-100 text-blue-700' },
  exit_intent: { label: 'Popup de sortie', color: 'bg-orange-100 text-orange-700' },
  contact_form: { label: 'Formulaire contact', color: 'bg-green-100 text-green-700' },
  popup: { label: 'Popup', color: 'bg-pink-100 text-pink-700' },
};

export default function ProspectsPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const [leads, setLeads] = useState<Lead[]>([]);
  const [property, setProperty] = useState<Property | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const props = getProperties();
    const prop = props.find(p => p.id === propertyId);
    setProperty(prop || null);
    setLeads(getLeadsByProperty(propertyId));
  }, [propertyId]);

  const filtered = filter === 'all' ? leads : leads.filter(l => l.source === filter);

  const exportCsv = () => {
    const header = 'Nom,Téléphone,Email,Message,Source,Date\n';
    const rows = leads.map(l =>
      `"${l.name}","${l.phone}","${l.email}","${l.message || ''}","${SOURCE_LABELS[l.source]?.label || l.source}","${new Date(l.createdAt).toLocaleString('fr-FR')}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prospects-${property?.title || propertyId}.csv`;
    a.click();
  };

  const sources = [...new Set(leads.map(l => l.source))];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Tableau de bord</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">
              {property?.title && <span className="font-medium text-gray-700">{property.title}</span>}
            </span>
            {leads.length > 0 && (
              <button
                onClick={exportCsv}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-7 h-7 text-violet-600" />
              Prospects ({leads.length})
            </h1>
            {property && (
              <p className="text-gray-500 text-sm mt-1">
                {property.title} · {property.city}
              </p>
            )}
          </div>
          {property && (
            <Link
              href={`/bien/${property.slug}`}
              target="_blank"
              className="flex items-center gap-2 text-sm bg-violet-50 hover:bg-violet-100 text-violet-700 px-4 py-2 rounded-xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Voir le mini-site
            </Link>
          )}
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total', value: leads.length, color: 'bg-violet-50 text-violet-700' },
            { label: 'Sidebar', value: leads.filter(l => l.source === 'sidebar').length, color: 'bg-blue-50 text-blue-700' },
            { label: 'Popup sortie', value: leads.filter(l => l.source === 'exit_intent').length, color: 'bg-orange-50 text-orange-700' },
            { label: 'Mobile', value: leads.filter(l => l.source === 'inline_mobile').length, color: 'bg-green-50 text-green-700' },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl p-4 ${s.color}`}>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm opacity-80">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        {sources.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
            >
              <Filter className="w-3 h-3 inline mr-1" /> Tous
            </button>
            {sources.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
              >
                {SOURCE_LABELS[s]?.label || s}
              </button>
            ))}
          </div>
        )}

        {/* Leads list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Aucun prospect pour le moment</p>
            <p className="text-gray-400 text-sm mt-1">Partagez le lien du mini-site pour attirer des contacts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(lead => (
              <div key={lead.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${SOURCE_LABELS[lead.source]?.color || 'bg-gray-100 text-gray-600'}`}>
                          {SOURCE_LABELS[lead.source]?.label || lead.source}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 transition-colors">
                            <Phone className="w-3.5 h-3.5" /> {lead.phone}
                          </a>
                        )}
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors truncate">
                            <Mail className="w-3.5 h-3.5" /> {lead.email}
                          </a>
                        )}
                      </div>
                      {lead.message && (
                        <p className="text-sm text-gray-500 mt-2 bg-gray-50 rounded-lg px-3 py-2 italic">
                          &quot;{lead.message}&quot;
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(lead.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${lead.phone}`}
                        className="w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 flex items-center justify-center text-green-600 transition-colors"
                        title="Appeler"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/\s/g, '')}?text=Bonjour ${lead.name}, suite à votre demande concernant le bien...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 flex items-center justify-center text-[#25D366] transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors"
                          title="Email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
