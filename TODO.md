# Glow Empire — TODO

> Ce fichier doit être mis à jour par Claude à chaque avancée significative.
> Format : `[x]` = fait, `[ ]` = à faire, `[~]` = en cours.

---

## ✅ Fait

### Setup & Infrastructure
- [x] Initialisation projet Vue 3 + Vite
- [x] Installation dépendances : `gsap`, `lenis`, `@tresjs/core`, `@tresjs/cientos` (GLTF loader), `three`, `clsx`, `swiper`, `@phosphor-icons/vue`, `motion`
- [x] Installation et configuration Tailwind CSS v4 (`@tailwindcss/vite`)
- [x] Configuration `vite.config.js` (plugin Tailwind + alias `@`)
- [x] Mise à jour `index.html` (lang fr, meta description, title)
- [x] Copie des vidéos dans `/public` (`hero-desktop.mp4`, `hero-mobile.mp4`, `footer-vid.mp4`, **`footer-mobile-vid.mp4`**)
- [x] Copie de `hero.png` dans `/public`
- [x] Structure dossiers `src/components/sections/`, `src/components/ui/`, `src/composables/`, `src/utils/`

### Styles globaux
- [x] `style.css` — variables CSS palette, glassmorphism, typography, reveal animations
- [x] Classes utilitaires : `.glass-liquid`, `.glass-cta`, `.text-glow`, `.reveal-up`, `.reveal-fade`, `.gradient-line`
- [x] Suppression des anciennes règles `.stacked-section` (remplacées par `.stack-section` dans App.vue)

