<template>
  <section id="protagonist" class="protagonist-section">
    <div class="prot-bg">
      <div class="prot-bg-gradient" />
    </div>

    <div class="prot-container">
      <!-- Left: Portrait -->
      <div class="prot-portrait-col">
        <div class="prot-portrait-wrap reveal-fade">
          <div class="prot-portrait-frame">
            <img
              src="/protagoniste.jpeg"
              alt="Riquier Soussia"
              class="prot-portrait-img"
              loading="lazy"
            />
            <div class="prot-portrait-overlay" />
          </div>
          <div class="prot-stat prot-stat-1 glass-liquid reveal-up" style="transition-delay:0.3s">
            <span class="prot-stat-number">+100</span>
            <span class="prot-stat-label">personnes accompagnées</span>
          </div>
          <button
            type="button"
            class="prot-stat prot-stat-2 prot-stat-link glass-liquid reveal-up"
            style="transition-delay:0.5s"
            @click="scrollToBooks"
          >
            <span class="prot-stat-number">3</span>
            <span class="prot-stat-label">livres publiés</span>
          </button>
        </div>
      </div>

      <!-- Right: Story -->
      <div class="prot-story-col">
        <div class="section-label reveal-fade" style="transition-delay:0.1s">
          <span class="section-label-line" />
          <span>Le protagoniste</span>
        </div>

        <h2 class="prot-title reveal-up" style="transition-delay:0.2s">
          L'homme derrière<br />
          <span class="prot-title-accent">la vision.</span>
        </h2>

        <div class="prot-story-text">
          <p class="reveal-up" style="transition-delay:0.35s">
            <strong>Riquier Soussia</strong> n'est pas simplement un auteur. C'est un architecte de destins —
            juriste de formation, entrepreneur accompli, coach certifié et stratège du développement humain,
            reconnu pour son engagement en faveur du leadership et de l'autonomisation des jeunes en Afrique.
          </p>
          <p class="reveal-up" style="transition-delay:0.5s">
            Depuis plus d'une décennie, il décrypte les mécanismes invisibles qui séparent ceux qui rêvent
            de ceux qui accomplissent. Sa conviction est profonde et simple à la fois :
            chaque être humain possède un diamant brut en lui — il attend d'être révélé.
          </p>
          <p class="reveal-up" style="transition-delay:0.65s">
            À travers Glow Empire, il partage sans réserve les principes qui ont forgé sa trajectoire —
            des méthodes nées de l'expérience, du terrain, et d'une obsession constante pour l'excellence.
          </p>
        </div>

        <div class="reveal-up" style="transition-delay:0.75s">
          <button class="glass-cta prot-cta" @click="goToProtagoniste">
            <span>Mon parcours complet</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToProtagoniste() {
  router.push('/protagoniste')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToBooks() {
  const el = document.querySelector('#books')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.protagonist-section {
  position: relative;
  background: linear-gradient(to bottom, #0a2548 0%, #021833 40%, #021833 100%);
  padding: 6rem 1.5rem 6rem;
  overflow: hidden;
}

.protagonist-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(122, 211, 255, 0.4), transparent);
  z-index: 2;
}

.prot-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.prot-bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 50% at 80% 50%, rgba(0, 82, 163, 0.12) 0%, transparent 60%),
    linear-gradient(to bottom, rgba(1, 11, 25, 0.6) 0%, transparent 30%);
}

.prot-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .prot-container {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }
}

.prot-portrait-col {
  display: flex;
  justify-content: center;
}

.prot-portrait-wrap {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.prot-portrait-frame {
  position: relative;
  aspect-ratio: 3/4;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.12);
}

.prot-portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  filter: brightness(0.9) contrast(1.05);
}

.prot-portrait-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(2, 24, 51, 0.7) 0%, transparent 50%);
}

.prot-stat {
  position: absolute;
  padding: 0.75rem 1.1rem;
  border-radius: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.prot-stat-1 {
  bottom: -1.5rem;
  left: -1rem;
}
.prot-stat-2 {
  top: 2rem;
  right: -1.5rem;
}
.prot-stat-link {
  cursor: pointer;
  font-family: inherit;
  text-align: left;
}
.prot-stat-number {
  font-size: 1.5rem;
  font-weight: 600;
  color: #7AD3FF;
  line-height: 1;
}
.prot-stat-label {
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.04em;
}

.prot-story-col {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
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

.prot-title {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: #ffffff;
}
.prot-title-accent {
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.prot-story-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.prot-story-text p {
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 300;
}
.prot-story-text strong {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.prot-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.6rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  border: none;
  cursor: pointer;
  letter-spacing: 0.02em;
}
</style>
