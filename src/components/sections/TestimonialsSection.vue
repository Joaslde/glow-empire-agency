<template>
  <section id="testimonials" class="testimonials-section">
    <div class="testimonials-bg">
      <div class="testimonials-glow" />
    </div>

    <div class="testimonials-container">
      <!-- Header -->
      <div class="testimonials-header">
        <div class="section-label reveal-fade">
          <span class="section-label-line" />
          <span>L'impact</span>
        </div>
        <h2 class="testimonials-title reveal-up" style="transition-delay:0.15s">
          Des résultats<br />
          <span class="testimonials-title-accent">qui parlent.</span>
        </h2>
      </div>

      <!-- Impact numbers -->
      <div class="impact-numbers reveal-up" style="transition-delay:0.2s">
        <div v-for="stat in impactStats" :key="stat.label" class="impact-stat">
          <span class="impact-value">{{ stat.value }}</span>
          <span class="impact-label">{{ stat.label }}</span>
        </div>
      </div>

      <!-- Testimonials masonry -->
      <div class="testimonials-grid">
        <div
          v-for="(col, c) in columns"
          :key="c"
          class="testimonials-col"
        >
          <div
            v-for="(t, i) in col"
            :key="t.name"
            class="testimonial-card glass-liquid reveal-up"
            :style="{ transitionDelay: `${0.05 + c * 0.1 + i * 0.08}s` }"
          >
            <!-- Stars -->
            <div class="testimonial-stars">
              <span v-for="s in 5" :key="s" class="star">★</span>
            </div>
            <!-- Quote -->
            <p class="testimonial-quote">{{ t.quote }}</p>
            <!-- Author -->
            <div class="testimonial-author">
              <div class="testimonial-avatar" :style="{ background: t.avatarBg }">
                {{ t.name[0] }}
              </div>
              <div>
                <div class="testimonial-name">{{ t.name }}</div>
                <div class="testimonial-role">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const impactStats = [
  { value: '12k+', label: 'entrepreneurs formés' },
  { value: '94%', label: 'recommandent la méthode' },
  { value: '3.2x', label: 'croissance moyenne' },
  { value: '7 ans', label: 'd\'expérience terrain' },
]

const testimonials = [
  {
    quote: "Glow Empire a complètement transformé ma façon d'aborder mon business. En 3 mois, j'ai multiplié mon chiffre par 2.5.",
    name: 'Amina K.',
    role: 'Fondatrice, Studio AK',
    avatarBg: 'linear-gradient(135deg, #0E3975, #1D74E8)',
  },
  {
    quote: "La méthode Empire Mindset m'a donné les outils pour sortir de mes blocages. Aujourd'hui je gère une équipe de 12 personnes.",
    name: 'Thomas R.',
    role: 'CEO, Digital First',
    avatarBg: 'linear-gradient(135deg, #0052A3, #7AD3FF)',
  },
  {
    quote: "Le personal branding que j'ai construit avec ces méthodes m'a amené 3 contrats de 5 chiffres en moins de 6 mois.",
    name: 'Sofia M.',
    role: 'Coach & Consultante',
    avatarBg: 'linear-gradient(135deg, #1D74E8, #00A3FF)',
  },
  {
    quote: "Ce n'est pas du coaching classique. C'est une vraie vision d'empire. J'ai construit quelque chose dont je suis fier.",
    name: 'Marcus D.',
    role: 'Entrepreneur',
    avatarBg: 'linear-gradient(135deg, #001C3D, #0052A3)',
  },
  {
    quote: "Les livres de Glow Empire sont des références. Chaque page contient un levier actionnable. Du concentré d'expérience.",
    name: 'Léa B.',
    role: 'Directrice Marketing',
    avatarBg: 'linear-gradient(135deg, #0E3975, #00A3FF)',
  },
  {
    quote: "J'ai enfin compris comment scaler mon activité sans m'épuiser. Le système empire est une révélation.",
    name: 'Kevin S.',
    role: 'SaaS Founder',
    avatarBg: 'linear-gradient(135deg, #021833, #1D74E8)',
  },
]

// Split into 3 columns (or 2 on mobile handled via CSS)
const columns = computed(() => {
  const cols = [[], [], []]
  testimonials.forEach((t, i) => cols[i % 3].push(t))
  return cols
})
</script>

<style scoped>
.testimonials-section {
  margin-top:-3rem;
  position: relative;
  background: #010B19;
  padding: 8rem 1.5rem 6rem;
  overflow: hidden;
}

.testimonials-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.testimonials-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(0, 82, 163, 0.1) 0%, transparent 70%);
}

.testimonials-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* Header */
.testimonials-header {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

.testimonials-title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: #ffffff;
}
.testimonials-title-accent {
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Impact numbers */
.impact-numbers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(122, 211, 255, 0.08);
  border-radius: 1.25rem;
  background: rgba(2, 24, 51, 0.4);
}

@media (min-width: 768px) {
  .impact-numbers {
    grid-template-columns: repeat(4, 1fr);
  }
}

.impact-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  text-align: center;
}
.impact-value {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
}
.impact-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
}

/* Masonry grid */
.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  /* Hide third column on 2-col layout */
  .testimonials-col:nth-child(3) {
    display: none;
  }
}

@media (min-width: 1024px) {
  .testimonials-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .testimonials-col:nth-child(3) {
    display: flex;
  }
}

.testimonials-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Card */
.testimonial-card {
  padding: 1.5rem;
  border-radius: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.testimonial-card:hover {
  transform: translateY(-3px);
}

.testimonial-stars {
  display: flex;
  gap: 2px;
}
.star {
  font-size: 0.75rem;
  color: #7AD3FF;
  opacity: 0.8;
}

.testimonial-quote {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 300;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.testimonial-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  flex-shrink: 0;
}
.testimonial-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}
.testimonial-role {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 300;
}
</style>