### Composables
- [x] `useLenis.js` — smooth scroll premium (durée 1.4s, easing exponentiel)
- [x] `useLenis.js` — **intégration GSAP ScrollTrigger** (sync Lenis ↔ ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker`)
- [x] `useScrollReveal.js` — IntersectionObserver pour animations d'entrée

### Architecture v2 — système d'empilement
- [x] **Suppression** de l'ancien `DiamondTransition.vue` (était une section vide 280vh)
- [x] **Création** de `PersistentDiamondNav.vue` — nav fixée globale au top, avec diamant 3D au centre + liens nav gauche/droite (desktop), apparaît après le hero et reste sticky jusqu'au footer
- [x] Mise en place du système d'**empilement de sections** dans App.vue : chaque section a `position: sticky; top: 0` + `z-index` croissant, donc la suivante passe au-dessus de la précédente sans la faire disparaître
- [x] Sections empilées : Protagonist (z=2) → Empire (z=3) → Books (z=4) → Testimonials (z=5)
- [x] Border-radius en haut de chaque section empilée (`2.5rem 2.5rem 0 0`) + box-shadow renforcé + accent line top pour effet "lift up". Footer aussi avec rounded top.

### Composants — Sections
- [x] `HeroSection.vue` — vidéo plein écran desktop/mobile, **overlays allégés** (laisse passer la lumière vidéo), titre cinématique, **UN seul bouton verre liquide transparent** (pas de flèche), pas de scroll indicator
- [x] `ProtagonistSection.vue` — portrait avec stats flottantes, storytelling 3 paragraphes, credentials grid 2x2, CTA — contraste top via gradient légèrement plus clair pour transition lift
- [x] `EmpireSection.vue` **réécrit en scroll storytelling** : intro centrée + 3 chapitres alternés (visuel sticky d'un côté, texte qui défile de l'autre), citation finale
- [x] `BooksSection.vue` — 4 livres, covers génératives CSS, scroll horizontal mobile / grille 4col desktop
- [x] `TestimonialsSection.vue` — impact stats 4 chiffres, grille masonry 3 colonnes, 6 témoignages
- [x] `FooterSection.vue` — **vidéo desktop + vidéo mobile dédiée** (`/footer-mobile-vid.mp4`), statement cinématique, grille liens 4 colonnes, réseaux sociaux. **Overlay allégé** : vidéo opacity 0.5 (vs 0.12), gradient overlay réduit à 0.35 au milieu (vs 0.7).

### Composants — UI
- [x] `PersistentDiamondNav.vue` v3 — **modèle 3D GLB chargé** (`/blue_diamond.glb` fourni par l'utilisateur) via `@tresjs/cientos` `useGLTF`. Plus de géométrie procédurale qui ressemblait à un losange.
- [x] `DiamondModel.vue` — composant wrapper qui charge le GLB, **normalise sa taille** (Box3 + scale auto pour tenir dans 2.4 unités), **recentre le pivot** à l'origine pour rotation sur centre, **polit les matériaux** (envMapIntensity 1.8, roughness réduit de moitié, légère metalness). `defineExpose({ scene })` pour accès depuis le parent.
- [x] Lighting cinématique pour le diamant : ambient `#0E3975` (blue abyssal), key directional blanc upper-right, point cyan rim depuis la gauche, point bleu sous le diamant (under-glow), point bleu derrière pour luminosité intérieure. Pas d'éclairage agressif.
- [x] Rotation : Y continue lente (`time * 0.00035`), boost subtil au scroll (`scrollY * 0.0009`), bob X minimal (`sin(time * 0.0004) * 0.04`), tilt Z très léger.
- [x] Positionnement du diamant : **visible dès le départ à la frontière** section 1/2 (`top: heroH - scrollY - halfDiamond`). Pas de fade-in. Centré horizontalement (`left: 50%`) sur **mobile ET desktop**. Quand le scroll dépasse, lock à `top: 24px` + scale de 200px → 92px. Hide auto à l'approche du footer.
- [x] Halos blue derrière le diamant (inner intense + outer soft blurred) avec animation `halo-pulse`.
- [x] `MobileMenu.vue` réécrit — **angle explicite par icône** : chaque item a sa propre prop `angle` (0° = au-dessus du bouton, 90° = à gauche). Distribution 0/18/36/54/72/90° par défaut, modifiable individuellement. Radius 105px.

### App
- [x] `App.vue` réorganisé — Hero (scroll normal) → PersistentDiamondNav (fixed overlay) → stack-container (sections empilées) → Footer → MobileMenu
- [x] `CLAUDE.md` — documentation projet pour Claude
- [x] `TODO.md` — ce fichier

### Corrections build
- [x] Fix ordre `@import` CSS (Google Fonts avant `@import "tailwindcss"`)
- [x] Fix icônes Phosphor — tous les imports corrigés avec préfixe `Ph`
- [x] Fix image hero — copiée dans `/public/hero.png`
- [x] Réinstallation complète `npm install` (packages manquants après double install)

---

### Routing + Pages détail + Copywriting (2026-05-29)
- [x] **Vue Router 4** installé et configuré (`src/router/index.js`) — routes `/`, `/protagoniste`, `/empire`
- [x] `App.vue` simplifié en `<RouterView />` — `Home.vue` reprend le contenu de l'ancienne App
- [x] **Page `/protagoniste`** — bio complète de Riquier Soussia (5 blocs de parcours, stats, expertise, citation), header sticky glassmorphism + footer
- [x] **Page `/empire`** — contenu complet Glow Empire (manifeste, 4 valeurs, 5 offres, public accompagné), header + footer
- [x] **`PageHeader.vue`** — composant header sticky pour les pages détail (logo, nav, CTA)
- [x] **`PageFooter.vue`** — footer léger pour les pages détail (brand, nav, réseaux sociaux)
- [x] **Copywriting ProtagonistSection** mis à jour — vrai texte Riquier Soussia, stats exactes (12k, 3 livres, 10+ ans), bouton "Mon parcours complet" → route `/protagoniste`
- [x] **Copywriting EmpireSection** mis à jour — vrai contenu Glow Empire (révélation, leadership, excellence), citation finale reformulée
- [x] **Faux liens nettoyés** dans Footer : liens fictifs remplacés par ancres réelles (`#protagonist`, `#books`, `#testimonials`), routes (`/protagoniste`, `/empire`), email (`contact@glowempire.com`). Icône X/Twitter retirée. CGV/mentions légales fictives retirées.

### BooksSection — réécriture en deck premium (2026-05-23)
- [x] Refonte complète : 3 livres (`Prise de parole en public`, `L'entrepreneuriat des femmes`, `Pourquoi un homme ?`) en **deck de cartes empilées**
- [x] **Drag tactile 1:1** (Pointer Events + capture) — la carte suit le doigt en temps réel, pas de transition tardive
- [x] **Axis-lock** dès 8px → ne hijacke pas le scroll vertical natif
- [x] Cartes derrière morphent en temps réel vers leur slot suivant pendant le drag
- [x] Commit si > 28% swipe, sinon spring-back ; boucle infinie
- [x] Boutons gauche/droite glassmorphism sur desktop, hint discret bas-droite sur mobile (flèche qui pulse)
- [x] Dots pagination cachés sur mobile (desktop only)
- [x] Tailles : mobile carte 260px, tablet 340px, desktop ~30vw
- [x] Section min-height: 100vh pour ne plus que la CTA passe sous la section suivante
- [x] Images intégrées : `/livre2.jpg` (entrepreneuriat femmes) et `/livre3.jpeg` (pourquoi un homme) ; livre 1 = gradient fallback

### Assets contenu (2026-05-23)
- [x] Photo protagoniste réelle (`/protagoniste.jpeg` remplace `/hero.png`)
- [x] Logo entreprise (`/logo.jpg`) intégré : rond au-dessus de "Glow Empire" dans le hero + remplace le losange SVG du footer
- [x] Retrait du point lumineux pulsant à côté de "Glow Empire" dans l'eyebrow hero

---

## [ ] À faire — Priorité haute

### Intégrations annoncées
- [ ] **Supabase** : client (`src/lib/supabase.js`), auth, DB. Variables `.env.local` à définir avec le user
- [ ] **Agrégateur de paiement** pour vendre les livres (Stripe à confirmer) : checkout hosted + webhook + livraison PDF
- [ ] Schémas Supabase à valider avec le user : `users`, `orders`, `books` (CMS ?), `testimonials` ?

### Contenu réel
- [ ] Couverture livre 1 ("Prise de parole en public") quand fournie par le user
- [ ] Remplacer les placeholders d'images dans EmpireSection par les vraies photos (3 images pour les 3 chapitres)
- [ ] Remplacer les textes placeholder par le vrai copywriting
- [ ] Configurer les vrais liens (réseaux sociaux, pages internes)

### Améliorations motion
- [ ] Intégrer GSAP ScrollTrigger pour animations de chapitres dans EmpireSection (fade in/out de chaque chapitre actif)
- [ ] Stagger d'entrée plus cinématique sur les titres (split text par lettre avec GSAP SplitText)
- [ ] Indicateur de section active dans la navigation (highlight du lien actif au scroll)

### Diamant 3D
- [ ] Ajouter un environment map (HDRI ou CubeCamera) pour des reflets encore plus riches sur le GLB
- [ ] Optionnel : caustics / particules autour du diamant
- [ ] Optionnel : intégrer GSAP ScrollTrigger pour la rotation du diamant (actuellement direct `window.scrollY`, fonctionne déjà — mais ScrollTrigger serait plus robuste pour pages de hauteurs variables)

### Performance
- [ ] Lazy loading des sections sous le fold (dynamic import)
- [ ] Optimiser la taille du JS bundle (chunk splitting)
- [ ] Lazy load des vidéos (IntersectionObserver)
- [ ] Compresser/réduire les vidéos hero pour mobile

---

## [ ] À faire — Priorité normale

### Nouvelles pages / sections
- [ ] Page détail livre (route dynamique)
- [ ] Section "Formations / Coaching" entre Empire et Livres
- [ ] Section "Presse / Médias" (logos parution)
- [ ] Modal newsletter / lead magnet

### SEO & Meta
- [ ] Open Graph tags (og:image, og:description)
- [ ] Structured data (Person schema)
- [ ] Sitemap

### Accessibilité
- [ ] Focus trap dans le menu mobile
- [ ] ARIA labels sur tous les boutons
- [ ] Préférence `prefers-reduced-motion` sur toutes les animations
- [ ] Close-au-clic-extérieur sur le menu mobile

---

## [ ] À faire — Idées futures

- [ ] Mode sombre/clair (toggle discret)
- [ ] Curseur custom (diamant miniature qui suit la souris)
- [ ] Intro splash screen avec animation du logo diamant
- [ ] Particles WebGL en fond du hero (Three.js Points)
- [ ] Easter egg : konami code qui déclenche une animation premium
