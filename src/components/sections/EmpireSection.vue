<template>
  <section id="empire" class="empire-section">
    <div class="empire-bg">
      <div class="empire-bg-glow" />
      <div class="empire-grid-lines" />
    </div>

    <div class="empire-top-line" />

    <!-- Intro centrée -->
    <div class="empire-intro">
      <div class="section-label reveal-fade">
        <span class="section-label-line" />
        <span>L'empire</span>
      </div>
      <h2 class="empire-title reveal-up" style="transition-delay:0.15s">
        Une agence.<br />
        <span class="empire-title-accent">Un écosystème d'impact.</span>
      </h2>
      <p class="empire-subtitle reveal-up" style="transition-delay:0.3s">
        Glow Empire est une agence spécialisée en communication, formation, digital, leadership et événementiel.
        À travers ses départements, elle accompagne entreprises, institutions, entrepreneurs et talents
        dans le développement de leur image, de leurs compétences et de leur influence.
      </p>
    </div>

    <!-- Chapitres -->
    <div
      v-for="(chapter, idx) in chapters"
      :key="chapter.id"
      class="empire-chapter"
      :class="{ 'chapter-reverse': idx % 2 === 1 }"
    >
      <div class="empire-visual-col">
        <div class="empire-visual-sticky">
          <div class="empire-visual-frame">
            <img
              :src="chapter.image"
              :alt="chapter.title"
              class="empire-visual-img"
              loading="lazy"
            />
            <div class="empire-visual-overlay" />
            <div class="empire-visual-corner-tl" />
            <div class="empire-visual-corner-br" />
            <div class="empire-visual-badge">
              <span class="empire-visual-badge-num">0{{ idx + 1 }}</span>
              <span class="empire-visual-badge-tag">{{ chapter.tag }}</span>
            </div>
          </div>
        </div>
      </div>

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
        </div>
      </div>
    </div>

    <!-- Citation finale + CTA vers la page Empire -->
    <div class="empire-closing">
      <div class="gradient-line" />
      <blockquote class="empire-quote reveal-up">
        "Nous ne créons pas seulement des projets.<br />
        Nous bâtissons des identités fortes, des leaders capables<br />
        d'inspirer leur génération et des marques qui durent."
      </blockquote>
      <div class="gradient-line" />

      <button class="empire-cta glass-cta reveal-up" style="transition-delay:0.15s" @click="goToEmpire">
        <span>Découvrir l'Empire</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToEmpire() {
  router.push('/empire')
}

const chapters = [
  {
    id: 'communication',
    tag: 'Communication & Influence',
    title: 'Donner à votre image la place qu\'elle mérite.',
    image: '/glow-empire1.jpeg',
    paragraphs: [
      'Communication d\'entreprise, branding, relations publiques, marketing stratégique et influence digitale : Glow Communication construit des identités fortes et des messages qui marquent.',
      'Nous transformons une présence ordinaire en positionnement clair, crédible et magnétique — celui qui fait qu\'une marque devient une référence dans son secteur.',
    ],
  },
  {
    id: 'leadership',
    tag: 'Leadership & Formation',
    title: 'Former et propulser les leaders de demain.',
    image: '/glow-empire2.jpeg',
    paragraphs: [
      'À travers GLOW Educ et GLOW Summit, nous accompagnons entrepreneurs, jeunes diplômés et organisations : coaching, leadership, personal branding, masterclass et conférences de networking.',
      'Des espaces conçus pour révéler les talents, développer le business et créer les connexions qui font grandir — dont la Conférence des Femmes Leaders du Bénin.',
    ],
  },
  {
    id: 'evenementiel',
    tag: 'Événementiel & Excellence',
    title: 'Une exécution à la hauteur de l\'ambition.',
    image: '/glow-empire3.jpeg',
    paragraphs: [
      'Avec GLOW Aura, l\'événementiel haut de gamme prend forme : hôtessariat, accueil VIP, accompagnement protocolaire, animation commerciale, modèles et représentation de marques.',
      'Chaque détail est pensé pour l\'impact réel. Glow Empire ne livre que ce qui élève véritablement une marque, un événement, une vision.',
    ],
  },
]
</script>

<style scoped>
.empire-section {
  margin-top: -3rem;
  position: relative;
  background: linear-gradient(to bottom, #021833 0%, #010B19 8%, #010B19 100%);
  padding: 2rem 1.5rem 6rem;
  overflow: hidden;
}

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

/* Intro — espace réduit */
.empire-intro {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 3rem auto 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

@media (min-width: 1024px) {
  .empire-intro {
    margin: 4rem auto 5rem;
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

/* Chapitres */
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
    padding: 6rem 0;
    align-items: start;
  }
  .empire-chapter.chapter-reverse .empire-visual-col { order: 2; }
  .empire-chapter.chapter-reverse .empire-text-col { order: 1; }
}

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
}

.empire-visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 55%, rgba(1, 11, 25, 0.55) 100%);
}

.empire-visual-corner-tl,
.empire-visual-corner-br {
  position: absolute;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(122, 211, 255, 0.5);
}
.empire-visual-corner-tl {
  top: 1rem; left: 1rem;
  border-right: none; border-bottom: none;
}
.empire-visual-corner-br {
  bottom: 1rem; right: 1rem;
  border-left: none; border-top: none;
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

/* Sur desktop : texte justifié pour équilibrer le bloc avec la hauteur de la photo */
@media (min-width: 1024px) {
  .empire-chapter-para {
    text-align: justify;
    hyphens: auto;
  }
}

/* Citation finale */
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

.empire-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 0.5rem;
  padding: 0.95rem 1.9rem;
  border-radius: 100px;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.92);
  cursor: pointer;
}
.empire-cta svg {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.empire-cta:hover svg {
  transform: translateX(3px);
}
</style>
