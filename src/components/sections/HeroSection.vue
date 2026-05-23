<template>
  <section ref="heroRef" class="hero-section">
    <!-- Video background -->
    <div class="hero-video-wrap">
      <video
        v-if="!isMobile"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        class="hero-video"
        src="/hero-desktop.mp4"
      />
      <video
        v-else
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        class="hero-video"
        src="/hero-mobile.mp4"
      />
      <!-- Light overlays — keep video luminosity visible -->
      <div class="hero-overlay-top" />
      <div class="hero-overlay-bottom" />
    </div>

    <!-- Content -->
    <div class="hero-content">
      <div class="hero-logo reveal-fade" style="transition-delay: 0.1s">
        <img src="/logo.jpg" alt="Glow Empire" />
      </div>

      <div class="hero-eyebrow reveal-fade" style="transition-delay: 0.2s">
        <span>Glow Empire</span>
      </div>

      <h1 class="hero-title reveal-up" style="transition-delay: 0.4s">
        <span class="hero-title-line">Construis</span>
        <span class="hero-title-line hero-title-accent">l'empire</span>
        <span class="hero-title-line">que tu mérites.</span>
      </h1>

      <p class="hero-subtitle reveal-up" style="transition-delay: 0.7s">
        Personal branding. Business coaching. Outils de croissance.<br class="hide-mobile" />
        Tout ce qu'il faut pour bâtir quelque chose de durable.
      </p>

      <!-- Single liquid glass CTA -->
      <div class="hero-cta-wrap reveal-up" style="transition-delay: 0.95s">
        <button class="hero-glass-btn">
          <span class="hero-glass-btn-inner">
            <span>Découvrir l'empire</span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const heroRef = ref(null)
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  setTimeout(() => {
    heroRef.value?.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => {
      el.classList.add('is-visible')
    })
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100svh;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
}

.hide-mobile {
  display: none;
}
@media (min-width: 768px) {
  .hide-mobile { display: block; }
}

/* Video */
.hero-video-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
}

/* Lighter overlays - keep video luminosity */
.hero-overlay-top {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 25%;
  background: linear-gradient(to bottom, rgba(1, 11, 25, 0.55) 0%, transparent 100%);
  z-index: 1;
}
.hero-overlay-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(1, 11, 25, 0.7) 0%, transparent 100%);
  z-index: 1;
}

/* Content */
.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1.5rem;
  max-width: 900px;
}

/* Logo (round, above title) */
.hero-logo {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(122, 211, 255, 0.3);
  box-shadow:
    0 0 32px rgba(122, 211, 255, 0.25),
    0 0 64px rgba(29, 116, 232, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}
.hero-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Eyebrow */
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2.25rem;
}

/* Title */
.hero-title {
  display: flex;
  flex-direction: column;
  font-size: clamp(3rem, 9vw, 7rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 1.75rem;
}
.hero-title-accent {
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 50%, #7AD3FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 0 40px rgba(0, 163, 255, 0.4));
}

/* Subtitle */
.hero-subtitle {
  font-size: clamp(0.95rem, 2.2vw, 1.15rem);
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  max-width: 540px;
  margin-bottom: 3rem;
  text-shadow: 0 2px 8px rgba(1, 11, 25, 0.5);
}

/* === LIQUID GLASS BUTTON === */
.hero-cta-wrap {
  display: flex;
  justify-content: center;
}

.hero-glass-btn {
  position: relative;
  padding: 1.1rem 2.4rem;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.02em;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.15);
}

/* Inner shine layer for the liquid glass effect */
.hero-glass-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.02) 40%,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.05) 80%,
    rgba(255, 255, 255, 0.15) 100%
  );
  pointer-events: none;
  opacity: 0.8;
}

.hero-glass-btn::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background: radial-gradient(
    ellipse at 30% 0%,
    rgba(255, 255, 255, 0.18) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.hero-glass-btn-inner {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
}

.hero-glass-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    0 12px 40px rgba(0, 0, 0, 0.2),
    0 0 60px rgba(122, 211, 255, 0.15);
}
.hero-glass-btn:active {
  transform: translateY(0);
}
</style>
