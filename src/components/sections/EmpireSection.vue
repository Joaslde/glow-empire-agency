<template>
  <section id="empire" class="empire-section">
    <!-- Background -->
    <div class="empire-bg">
      <div class="empire-bg-glow" />
      <div class="empire-grid-lines" />
    </div>

    <!-- Top divider line for stacking visual cue -->
    <div class="empire-top-line" />

    <!-- Centered intro -->
    <div class="empire-intro">
      <div class="section-label reveal-fade">
        <span class="section-label-line" />
        <span>L'empire</span>
      </div>
      <h2 class="empire-title reveal-up" style="transition-delay:0.15s">
        Un écosystème<br />
        <span class="empire-title-accent">bâti pour durer.</span>
      </h2>
      <p class="empire-subtitle reveal-up" style="transition-delay:0.3s">
        Glow Empire n'est pas une marque. C'est une infrastructure —
        des outils, des communautés, et des méthodes qui fonctionnent ensemble.
      </p>
    </div>

    <!-- Chapters : photo sticky d'un côté, texte qui défile de l'autre -->
    <div
      v-for="(chapter, idx) in chapters"
      :key="chapter.id"
      class="empire-chapter"
      :class="{ 'chapter-reverse': idx % 2 === 1 }"
    >
      <!-- Pinned visual column -->
      <div class="empire-visual-col">
        <div class="empire-visual-sticky">
          <div class="empire-visual-frame" :style="{ background: chapter.gradient }">
            <!-- Placeholder image with gradient overlay -->
            <img
              :src="chapter.image"
              :alt="chapter.title"
              class="empire-visual-img"
              loading="lazy"
            />
            <div class="empire-visual-overlay" />
            <div class="empire-visual-corner-tl" />
            <div class="empire-visual-corner-br" />
            <!-- Chapter number badge -->
            <div class="empire-visual-badge">
              <span class="empire-visual-badge-num">0{{ idx + 1 }}</span>
              <span class="empire-visual-badge-tag">{{ chapter.tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scrolling text column -->
      <div class="empire-text-col">
        <div class="empire-text-content">
          <div class="empire-chapter-label reveal-fade">
            <span class="section-label-line" />
            <span>Chapitre 0{{ idx + 1 }}</span>
          </div>
          <h3 class="empire-chapter-title reveal-up" style="transition-delay:0.1s">
            {{ chapter.title }}
          </h3>
          <p
            v-for="(para, pidx) in chapter.paragraphs"
            :key="pidx"
            class="empire-chapter-para reveal-up"
            :style="{ transitionDelay: `${0.2 + pidx * 0.1}s` }"
          >
            {{ para }}
          </p>

          <!-- Key points list -->
          <ul class="empire-points reveal-up" style="transition-delay:0.5s">
            <li v-for="point in chapter.points" :key="point" class="empire-point">
              <span class="empire-point-bullet" />
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Closing statement -->
    <div class="empire-closing">
      <div class="gradient-line" />
      <blockquote class="empire-quote reveal-up">
        "L'empire que tu construis aujourd'hui<br />
        définit la liberté que tu vivras demain."
      </blockquote>
      <div class="gradient-line" />
    </div>
  </section>
</template>

<script setup>
const chapters = [
  {
    id: 'growth',
    tag: 'Croissance',
    title: 'Bâtir des systèmes qui scalent.',
    image: '/hero.png',
    gradient: 'linear-gradient(135deg, #0E3975 0%, #1D74E8 100%)',
    paragraphs: [
      'L\'entrepreneuriat moderne ne récompense pas l\'effort brut. Il récompense les systèmes.',
      'Glow Empire condense plus de 7 ans d\'expérience terrain en méthodes éprouvées — des frameworks de croissance que tu peux installer dans ton business, dès cette semaine, sans avoir à tout réinventer.',
      'Le résultat : plus de revenus, plus de clarté, plus de temps. Et surtout — un business qui ne dépend plus uniquement de toi.',
    ],
    points: [
      'Frameworks d\'acquisition automatisés',
      'Systèmes de conversion mesurables',
      'Processus délégables et documentés',
    ],
  },
  {
    id: 'brand',
    tag: 'Personal Branding',
    title: 'Une marque qui te dépasse.',
    image: '/hero.png',
    gradient: 'linear-gradient(135deg, #0052A3 0%, #00A3FF 60%, #7AD3FF 100%)',
    paragraphs: [
      'Ta marque personnelle est ton actif le plus précieux. Mais sans stratégie, elle reste invisible.',
      'On construit ensemble une présence magnétique : positionnement clair, contenu impactant, identité reconnaissable. Le but : attirer naturellement les bonnes opportunités, sans avoir à les chasser.',
      'Une marque bien bâtie travaille pour toi pendant que tu dors. Elle ouvre des portes que ton CV ne pourra jamais ouvrir.',
    ],
    points: [
      'Positionnement et message signature',
      'Stratégie de contenu différenciée',
      'Identité visuelle cohérente premium',
    ],
  },
  {
    id: 'mindset',
    tag: 'Mindset',
    title: 'Reprogrammer le logiciel mental.',
    image: '/hero.png',
    gradient: 'linear-gradient(135deg, #001C3D 0%, #0E3975 60%, #1D74E8 100%)',
    paragraphs: [
      'Les meilleures stratégies échouent face à un mindset bloqué. Les blocages mentaux sont la vraie limite — pas le marché.',
      'Glow Empire t\'aide à identifier et démanteler les croyances limitantes qui freinent ton ascension. À installer les schémas mentaux des entrepreneurs qui réussissent réellement.',
      'Ce n\'est pas du développement personnel léger. C\'est de l\'ingénierie mentale appliquée à la performance.',
    ],
    points: [
      'Audit des croyances limitantes',
      'Routines de haute performance',
      'Discipline et clarté décisionnelle',
    ],
  },
]
</script>

<style scoped>
.empire-section {
  position: relative;
  background:
    linear-gradient(to bottom, #021833 0%, #010B19 8%, #010B19 100%);
  padding: 5rem 1.5rem 6rem;
  overflow: hidden;
}

/* Top accent line */
.empire-top-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(122, 211, 255, 0.35), transparent);
  z-index: 2;
}

.empire-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.empire-bg-glow {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 700px;
  background: radial-gradient(ellipse, rgba(0, 82, 163, 0.1) 0%, transparent 70%);
}
.empire-grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(122, 211, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(122, 211, 255, 0.025) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
}

/* Intro */
.empire-intro {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 6rem auto 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

@media (min-width: 1024px) {
  .empire-intro {
    margin: 8rem auto 6rem;
  }
}

.section-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(122, 211, 255, 0.6);
}
.section-label-line {
  display: block;
  width: 24px;
  height: 1px;
  background: rgba(122, 211, 255, 0.4);
}

.empire-title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: #ffffff;
}
.empire-title-accent {
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.empire-subtitle {
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.45);
  max-width: 560px;
  font-weight: 300;
}

