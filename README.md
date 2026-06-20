# Invitation web - Baptême d'Ezio

Invitation responsive et animée pour le baptême d'Ezio, inspirée d'un journal d'explorateur ancien avec une ambiance jungle aquarelle.

## Installation

```bash
npm install
```

## Lancement local

```bash
npm run dev
```

Vite affiche ensuite l'URL locale, généralement `http://localhost:5173`.

## Modifier les informations

Toutes les informations personnalisables sont dans :

```text
src/config/invitationConfig.ts
```

Champs principaux :

- `babyName` : prénom affiché dans toute l'invitation.
- `birthDate` : date de naissance affichée dans le hero.
- `baptismDate`, `baptismIsoDate`, `ceremonyTime` : utilisés pour les infos pratiques et le calendrier.
- `ceremonyLocation`, `ceremonyAddress`, `celebrationLocation` : lieux affichés dans le plan d'expédition.
- `parentsNames` : signature.
- `whatsappNumber` : numéro utilisé par le bouton "Envoyer un message aux parents".

Pour activer le bouton calendrier, renseigner au minimum :

```ts
baptismDate: "20 septembre 2026",
baptismIsoDate: "2026-09-20",
ceremonyTime: "10:30",
```

## Changer le numéro WhatsApp

Dans `src/config/invitationConfig.ts`, remplacer :

```ts
whatsappNumber: "À compléter",
```

par un numéro au format international, par exemple :

```ts
whatsappNumber: "+23051234567",
```

Le site ne contient pas de formulaire de réponse. Le bouton WhatsApp sert uniquement à envoyer un message aux parents.

## Remplacer les images

Les visuels du hero principal sont ici :

```text
public/assets/images/hero/hero-jungle-desktop.webp
public/assets/images/hero/hero-jungle-mobile.webp
```

Les grandes illustrations de section sont ici :

```text
public/assets/images/sections/section-journal-desktop.webp
public/assets/images/sections/section-journal-mobile.webp
public/assets/images/sections/section-plan-desktop.webp
public/assets/images/sections/section-plan-mobile.webp
public/assets/images/sections/section-programme-desktop.webp
public/assets/images/sections/section-programme-mobile.webp
public/assets/images/sections/section-notes-desktop.webp
public/assets/images/sections/section-notes-mobile.webp
public/assets/images/sections/section-final-desktop.webp
public/assets/images/sections/section-final-mobile.webp
```

Chaque grande section utilise une paire desktop/mobile déclarée dans `sectionIllustrations` dans `src/config/invitationConfig.ts`.
Les petits assets isolés restent disponibles pour le hero, mais les sections principales reposent maintenant sur des illustrations de fond dédiées.

## Build de production

```bash
npm run build
```

Le dossier généré est `dist/`.

## Déploiement

- Vercel : importer le projet, framework `Vite`, commande build `npm run build`, dossier de sortie `dist`.
- Netlify : même configuration, build `npm run build`, publish `dist`.
- GitHub Pages : générer `dist`, puis publier ce dossier avec l'action ou l'outil de votre choix.

## Prévisualisation du lien WhatsApp / Messenger

Les balises SEO, Open Graph et Twitter utilisées pour l'aperçu du lien se trouvent dans `index.html`.
L'image d'aperçu est disponible dans :

```text
public/og/preview-ezio-v1.jpg
```

Après le déploiement, remplacer toutes les occurrences de `URL_DU_SITE_FINAL` dans `index.html` par l'URL publique HTTPS du site, sans barre oblique finale. Pour GitHub Pages, elle peut par exemple prendre cette forme :

```text
https://NOM_UTILISATEUR.github.io/NOM_DU_REPO
```

L'URL complète de l'image deviendra alors :

```text
https://NOM_UTILISATEUR.github.io/NOM_DU_REPO/og/preview-ezio-v1.jpg
```

WhatsApp, Messenger et Facebook peuvent conserver un ancien aperçu en cache. Pour forcer une mise à jour, renommer l'image, par exemple en `preview-ezio-v2.jpg`, puis modifier les balises `og:image` et `twitter:image` dans `index.html`.

## Direction visuelle

Le hero existant sert de référence principale. La V5 transforme les sections en fresque jungle continue : carnet ouvert, carte d'expédition, sentier dans la jungle, pause tendre, puis clairière finale. Les sections se chevauchent légèrement et utilisent des fondus papier/feuillage pour éviter l'effet de blocs empilés. Le texte reste en HTML au-dessus des visuels, avec des zones calmes et des overlays sobres pour préserver la lisibilité sur desktop et mobile.
