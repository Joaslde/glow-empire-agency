# Glow Empire — Guide pour Claude

## Contexte du projet

Glow Empire est une **expérience numérique premium immersive**, pas un simple site e-commerce ou vitrine.

Le site est conçu pour :
- Présenter le protagoniste (personal branding)
- Présenter son entreprise et son empire
- Présenter ses livres
- Transmettre une sensation de prestige, de puissance et de mystère

L'univers visuel : **bleu abyssal, diamant lumineux, futurisme maîtrisé**.

---

## Stack technique

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 8** + `@tailwindcss/vite`
- **Tailwind CSS v4**
- **GSAP** — animations avancées
- **Lenis** — smooth scroll
- **TresJS** (`@tresjs/core`) + **Three.js** — diamant 3D
- **Motion** — animations déclaratives Vue
- **Swiper** — carrousels
- **@phosphor-icons/vue** — icônes (toujours avec préfixe `Ph` : `PhArrowRight`, etc.)
- **clsx** — utilitaire classes conditionnelles

---

## Fichiers de référence à lire en priorité

Avant toute modification de style, motion ou UI, lire ces 3 fichiers :

1. [`docs/design_philosophy.md`](docs/design_philosophy.md) — L'identité visuelle, les valeurs à transmettre, ce qu'il faut éviter
2. [`docs/motion-system.md`](docs/motion-system.md) — Comment le mouvement doit fonctionner, le scroll cinématique, le diamant
3. [`docs/ui-principles.md`](docs/ui-principles.md) — Palette de couleurs, typographie, principes d'interface

Ces fichiers font autorité sur toutes les décisions de design.

---

## Structure du projet

```
src/
  components/
    sections/          — Sections de la landing page
      HeroSection.vue
      DiamondTransition.vue
      ProtagonistSection.vue
      EmpireSection.vue
      BooksSection.vue
      TestimonialsSection.vue
      FooterSection.vue
    ui/                — Composants réutilisables
      MobileMenu.vue   — Menu radial flottant mobile
  composables/
    useLenis.js        — Smooth scroll (singleton)
    useScrollReveal.js — IntersectionObserver reveals
  utils/               — Utilitaires à venir
  App.vue              — Root : assemble toutes les sections
  main.js
  style.css            — Variables CSS, glassmorphism, Tailwind
public/
  hero-desktop.mp4     — Vidéo hero desktop
  hero-mobile.mp4      — Vidéo hero mobile
  footer-vid.mp4       — Vidéo footer
  hero.png             — Image placeholder protagoniste
docs/
  design_philosophy.md
  motion-system.md
  ui-principles.md
TODO.md                — Tâches réalisées et à faire (à maintenir)
```

---

## Conventions importantes

### Icônes Phosphor
Toujours importer avec le préfixe `Ph` :
```js
import { PhArrowRight, PhUser, PhBooks } from '@phosphor-icons/vue'
```

### Palette CSS (variables globales dans `style.css`)
```
--bg-deep: #010B19       — Fond principal
--bg-dark: #021833       — Fond secondaire
--glow-mid: #0052A3      — Glow intermédiaire
--glow-light: #00A3FF    — Glow lumineux
--diamond-deep: #0E3975  — Diamant sombre
--diamond-mid: #1D74E8   — Diamant intermédiaire
--diamond-bright: #7AD3FF — Diamant lumineux
```

### Classes utilitaires CSS globales
- `.glass-liquid` — Glassmorphism panneau/fond
- `.glass-cta` — Glassmorphism bouton liquide premium
- `.text-glow` / `.text-glow-subtle` — Lueur texte
- `.reveal-up` / `.reveal-fade` — Classes d'animation entrée (ajoutées par `useScrollReveal`)
- `.stacked-section` — Sections qui se chevauchent au scroll
- `.gradient-line` — Séparateur dégradé horizontal
- `.section-label` — Label section (ligne + texte uppercase)

### Animations reveal
Les éléments avec `.reveal-up` ou `.reveal-fade` démarrent cachés. `useScrollReveal` ajoute `.is-visible` via IntersectionObserver. Utiliser `transition-delay` inline pour le stagger :
```html
<div class="reveal-up" style="transition-delay: 0.3s">...</div>
```

### Smooth scroll
`useLenis` est initialisé dans `App.vue`. Pour scroller programmatiquement depuis un composant, utiliser `el.scrollIntoView({ behavior: 'smooth' })`.

---

## Fichier TODO

Le fichier [`TODO.md`](TODO.md) liste toutes les tâches réalisées et à venir.

**Claude doit mettre à jour `TODO.md` à chaque fois qu'il :**
- Complète une fonctionnalité
- Ajoute un nouveau composant
- Corrige un bug significatif
- Commence une nouvelle tâche planifiée

---

## Ce qu'il faut toujours éviter

- Esthétique "template IA" ou SaaS générique
- Icônes Lucide (utiliser Phosphor uniquement)
- Composants non customisés
- Animations trop rapides ou agressives
- Surcharge visuelle
- Couleurs agressives hors palette
- Commentaires de code inutiles
