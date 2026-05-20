<template>
  <section id="protagonist" class="protagonist-section">
    <!-- Background -->
    <div class="prot-bg">
      <div class="prot-bg-gradient" />
    </div>

    <div class="prot-container">
      <!-- Left: Portrait -->
      <div class="prot-portrait-col">
        <div class="prot-portrait-wrap reveal-fade">
          <div class="prot-portrait-frame">
            <img
              src="/hero.png"
              alt="Le protagoniste"
              class="prot-portrait-img"
              loading="lazy"
            />
            <div class="prot-portrait-overlay" />
          </div>
          <!-- Floating stats -->
          <div class="prot-stat prot-stat-1 glass-liquid reveal-up" style="transition-delay:0.3s">
            <span class="prot-stat-number">+12k</span>
            <span class="prot-stat-label">membres</span>
          </div>
          <div class="prot-stat prot-stat-2 glass-liquid reveal-up" style="transition-delay:0.5s">
            <span class="prot-stat-number">4</span>
            <span class="prot-stat-label">livres publiés</span>
          </div>
        </div>
      </div>

      <!-- Right: Story -->
      <div class="prot-story-col">
        <!-- Label -->
        <div class="section-label reveal-fade" style="transition-delay:0.1s">
          <span class="section-label-line" />
          <span>Le protagoniste</span>
        </div>

        <h2 class="prot-title reveal-up" style="transition-delay:0.2s">
          Bâtir un empire<br />
          <span class="prot-title-accent">demande une vision.</span>
        </h2>

        <div class="prot-story-text">
          <p class="reveal-up" style="transition-delay:0.35s">
            Je suis <strong>Glow Empire</strong> — entrepreneur, auteur, et architecte de systèmes de croissance.
            Depuis plus de 7 ans, j'aide des entrepreneurs ambitieux à transformer leur présence,
            leur business et leur mindset.
          </p>
          <p class="reveal-up" style="transition-delay:0.5s">
            Ce n'est pas du coaching classique. C'est une méthode forgée dans la réalité —
            des années d'expériences, d'échecs assumés, et de victoires bâties méthodiquement.
          </p>
          <p class="reveal-up" style="transition-delay:0.65s">
            Mon travail : te donner les outils, la clarté et l'élan pour construire quelque chose
            de réel. Un empire qui porte ta signature.
          </p>
        </div>

        <!-- Credentials -->
        <div class="prot-credentials reveal-up" style="transition-delay:0.75s">
          <div v-for="item in credentials" :key="item.label" class="prot-cred-item">
            <span class="prot-cred-value">{{ item.value }}</span>
            <span class="prot-cred-label">{{ item.label }}</span>
          </div>
        </div>

        <!-- CTA -->
        <div class="reveal-up" style="transition-delay:0.9s">
          <button class="glass-cta prot-cta">
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
const credentials = [
  { value: '7+', label: 'années d\'expérience' },
  { value: '12k+', label: 'entrepreneurs accompagnés' },
  { value: '4', label: 'bestsellers publiés' },
  { value: '98%', label: 'taux de satisfaction' },
]
</script>

<style scoped>
.protagonist-section {
  position: relative;
  background:
    linear-gradient(to bottom, #0a2548 0%, #021833 40%, #021833 100%);
  padding: 6rem 1.5rem 6rem;
  overflow: hidden;
}

/* Top accent line — visual contrast cue */
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

/* Portrait column */
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

/* Floating stats */
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

/* Story column */
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

/* Credentials */
.prot-credentials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  padding: 1.5rem;
  border: 1px solid rgba(122, 211, 255, 0.08);
  border-radius: 1rem;
  background: rgba(1, 11, 25, 0.3);
}
.prot-cred-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.prot-cred-value {
  font-size: 1.6rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1;
}
.prot-cred-label {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
  letter-spacing: 0.02em;
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
