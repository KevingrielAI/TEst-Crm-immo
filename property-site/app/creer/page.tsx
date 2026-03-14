'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Property } from '../types';
import { saveProperty, getProperties } from '../lib/storage';
import {
  Home, ArrowLeft, Upload, X, Plus, Check,
  Camera, User, Phone, Mail, MapPin, Euro,
  LayoutDashboard, Star, Flame, Tag
} from 'lucide-react';
import Link from 'next/link';

const DEFAULT_FEATURES = [
  'Parking', 'Cave', 'Terrasse', 'Balcon', 'Jardin', 'Piscine',
  'Gardien', 'Digicode', 'Interphone', 'Ascenseur', 'Parquet',
  'Double vitrage', 'Cuisine équipée', 'Dressing', 'Lumineux',
  'Vue dégagée', 'Calme', 'Bien exposé'
];

const DEFAULT_HIGHLIGHTS = [
  'Emplacement exceptionnel', 'Prix en baisse', 'Coup de cœur',
  'Rare sur le marché', 'Investissement idéal', 'Forte rentabilité',
  'Quartier prisé', 'Transport à pied', 'École à proximité'
];

function CreerPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const agentPhotoRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [loading, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    priceNote: '',
    address: '',
    city: '',
    surface: '',
    rooms: '',
    bedrooms: '',
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    isExclusive: false,
    reducedPrice: false,
    originalPrice: '',
    expiresAt: '',
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [agentPhoto, setAgentPhoto] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState('');

  useEffect(() => {
    if (editId) {
      const props = getProperties();
      const existing = props.find(p => p.id === editId);
      if (existing) {
        setForm({
          title: existing.title,
          description: existing.description,
          price: String(existing.price),
          priceNote: existing.priceNote || '',
          address: existing.address,
          city: existing.city,
          surface: String(existing.surface),
          rooms: String(existing.rooms),
          bedrooms: String(existing.bedrooms),
          agentName: existing.agentName,
          agentPhone: existing.agentPhone,
          agentEmail: existing.agentEmail,
          isExclusive: existing.isExclusive || false,
          reducedPrice: existing.reducedPrice || false,
          originalPrice: String(existing.originalPrice || ''),
          expiresAt: existing.expiresAt || '',
        });
        setPhotos(existing.photos);
        setAgentPhoto(existing.agentPhoto || '');
        setSelectedFeatures(existing.features);
        setSelectedHighlights(existing.highlights);
      }
    }
  }, [editId]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (photos.length >= 3) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result as string].slice(0, 3));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAgentPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAgentPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const toggleFeature = (f: string) => {
    setSelectedFeatures(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );
  };

  const toggleHighlight = (h: string) => {
    setSelectedHighlights(prev =>
      prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h]
    );
  };

  const addCustomFeature = () => {
    if (customFeature.trim() && !selectedFeatures.includes(customFeature.trim())) {
      setSelectedFeatures(prev => [...prev, customFeature.trim()]);
      setCustomFeature('');
    }
  };

  const generateSlug = (title: string, city: string) => {
    const base = `${title}-${city}`.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 60);
    return `${base}-${Date.now().toString(36)}`;
  };

  const handleSubmit = () => {
    setSaving(true);
    const property: Property = {
      id: editId || uuidv4(),
      slug: editId
        ? getProperties().find(p => p.id === editId)?.slug || generateSlug(form.title, form.city)
        : generateSlug(form.title, form.city),
      title: form.title,
      description: form.description,
      price: Number(form.price),
      priceNote: form.priceNote,
      address: form.address,
      city: form.city,
      surface: Number(form.surface),
      rooms: Number(form.rooms),
      bedrooms: Number(form.bedrooms),
      photos,
      features: selectedFeatures,
      agentName: form.agentName,
      agentPhone: form.agentPhone,
      agentEmail: form.agentEmail,
      agentPhoto,
      viewCount: editId ? (getProperties().find(p => p.id === editId)?.viewCount || 0) : 0,
      createdAt: editId
        ? (getProperties().find(p => p.id === editId)?.createdAt || new Date().toISOString())
        : new Date().toISOString(),
      expiresAt: form.expiresAt || undefined,
      highlights: selectedHighlights,
      isExclusive: form.isExclusive,
      reducedPrice: form.reducedPrice,
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
    };
    saveProperty(property);
    setSaving(false);
    router.push('/');
  };

  const canGoNext = () => {
    if (step === 1) return form.title && form.price && form.city && form.address;
    if (step === 2) return photos.length >= 1;
    if (step === 3) return form.agentName && form.agentPhone;
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Tableau de bord</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">ImmoPrestige</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {editId ? 'Modifier le bien' : 'Créer un mini-site'}
          </h1>
          <div className="flex items-center gap-2">
            {[
              { n: 1, label: 'Détails' },
              { n: 2, label: 'Photos' },
              { n: 3, label: 'Agent' },
              { n: 4, label: 'Marketing' },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => n < step && setStep(n)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step === n
                      ? 'bg-violet-600 text-white shadow-md'
                      : step > n
                      ? 'bg-green-500 text-white cursor-pointer'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > n ? <Check className="w-4 h-4" /> : n}
                </button>
                <span className={`text-xs font-medium hidden sm:block ${step === n ? 'text-violet-600' : 'text-gray-400'}`}>
                  {label}
                </span>
                {n < 4 && <div className={`flex-1 h-1 rounded-full ${step > n ? 'bg-green-400' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Step 1: Property Details */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-violet-600" />
                Informations du bien
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre accrocheur *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Ex: Appartement 3P lumineux avec terrasse vue mer"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description marketing *</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Décrivez ce bien en mettant en avant ses atouts. Utilisez des mots émotionnels : lumineux, vue imprenable, rare, coup de cœur..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Euro className="w-3 h-3" /> Prix *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="350000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note sur le prix</label>
                  <input
                    type="text"
                    value={form.priceNote}
                    onChange={e => setForm(f => ({ ...f, priceNote: e.target.value }))}
                    placeholder="HAI / Hors honoraires"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Adresse *
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    placeholder="12 Rue de la Paix"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    placeholder="Paris 8ème"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Surface (m²)</label>
                  <input
                    type="number"
                    value={form.surface}
                    onChange={e => setForm(f => ({ ...f, surface: e.target.value }))}
                    placeholder="75"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pièces</label>
                  <input
                    type="number"
                    value={form.rooms}
                    onChange={e => setForm(f => ({ ...f, rooms: e.target.value }))}
                    placeholder="3"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chambres</label>
                  <input
                    type="number"
                    value={form.bedrooms}
                    onChange={e => setForm(f => ({ ...f, bedrooms: e.target.value }))}
                    placeholder="2"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Photos */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-violet-600" />
                Photos du bien (3 max)
              </h2>
              <p className="text-sm text-gray-500">Les photos sont le premier impact. Choisissez les meilleures !</p>

              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl border-2 border-dashed border-gray-200 overflow-hidden relative group"
                  >
                    {photos[i] ? (
                      <>
                        <img src={photos[i]} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))}
                            className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        {i === 0 && (
                          <span className="absolute top-2 left-2 bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                            Photo principale
                          </span>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-violet-500 hover:border-violet-300 transition-colors"
                        disabled={photos.length <= i ? false : true}
                      >
                        <Upload className="w-8 h-8" />
                        <span className="text-xs">Photo {i + 1}{i === 0 ? ' *' : ''}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />

              {photos.length < 3 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-2 border-dashed border-violet-300 rounded-xl text-violet-600 font-medium text-sm hover:bg-violet-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Ajouter des photos ({photos.length}/3)
                </button>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800 font-medium">💡 Conseils photo</p>
                <ul className="text-xs text-amber-700 mt-1 space-y-1">
                  <li>• Photo 1 : Vue d'ensemble du bien (pièce principale ou façade)</li>
                  <li>• Photo 2 : Cuisine ou salle de bain rénovée</li>
                  <li>• Photo 3 : Vue, terrasse ou jardin si disponible</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Agent */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-violet-600" />
                Coordonnées de l&apos;agent
              </h2>

              <div className="flex items-center gap-6">
                <div
                  className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 relative cursor-pointer group"
                  onClick={() => agentPhotoRef.current?.click()}
                >
                  {agentPhoto ? (
                    <img src={agentPhoto} alt="Agent" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-1">
                      <User className="w-8 h-8" />
                      <span className="text-xs">Photo</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <input ref={agentPhotoRef} type="file" accept="image/*" onChange={handleAgentPhoto} className="hidden" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Photo de l&apos;agent (optionnel)</p>
                  <p className="text-xs text-gray-400 mt-1">Augmente la confiance des prospects de 40%</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <User className="w-3 h-3" /> Nom de l&apos;agent *
                </label>
                <input
                  type="text"
                  value={form.agentName}
                  onChange={e => setForm(f => ({ ...f, agentName: e.target.value }))}
                  placeholder="Marie Dupont"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={form.agentPhone}
                    onChange={e => setForm(f => ({ ...f, agentPhone: e.target.value }))}
                    placeholder="06 12 34 56 78"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </label>
                  <input
                    type="email"
                    value={form.agentEmail}
                    onChange={e => setForm(f => ({ ...f, agentEmail: e.target.value }))}
                    placeholder="marie@agence.fr"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Marketing */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                Options marketing
              </h2>

              {/* Badges */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Badges d&apos;urgence</label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isExclusive}
                      onChange={e => setForm(f => ({ ...f, isExclusive: e.target.checked }))}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
                      ⭐ Exclusivité
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.reducedPrice}
                      onChange={e => setForm(f => ({ ...f, reducedPrice: e.target.checked }))}
                      className="w-4 h-4 accent-red-500"
                    />
                    <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                      🔥 Prix baissé
                    </span>
                  </label>
                </div>
                {form.reducedPrice && (
                  <div className="mt-3">
                    <label className="block text-xs text-gray-500 mb-1">Prix original (pour afficher la réduction)</label>
                    <input
                      type="number"
                      value={form.originalPrice}
                      onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))}
                      placeholder="380000"
                      className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                )}
              </div>

              {/* Countdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compte à rebours d&apos;offre (optionnel)
                </label>
                <p className="text-xs text-gray-400 mb-2">Crée un sentiment d&apos;urgence chez le prospect</p>
                <input
                  type="datetime-local"
                  value={form.expiresAt}
                  onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" /> Points forts (max 3)
                </label>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_HIGHLIGHTS.map(h => (
                    <button
                      key={h}
                      onClick={() => toggleHighlight(h)}
                      disabled={!selectedHighlights.includes(h) && selectedHighlights.length >= 3}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        selectedHighlights.includes(h)
                          ? 'bg-violet-600 text-white border-violet-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 disabled:opacity-40'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
                  <Tag className="w-4 h-4 text-blue-500" /> Caractéristiques du bien
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {DEFAULT_FEATURES.map(f => (
                    <button
                      key={f}
                      onClick={() => toggleFeature(f)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        selectedFeatures.includes(f)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customFeature}
                    onChange={e => setCustomFeature(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCustomFeature()}
                    placeholder="Ajouter une caractéristique..."
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button
                    onClick={addCustomFeature}
                    className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white hover:bg-violet-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Précédent
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canGoNext()}
                className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Check className="w-5 h-5" /> {editId ? 'Sauvegarder' : 'Créer le mini-site'}</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <CreerPageContent />
    </Suspense>
  );
}
