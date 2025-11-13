# Kevin Griel Immobilier

Site web professionnel pour Kevin Griel, consultant immobilier basé à Fréjus, spécialisé en gestion locative et transaction.

## Stack technique

- **Framework**: React 18 + Vite
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6 (HashRouter)
- **Tests**: Vitest + Testing Library
- **Build**: Vite

## Fonctionnalités

- ✅ Site responsive et accessible
- ✅ SEO optimisé (meta tags, JSON-LD)
- ✅ Navigation HashRouter (compatible hébergement statique)
- ✅ Formulaire de contact
- ✅ Bandeau cookies avec gestion des préférences
- ✅ SafeLink/SafeNavLink (pas de crash hors Router)
- ✅ Tests unitaires complets
- ✅ Palette de couleurs premium (#FAF8F5, #a16207, #0F172A)

## Installation

```bash
# Cloner le dépôt
git clone <URL_DU_REPO>
cd TEst-Crm-immo

# Installer les dépendances
npm install
```

## Commandes

```bash
# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Lancer les tests
npm test

# Lancer les tests avec interface
npm run test:ui
```

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── SafeLink.tsx    # Liens sûrs (fallback <a> hors Router)
│   ├── Header.tsx      # En-tête fixe
│   ├── Footer.tsx      # Pied de page
│   ├── Card.tsx        # Carte réutilisable
│   ├── Badge.tsx       # Badge
│   ├── Section.tsx     # Section de page
│   ├── FAQItem.tsx     # Item FAQ accordéon
│   ├── CookieBanner.tsx # Bandeau cookies
│   └── ContactForm.tsx  # Formulaire de contact
│
├── pages/               # Pages de l'application
│   ├── Home.tsx        # Page d'accueil
│   ├── GestionLocative.tsx
│   ├── Vente.tsx
│   ├── APropos.tsx
│   ├── Contact.tsx
│   ├── Mentions.tsx
│   └── Confidentialite.tsx
│
├── router/
│   └── AppRouter.tsx   # Configuration HashRouter + ScrollToTop
│
├── utils/
│   └── seo.ts          # Helpers SEO (meta tags, JSON-LD)
│
├── test/
│   └── setup.ts        # Configuration Vitest
│
├── assets/
│   └── images/         # Placeholders d'images
│
├── App.tsx             # Composant racine
├── main.tsx            # Point d'entrée
└── index.css           # Styles globaux Tailwind
```

## Configuration

### Tailwind CSS

Les couleurs personnalisées sont définies dans `tailwind.config.js` :

```js
colors: {
  'cream': '#FAF8F5',           // Fond principal
  'amber-custom': '#a16207',    // Accent doré
  'slate-custom': '#0F172A',    // Texte principal
}
```

### Routing

Le site utilise **HashRouter** pour éviter la configuration serveur. Les URLs sont au format :
- `#/` - Accueil
- `#/gestion-locative` - Gestion locative
- `#/vente` - Transaction/Vente
- `#/a-propos` - À propos
- `#/contact` - Contact
- `#/mentions` - Mentions légales
- `#/confidentialite` - Politique de confidentialité

### SEO

Les helpers SEO dans `src/utils/seo.ts` permettent de :
- Définir les meta tags (title, description, OG tags)
- Injecter du JSON-LD (Schema.org)
- Fonctionnement SSR-safe (no-op si `document` indisponible)

## Personnalisation

### Remplacer les placeholders

1. **Téléphone** : Chercher `06 12 34 56 78` et remplacer
2. **Email** : Chercher `contact@kevin-griel-immobilier.fr` et remplacer
3. **WhatsApp** : Modifier `https://wa.me/33612345678`
4. **Calendly** : Modifier `https://calendly.com/kevin-griel`
5. **LinkedIn** : Modifier dans `src/pages/Home.tsx` (JSON-LD)
6. **Hébergeur** : Compléter dans `src/pages/Mentions.tsx`

### Ajouter des images réelles

Remplacer les placeholders dans les pages :
- `src/pages/Home.tsx` : Photo héros, visuels location/vente, carte
- `src/pages/APropos.tsx` : Portrait professionnel

Formats recommandés :
- **WebP** optimisé pour la performance
- Dimensions adaptées (hero: 1920x1080, portrait: 800x800)
- Attributs `alt` descriptifs pour l'accessibilité

### Formulaire de contact

Le formulaire dans `src/components/ContactForm.tsx` affiche actuellement un message de succès simulé.

Pour le connecter à un backend :
1. Remplacer le `console.log` par un appel API (fetch/axios)
2. Gérer les erreurs réseau
3. Ajouter un loader pendant l'envoi

Exemple :
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setSubmitted(true);
  } catch (error) {
    // Gérer l'erreur
  }
};
```

## Tests

Les tests couvrent :
- ✅ SafeLink (fallback <a> hors Router, Link dans Router)
- ✅ Router (navigation vers les pages)
- ✅ SEO (meta tags, JSON-LD en JSDOM)
- ✅ CookieBanner (affichage, préférences, localStorage)
- ✅ ContactForm (validation, soumission)

Lancer les tests :
```bash
npm test
```

## Accessibilité

- Focus visibles sur tous les éléments interactifs
- Respect de `prefers-reduced-motion`
- Contrastes conformes WCAG AA
- Aria labels sur les boutons et formulaires
- Navigation clavier complète

## Performance

- Lazy-loading des images (à implémenter avec vraies images)
- Tailwind CSS en JIT (pas de CSS inutilisé)
- Build optimisé Vite
- Objectif Lighthouse : 90+ en perf/SEO/accessibilité

## Déploiement

Le site peut être déployé sur :
- **Vercel** : `npm run build` → upload dossier `dist/`
- **Netlify** : idem
- **GitHub Pages** : compatible HashRouter
- **Serveur statique** : nginx, Apache

Aucune configuration serveur n'est nécessaire grâce au HashRouter.

## Licence

Tous droits réservés - Kevin Griel Immobilier

---

**Contact développeur** : Pour toute question technique sur ce projet, contactez l'équipe de développement.
