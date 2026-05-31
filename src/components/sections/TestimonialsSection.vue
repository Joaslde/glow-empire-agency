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
          Ils ont choisi<br />
          <span class="testimonials-title-accent">de briller.</span>
        </h2>
      </div>

      <!-- Carousel -->
      <div class="carousel-wrap reveal-up" style="transition-delay:0.25s">
        <!-- Carte active -->
        <div class="carousel-track" :style="trackStyle">
          <div
            v-for="(t, i) in testimonials"
            :key="t.name"
            class="carousel-slide"
          >
            <div class="testimonial-card glass-liquid" :class="{ active: i === current }">
              <div class="testimonial-stars">
                <span v-for="s in 5" :key="s" class="star">★</span>
              </div>
              <p class="testimonial-quote">{{ t.quote }}</p>
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

        <!-- Flèches -->
        <button class="carousel-arrow arrow-left glass-liquid" @click="prev" aria-label="Précédent">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="carousel-arrow arrow-right glass-liquid" @click="next" aria-label="Suivant">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Dots -->
        <div class="carousel-dots">
          <button
            v-for="(_, i) in testimonials"
            :key="i"
            class="carousel-dot"
            :class="{ 'dot-active': i === current }"
            @click="current = i"
            :aria-label="`Témoignage ${i + 1}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const current = ref(0)

const testimonials = [
  {
    quote: "J'ai lu des dizaines de livres sur le sujet. Celui sur la prise de parole a débloqué quelque chose en moi dès le premier chapitre. Une clarté que je n'avais jamais trouvée ailleurs.",
    name: 'Aminata K.',
    role: 'Entrepreneure',
    avatarBg: 'linear-gradient(135deg, #0E3975, #1D74E8)',
  },
  {
    quote: '"Pourquoi un homme" n\'est pas un livre, c\'est un miroir. Un miroir exigeant mais bienveillant. Il m\'a montré comment affronter mes responsabilités avec grâce et avec force.',
    name: 'Thomas M.',
    role: 'Cadre dirigeant',
    avatarBg: 'linear-gradient(135deg, #0052A3, #7AD3FF)',
  },
  {
    quote: "L'ouvrage sur le leadership féminin est d'une justesse incroyable. Riquier écrit avec intention et précision. Une lecture indispensable pour toute femme qui veut diriger avec impact.",
    name: 'Nadia R.',
    role: 'Coach certifiée',
    avatarBg: 'linear-gradient(135deg, #1D74E8, #00A3FF)',
  },
  {
    quote: "C'est devenu ma carte de visite intellectuelle. J'offre ces livres à tous mes collaborateurs. Le niveau de profondeur est rare dans ce genre d'ouvrages.",
    name: 'David L.',
    role: 'Consultant',
    avatarBg: 'linear-gradient(135deg, #001C3D, #0052A3)',
  },
  {
    quote: "Le coaching de Riquier m'a donné les outils pour transformer ma communication. En quelques semaines, ma posture face à un auditoire a radicalement changé.",
    name: 'Sofia M.',
    role: 'Coach & Formatrice',
    avatarBg: 'linear-gradient(135deg, #0E3975, #00A3FF)',
  },
  {
    quote: "Glow Empire, c'est un écosystème complet. Le livre, le coaching, la vision — tout est cohérent. On sent qu'il y a une vraie conviction derrière chaque mot.",
    name: 'Kevin S.',
    role: 'Entrepreneur',
    avatarBg: 'linear-gradient(135deg, #021833, #1D74E8)',
  },
]

const trackStyle = computed(() => ({
  transform: `translateX(-${current.value * 100}%)`,
}))

function prev() {
  current.value = (current.value - 1 + testimonials.length) % testimonials.length
}
function next() {
  current.value = (current.value + 1) % testimonials.length
}
</script>

<style scoped>
.testimonials-section {
  margin-top: -3rem;
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
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

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

/* === CAROUSEL === */
.carousel-wrap {
  position: relative;
}

.carousel-track {
  display: flex;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: visible;
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  padding: 0 0.25rem;
  box-sizing: border-box;
}

.testimonial-card {
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 240px;
}

.testimonial-stars {
  display: flex;
  gap: 3px;
}
.star {
  font-size: 0.8rem;
  color: #7AD3FF;
  opacity: 0.75;
}

.testimonial-quote {
  font-size: clamp(1rem, 2.2vw, 1.15rem);
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.72);
  font-weight: 300;
  font-style: italic;
  flex: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.testimonial-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  flex-shrink: 0;
}
.testimonial-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}
.testimonial-role {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 300;
}

/* Flèches */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.25s ease, transform 0.25s ease;
  z-index: 2;
}
.carousel-arrow:hover {
  color: #7AD3FF;
  transform: translateY(-50%) scale(1.08);
}

.arrow-left {
  left: -60px;
}
.arrow-right {
  right: -60px;
}

@media (max-width: 1080px) {
  .arrow-left { left: -48px; }
  .arrow-right { right: -48px; }
}
@media (max-width: 720px) {
  .arrow-left { left: -20px; }
  .arrow-right { right: -20px; }
  .testimonial-card { padding: 1.75rem 1.25rem; }
}

/* Dots */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}
.carousel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  transition: background 0.3s ease, transform 0.3s ease;
  padding: 0;
}
.carousel-dot.dot-active {
  background: #7AD3FF;
  transform: scale(1.3);
}
</style>