/* === CHAPTER LAYOUT === */
.empire-chapter {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 4rem 0;
}

@media (min-width: 1024px) {
  .empire-chapter {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    padding: 8rem 0;
    align-items: start;
  }

  .empire-chapter.chapter-reverse .empire-visual-col {
    order: 2;
  }
  .empire-chapter.chapter-reverse .empire-text-col {
    order: 1;
  }
}

/* Pinned visual */
.empire-visual-col {
  position: relative;
}

@media (min-width: 1024px) {
  .empire-visual-sticky {
    position: sticky;
    top: 18vh;
  }
}

.empire-visual-frame {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.12);
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.5);
}

.empire-visual-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.55;
  mix-blend-mode: luminosity;
}

.empire-visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 30%, rgba(1, 11, 25, 0.7) 100%);
}

.empire-visual-corner-tl,
.empire-visual-corner-br {
  position: absolute;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(122, 211, 255, 0.5);
}
.empire-visual-corner-tl {
  top: 1rem;
  left: 1rem;
  border-right: none;
  border-bottom: none;
}
.empire-visual-corner-br {
  bottom: 1rem;
  right: 1rem;
  border-left: none;
  border-top: none;
}

.empire-visual-badge {
  position: absolute;
  bottom: 1.75rem;
  left: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.empire-visual-badge-num {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: rgba(122, 211, 255, 0.75);
}
.empire-visual-badge-tag {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.01em;
}

/* Scrolling text */
.empire-text-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.empire-text-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.empire-chapter-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(122, 211, 255, 0.5);
}

.empire-chapter-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #ffffff;
}

.empire-chapter-para {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 300;
}

.empire-points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(122, 211, 255, 0.08);
}
.empire-point {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 400;
}
.empire-point-bullet {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7AD3FF;
  box-shadow: 0 0 8px rgba(122, 211, 255, 0.6);
}

/* Closing */
.empire-closing {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 6rem 0 2rem;
  max-width: 700px;
  margin: 0 auto;
}

.gradient-line {
  width: 100%;
  max-width: 400px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(122, 211, 255, 0.3), transparent);
}

.empire-quote {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 300;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.65);
  text-align: center;
  font-style: italic;
  letter-spacing: 0.01em;
}
</style>
