<template>
  <div
    ref="layerRef"
    class="diamond-layer"
    :class="{ 'is-sticky': isSticky, 'is-hidden': hideForFooter, 'is-mobile': isMobile }"
    :style="{
      '--diamond-y': diamondY + 'px',
      '--diamond-size': diamondSize + 'px',
      '--diamond-opacity': diamondOpacity,
    }"
  >
    <!-- Left nav (desktop, only when sticky) -->
    <nav class="nav-side nav-left">
      <a
        v-for="link in leftLinks"
        :key="link.href"
        :href="link.href"
        class="nav-link"
        @click.prevent="scrollTo(link.href)"
      >
        <span class="nav-dash" />
        <span>{{ link.label }}</span>
      </a>
    </nav>

    <!-- Diamond orb (centered horizontally) -->
    <div class="diamond-orb">
      <TresCanvas
        :alpha="true"
        :antialias="true"
        :clear-color="'#00000000'"
        :tone-mapping="ACESFilmicToneMapping"
        :tone-mapping-exposure="1.3"
        :output-color-space="SRGBColorSpace"
        class="diamond-canvas"
      >
        <TresPerspectiveCamera :position="[0, 0, 4]" :fov="38" />

        <!-- HDRI environment — provides the reflections crystal/transmission materials need to look luminous. -->
        <Environment preset="studio" :background="false" :environment-intensity="1.2" />

        <!-- Soft abyssal blue ambient on top of env -->
        <TresAmbientLight :intensity="0.25" color="#0E3975" />

        <!-- Cyan rim from left for blue mood -->
        <TresPointLight :position="[-4, 2, 3]" :intensity="2.4" color="#7AD3FF" :distance="10" />

        <!-- Deep blue under-glow -->
        <TresPointLight :position="[0, -3, 2]" :intensity="1.8" color="#00A3FF" :distance="9" />

        <!-- Soft back light for inner luminosity -->
        <TresPointLight :position="[0, 0, -3]" :intensity="1.4" color="#1D74E8" :distance="6" />

        <!-- The loaded GLB diamond -->
        <DiamondModel ref="diamondCompRef" />
      </TresCanvas>

      <!-- Halo glow behind diamond -->
      <div class="diamond-halo" />
      <div class="diamond-halo-outer" />

      <!-- Decorative arc BEHIND diamond — true semi-circle (SVG arc command),
           gives a smooth rounded U-shape (not a pointed V).
           Peak sits at ~30% of orb height (= 70% up the diamond), endpoints stop above bottom. -->
      <svg
        class="diamond-arc"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          class="diamond-arc-path"
          d="M 0 50 A 50 50 0 0 1 100 50"
          fill="none"
        />
      </svg>

      <!-- Brand text — anchored to the ORB so it stays centered on the diamond
           even when the layer expands sideways with desktop nav links. -->
      <div class="diamond-brand-text" aria-hidden="true">Glow Empire</div>
    </div>

    <!-- Right nav (desktop, only when sticky) -->
    <nav class="nav-side nav-right">
      <a
        v-for="link in rightLinks"
        :key="link.href"
        :href="link.href"
        class="nav-link"
        @click.prevent="scrollTo(link.href)"
      >
        <span>{{ link.label }}</span>
        <span class="nav-dash" />
      </a>
      <button class="nav-cta" @click="scrollTo('#footer')">
        Commencer
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Environment } from '@tresjs/cientos'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import DiamondModel from './DiamondModel.vue'

const layerRef = ref(null)
const diamondCompRef = ref(null)
const isSticky = ref(false)
const hideForFooter = ref(false)
const isMobile = ref(false)
const diamondY = ref(9999)
const diamondSize = ref(140)
const diamondOpacity = ref(0)

let scrollY = 0
let animFrameId = null

const leftLinks = [
  { href: '#protagonist', label: 'Protagoniste' },
  { href: '#empire',      label: "L'Empire" },
  { href: '#books',       label: 'Livres' },
]
const rightLinks = [
  { href: '#testimonials', label: 'Témoignages' },
  { href: '#footer',       label: 'Contact' },
]

// Per-viewport sizing
function getMetrics() {
  const mobile = window.innerWidth < 768
  return {
    mobile,
    stickyTop: mobile ? 2 : 22,
    sizeFloating: mobile ? 118 : 160,
    sizeSticky: mobile ? 54 : 78,
  }
}

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function updatePosition() {
  scrollY = window.scrollY
  const heroEl = document.querySelector('#hero')
  if (!heroEl) return
  const heroH = heroEl.offsetHeight

  const { mobile, stickyTop, sizeFloating, sizeSticky } = getMetrics()
  isMobile.value = mobile
  const halfFloating = sizeFloating / 2

  const boundaryFromTop = heroH - scrollY

  if (boundaryFromTop > stickyTop + halfFloating) {
    isSticky.value = false
    diamondY.value = boundaryFromTop - halfFloating
    diamondSize.value = sizeFloating
  } else {
    isSticky.value = true
    diamondY.value = stickyTop
    diamondSize.value = sizeSticky
  }

  // Fade-in : invisible at top of hero, fully visible by 90% of hero.
  // Prevents the diamond from peeking up from below the fold on first paint.
  const fadeStart = heroH * 0.55
  const fadeEnd = heroH * 0.92
  diamondOpacity.value = Math.max(0, Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart)))

  const footer = document.querySelector('#footer')
  if (footer) {
    const fRect = footer.getBoundingClientRect()
    hideForFooter.value = fRect.top < window.innerHeight * 0.4
  }
}

