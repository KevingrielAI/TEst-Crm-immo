# Module de gestion des mandats immobiliers

Ce document présente une proposition d'architecture et une feuille de route pour développer un module indépendant permettant la création, l'édition, l'envoi et la signature de mandats immobiliers.

## Objectifs
- Gestion complète du cycle de vie d'un mandat (vente ou location)
- Signature électronique conforme eIDAS ou signature manuscrite sur écran
- Archivage sécurisé et traçabilité des opérations
- Module réutilisable au sein d'un CRM ou d'une plateforme immobilière plus large

## Architecture technique proposée

### Front-end
- **Framework**: React (avec TypeScript pour la robustesse)
- **Gestion d'état**: Redux Toolkit ou React Context selon la complexité
- **Bibliothèques UI**: Material-UI ou Ant Design pour des composants prêts à l'emploi
- **Génération et prévisualisation des documents**: utilisation de `react-pdf` pour afficher le PDF avant signature
- **Signature manuscrite**: intégration de `react-signature-canvas`
- **Communication avec le back-end**: API REST sécurisée via JWT et HTTPS

### Back-end
- **Framework**: Node.js avec NestJS (structure modulaire, support TypeScript)
- **Base de données**: PostgreSQL via ORM Prisma ou TypeORM
- **Génération de documents**: `pdfkit` ou `puppeteer` pour convertir des templates HTML en PDF
- **Intégration de signature électronique**:
  - Option 1 : API d’un prestataire (ex: YouSign, DocuSign) pour la signature qualifiée
  - Option 2 : stockage de l’image de signature manuscrite capturée côté front-end
- **Authentification & sécurité**:
  - JWT + double facteur pour les agents
  - Journal d’audit de toutes les actions (création, modification, envoi, signature)
- **Stockage des documents signés**: espace dédié dans un stockage objet compatible S3 (ex: MinIO) avec chiffrement côté serveur

### Schéma de base de données simplifié
```
Agent(id, nom, email, motDePasse, deuxFA)
Client(id, nom, email, telephone)
Mandat(id, type, statut, dateCreation, dateExpiration, agentId, clientId, urlDocument, urlDocumentSigne)
Journal(id, action, horodatage, agentId, mandatId, details)
```

### API principales
- `POST /mandats` : créer un mandat à partir du formulaire
- `GET /mandats/:id` : récupérer un mandat et son état
- `PUT /mandats/:id` : mise à jour avant signature
- `POST /mandats/:id/envoyer` : génération du lien sécurisé et envoi au client
- `POST /mandats/:id/signature` : réception de la signature (via webhook du prestataire ou upload direct)
- `GET /mandats/:id/document` : téléchargement du PDF signé

## Feuille de route (roadmap)
1. **Phase de préparation**
   - Définir les besoins réglementaires (niveau de signature, conservation des preuves)
   - Choisir le prestataire de signature électronique et créer un environnement de test
   - Mettre en place le dépôt Git et les bases du projet (front-end et back-end)

2. **MVP (Produit Minimum Viable)**
   - Formulaire de création de mandat avec champs dynamiques
   - Génération et prévisualisation PDF
   - Envoi d’un lien de signature (intégration API sandbox)
   - Tableau de bord simple listant les mandats et leur statut
   - Archivage du document signé dans le stockage sécurisé

3. **Fonctionnalités avancées**
   - Signature manuscrite sur tablette/mobile
   - Notifications par email/SMS via un service tiers (ex: Twilio)
   - Authentification à double facteur pour les agents
   - Journal d’audit complet consultable dans l’interface admin
   - Gestion des modèles de mandat (simple, exclusif, etc.)

4. **Sécurité et conformité**
   - Mise en place des mesures RGPD (droit à l’oubli, consentement)
   - Passage en production avec certificat SSL, durcissement du serveur
   - Tests de charge et revue de sécurité

5. **Maintenance et évolutions**
   - Ajout d’une API publique pour intégration dans d’autres logiciels immobiliers
   - Possibilité de personnaliser les modèles de documents par agence
   - Export statistique et reporting

## Simplicité d’utilisation
- Interface intuitive avec étapes guidées pour la création d’un mandat
- Pré-remplissage possible des données client (connexion CRM)
- Notifications claires pour chaque changement d’état du mandat
- Aide en ligne et support via un module de chat ou FAQ intégrée

## Conclusion
Ce module, bâti avec un front-end moderne (React) et un back-end Node.js sécurisé, offrira à un agent immobilier un outil complet pour gérer ses mandats, depuis la création jusqu’à l’archivage du document signé. Sa conception modulaire permettra de l’intégrer facilement dans un CRM ou un logiciel immobilier existant.

