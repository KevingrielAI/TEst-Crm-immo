'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Property, Lead } from '../../types';
import { getPropertyBySlug, saveLead, incrementViewCount } from '../../lib/storage';
import { v4 as uuidv4 } from 'uuid';
import {
  Phone, Mail, MapPin, Home, Maximize2, BedDouble,
  Star, CheckCircle, Clock, Users, Eye, Share2,
  ChevronLeft, ChevronRight, X, MessageCircle,
  Heart, Award, TrendingDown, Zap, Bell
} from 'lucide-react';

function Countdown({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) return;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <div className="flex items-center gap-2">
      {[
        { v: timeLeft.h, label: 'h' },
        { v: timeLeft.m, label: 'min' },
        { v: timeLeft.s, label: 'sec' },
      ].map(({ v, label }) => (
        <div key={label} className="text-center">
          <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold tabular-nums">
            {String(v).padStart(2, '0')}
          </div>
          <div className="text-xs text-red-200 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

function LeadForm({ property, source, onClose }: {
  property: Property;
  source: string;
  onClose?: () => void;
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    setTimeout(() => {
      const lead: Lead = {
        id: uuidv4(),
        propertyId: property.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        source,
        createdAt: new Date().toISOString(),
      };
      saveLead(lead);
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Message envoyé !</h3>
        <p className="text-gray-600 text-sm">
          {property.agentName} vous contactera très prochainement.
        </p>
        {onClose && (
          <button onClick={onClose} className="mt-4 text-sm text-gray-400 underline">
            Fermer
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        required
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        placeholder="Votre prénom et nom *"
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <input
        type="tel"
        required
        value={form.phone}
        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        placeholder="Votre téléphone *"
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <input
        type="email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        placeholder="Votre email"
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <textarea
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        placeholder="Votre message (disponibilités, questions...)"
        rows={3}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-violet-200"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <><Zap className="w-4 h-4" /> Être contacté rapidement</>
        )}
      </button>
      <p className="text-xs text-gray-400 text-center">
        Réponse garantie sous 2h par {property.agentName}
      </p>
    </form>
  );
}

function ExitIntentPopup({ property, onClose }: { property: Property; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-700 px-6 py-5 relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-6 h-6 text-amber-300" />
            <span className="text-amber-300 font-bold text-sm uppercase tracking-wide">Attendez !</span>
          </div>
          <h3 className="text-xl font-bold text-white">Ce bien vous intéresse ?</h3>
          <p className="text-violet-200 text-sm mt-1">
            Recevez plus d&apos;infos et organisez une visite gratuitement
          </p>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-4">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="text-sm font-semibold text-amber-900">Offre exclusive</p>
              <p className="text-xs text-amber-700">Estimation gratuite de votre bien actuel</p>
            </div>
          </div>
          <LeadForm property={property} source="exit_intent" onClose={onClose} />
        </div>
      </div>
    </div>
  );
}

function SocialProof({ viewCount }: { viewCount: number }) {
  const [visitors, setVisitors] = useState(Math.floor(Math.random() * 8) + 3);

  useEffect(() => {
    const t = setInterval(() => {
      setVisitors(v => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(2, Math.min(15, v + delta));
      });
    }, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-xl border border-green-100">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="font-medium">{visitors} personnes</span>
        <span className="text-green-600">consultent ce bien</span>
      </div>
      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl border border-blue-100">
        <Eye className="w-4 h-4" />
        <span className="font-medium">{viewCount + 1} vues</span>
      </div>
    </div>
  );
}

export default function PropertyMiniSite() {
  const params = useParams();
  const slug = params.slug as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitShown, setExitShown] = useState(false);
  const [liked, setLiked] = useState(false);
  const [shareMsg, setShareMsg] = useState('');

  useEffect(() => {
    if (!slug) return;
    const prop = getPropertyBySlug(slug);
    if (prop) {
      setProperty(prop);
      incrementViewCount(prop.id);
    }
  }, [slug]);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !exitShown) {
      setShowExitPopup(true);
      setExitShown(true);
    }
  }, [exitShown]);

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: property?.title, url });
    } else {
      navigator.clipboard.writeText(url);
      setShareMsg('Lien copié !');
      setTimeout(() => setShareMsg(''), 2000);
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">Bien introuvable</p>
        </div>
      </div>
    );
  }

  const pricePerSqm = property.surface ? Math.round(property.price / property.surface) : null;
  const discount = property.originalPrice
    ? Math.round(((property.originalPrice - property.price) / property.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Exit intent popup */}
      {showExitPopup && (
        <ExitIntentPopup property={property} onClose={() => setShowExitPopup(false)} />
      )}

      {/* Top urgency bar */}
      {property.expiresAt && new Date(property.expiresAt) > new Date() && (
        <div className="bg-red-600 text-white py-3 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-200" />
              <span className="text-sm font-medium">Offre valable encore :</span>
            </div>
            <Countdown expiresAt={property.expiresAt} />
          </div>
        </div>
      )}

      {/* Notification bar */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-2 px-4 text-center text-xs font-medium">
        <span className="opacity-90">🔒 Site sécurisé · Réponse garantie sous 2h · 0% de frais d&apos;agence cachés</span>
      </div>

      {/* Hero section */}
      <div className="relative">
        {/* Photo gallery */}
        <div className="relative aspect-[16/9] max-h-[70vh] overflow-hidden bg-gray-900">
          {property.photos.length > 0 ? (
            <>
              <img
                src={property.photos[activePhoto]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Photo navigation */}
              {property.photos.length > 1 && (
                <>
                  <button
                    onClick={() => setActivePhoto(p => (p - 1 + property.photos.length) % property.photos.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>
                  <button
                    onClick={() => setActivePhoto(p => (p + 1) % property.photos.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                  </button>
                  <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
                    {property.photos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhoto(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === activePhoto ? 'bg-white w-6' : 'bg-white/60'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-900 to-indigo-900 flex items-center justify-center">
              <Home className="w-24 h-24 text-white/20" />
            </div>
          )}

          {/* Overlay info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {property.isExclusive && (
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" /> EXCLUSIVITÉ
                </span>
              )}
              {property.reducedPrice && (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> PRIX BAISSÉ {discount && `- ${discount}%`}
                </span>
              )}
              {property.highlights.slice(0, 2).map(h => (
                <span key={h} className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30">
                  {h}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              {property.title}
            </h1>
            <p className="text-white/80 flex items-center gap-1 mt-1 text-sm">
              <MapPin className="w-4 h-4" /> {property.address}, {property.city}
            </p>
          </div>

          {/* Top actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setLiked(l => !l)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'}`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg text-gray-700 transition-all relative"
            >
              <Share2 className="w-5 h-5" />
              {shareMsg && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded whitespace-nowrap">
                  {shareMsg}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Thumbnail strip */}
        {property.photos.length > 1 && (
          <div className="flex gap-2 p-4 bg-gray-900 overflow-x-auto">
            {property.photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activePhoto ? 'border-violet-500' : 'border-transparent opacity-60 hover:opacity-80'}`}
              >
                <img src={photo} alt={`Vue ${i+1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Price + stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  {property.reducedPrice && property.originalPrice && (
                    <p className="text-gray-400 line-through text-sm mb-1">
                      {property.originalPrice.toLocaleString('fr-FR')} €
                    </p>
                  )}
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-gray-900">
                      {property.price.toLocaleString('fr-FR')} €
                    </span>
                    {property.priceNote && (
                      <span className="text-gray-500 text-sm">{property.priceNote}</span>
                    )}
                  </div>
                  {pricePerSqm && (
                    <p className="text-gray-500 text-sm mt-1">{pricePerSqm.toLocaleString('fr-FR')} €/m²</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {property.surface > 0 && (
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-2 rounded-xl text-sm">
                      <Maximize2 className="w-4 h-4 text-violet-500" />
                      <span className="font-semibold">{property.surface} m²</span>
                    </div>
                  )}
                  {property.rooms > 0 && (
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-2 rounded-xl text-sm">
                      <Home className="w-4 h-4 text-violet-500" />
                      <span className="font-semibold">{property.rooms} pièces</span>
                    </div>
                  )}
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-2 rounded-xl text-sm">
                      <BedDouble className="w-4 h-4 text-violet-500" />
                      <span className="font-semibold">{property.bedrooms} ch.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Social proof */}
              <div className="mt-4">
                <SocialProof viewCount={property.viewCount} />
              </div>
            </div>

            {/* Highlights */}
            {property.highlights.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  Points forts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {property.highlights.map(h => (
                    <div key={h} className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-xl p-4 text-center">
                      <CheckCircle className="w-6 h-6 text-violet-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-violet-900">{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.description}</p>
              </div>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Caractéristiques</h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.map(f => (
                    <span key={f} className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-xl text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" /> {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trust section */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Pourquoi nous faire confiance ?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: '🏆', title: '500+ ventes', desc: 'Réalisées en Île-de-France' },
                  { icon: '⭐', title: '4.9/5', desc: 'Avis clients vérifiés' },
                  { icon: '⚡', title: '48h', desc: 'Délai moyen de vente' },
                ].map((t, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl mb-2">{t.icon}</div>
                    <p className="font-bold text-white">{t.title}</p>
                    <p className="text-gray-400 text-xs">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inline contact form (mobile) */}
            <div className="lg:hidden bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-violet-600" />
                Contacter l&apos;agent
              </h3>
              <LeadForm property={property} source="inline_mobile" />
            </div>

          </div>

          {/* Right column — sticky sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-4 space-y-4">

              {/* Agent card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  {property.agentPhoto ? (
                    <img
                      src={property.agentPhoto}
                      alt={property.agentName}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                      {property.agentName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-900">{property.agentName}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">4.9</span>
                    </div>
                    <p className="text-xs text-green-600 mt-0.5 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Disponible maintenant
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <a
                    href={`tel:${property.agentPhone}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors shadow-md shadow-green-100"
                  >
                    <Phone className="w-4 h-4" />
                    {property.agentPhone}
                  </a>
                  <a
                    href={`https://wa.me/${property.agentPhone.replace(/\s/g, '')}?text=Bonjour, je suis intéressé(e) par le bien : ${property.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1eb855] text-white rounded-xl font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  {property.agentEmail && (
                    <a
                      href={`mailto:${property.agentEmail}?subject=Demande d'info - ${property.title}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  )}
                </div>
              </div>

              {/* Lead form */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-1">Planifier une visite</h3>
                <p className="text-xs text-gray-500 mb-4">Réponse garantie sous 2h</p>
                <LeadForm property={property} source="sidebar" />
              </div>

              {/* Urgency widget */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-orange-600" />
                  <p className="text-sm font-semibold text-orange-900">Ce bien suscite de l&apos;intérêt !</p>
                </div>
                <p className="text-xs text-orange-700">
                  Plusieurs personnes ont demandé une visite cette semaine. Ne laissez pas passer cette opportunité.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden shadow-xl z-40">
        <div className="flex gap-3 max-w-lg mx-auto">
          <a
            href={`tel:${property.agentPhone}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold text-sm"
          >
            <Phone className="w-4 h-4" /> Appeler
          </a>
          <a
            href={`https://wa.me/${property.agentPhone.replace(/\s/g, '')}?text=Bonjour, je suis intéressé(e) par le bien : ${property.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-xl font-bold text-sm"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <button
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-violet-600 text-white rounded-xl font-bold text-sm"
          >
            <Mail className="w-4 h-4" /> Contacter
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-xs mt-20">
        <p>Mini-site créé avec <span className="text-violet-400 font-medium">ImmoPrestige</span></p>
        <p className="mt-1">© {new Date().getFullYear()} — Tous droits réservés</p>
      </footer>
    </div>
  );
}