function animate(time) {
  animFrameId = requestAnimationFrame(animate)
  const comp = diamondCompRef.value
  const model = comp?.scene
  if (!model) return

  const baseRot = time * 0.00035
  const scrollRot = scrollY * 0.0009
  model.rotation.y = baseRot + scrollRot
  model.rotation.x = Math.sin(time * 0.0004) * 0.04
  model.rotation.z = Math.cos(time * 0.0003) * 0.02
}

onMounted(() => {
  window.addEventListener('scroll', updatePosition, { passive: true })
  window.addEventListener('resize', updatePosition)
  updatePosition()
  animFrameId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition)
  window.removeEventListener('resize', updatePosition)
  if (animFrameId) cancelAnimationFrame(animFrameId)
})
</script>

<style scoped>
/* Fixed layer, vertical position controlled by --diamond-y.
   Diamond fades in as the user scrolls into the hero/section-2 boundary. */
.diamond-layer {
  position: fixed;
  top: var(--diamond-y, 100vh);
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 2rem;
  pointer-events: none;
  width: max-content;
  opacity: var(--diamond-opacity, 0);
  transition: opacity 0.4s ease;
}

.diamond-layer.is-hidden {
  opacity: 0 !important;
  pointer-events: none;
}

/* === Lateral nav — only visible when sticky, desktop only === */
.nav-side {
  display: none;
  align-items: center;
  gap: 1.75rem;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
  pointer-events: none;
}

@media (min-width: 1024px) {
  .diamond-layer.is-sticky .nav-side {
    display: flex;
    opacity: 1;
    pointer-events: auto;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: rgba(255, 255, 255, 0.95);
}
.nav-dash {
  display: block;
  width: 16px;
  height: 1px;
  background: rgba(122, 211, 255, 0.4);
  transition: all 0.3s ease;
}
.nav-link:hover .nav-dash {
  width: 26px;
  background: rgba(122, 211, 255, 0.85);
}

.nav-cta {
  margin-left: 0.5rem;
  padding: 0.6rem 1.3rem;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 4px 16px rgba(0, 0, 0, 0.2);
}
.nav-cta:hover {
  background: rgba(122, 211, 255, 0.15);
  border-color: rgba(122, 211, 255, 0.5);
}

/* === Diamond orb === */
.diamond-orb {
  position: relative;
  flex-shrink: 0;
  width: var(--diamond-size, 140px);
  height: var(--diamond-size, 140px);
  pointer-events: auto;
  transition:
    width 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.diamond-canvas {
  width: 100% !important;
  height: 100% !important;
  position: relative;
  z-index: 2;
}

/* === Decorative arc BEHIND diamond ===
   - true semi-circle stretched into a tall rounded U
   - peak at orb 30% (= 70% up the diamond from bottom)
   - endpoints at orb 80% (raised — no longer touches bottom of orb)
   - width 75% of orb (≈ diamond visual width)
   - z-index 1 → behind transparent canvas (z-index 2) */
.diamond-arc {
  position: absolute;
  left: 12.5%;
  top: 30%;
  width: 75%;
  height: 50%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
  opacity: 0.85;
}
.diamond-arc-path {
  stroke: rgba(122, 211, 255, 0.75);
  stroke-width: 1.4;
  stroke-linecap: round;
  fill: none;
  filter: drop-shadow(0 0 6px rgba(122, 211, 255, 0.6));
  vector-effect: non-scaling-stroke;
}

/* Inner intense halo */
.diamond-halo {
  position: absolute;
  inset: -20%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 163, 255, 0.3) 0%,
    rgba(29, 116, 232, 0.12) 40%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
  animation: halo-pulse 3.4s ease-in-out infinite;
  filter: blur(10px);
}

/* Outer soft glow */
.diamond-halo-outer {
  position: absolute;
  inset: -60%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 82, 163, 0.18) 0%,
    transparent 60%
  );
  pointer-events: none;
  z-index: -1;
  filter: blur(24px);
  animation: halo-pulse 5s ease-in-out infinite reverse;
}

@keyframes halo-pulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.12); }
}

.diamond-layer.is-sticky .diamond-halo {
  inset: -10%;
  filter: blur(6px);
}
.diamond-layer.is-sticky .diamond-halo-outer {
  inset: -40%;
}

/* === Sticky brand text — anchored to the ORB, NOT the layer ===
   The layer is a flex row whose width on desktop includes the side nav,
   so `left:50%` on the layer is NOT the diamond's center. Anchoring to
   `.diamond-orb` keeps the text perfectly centered under the diamond on
   all screen sizes. */
.diamond-brand-text {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  margin-top: .1px;
  font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.92);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  text-shadow:
    0 0 14px rgba(122, 211, 255, 0.5),
    0 0 30px rgba(29, 116, 232, 0.3);
}

/* Show brand text in sticky state (mobile AND desktop) */
.diamond-layer.is-sticky .diamond-brand-text {
  opacity: 1;
}

/* Sticky state : arc proportions stay tied to the smaller diamond */
.diamond-layer.is-sticky .diamond-arc {
  opacity: 0.7;
}
</style>
