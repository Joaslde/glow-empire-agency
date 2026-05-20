<template>
  <div
    ref="layerRef"
    class="diamond-layer"
    :class="{ 'is-sticky': isSticky, 'is-hidden': hideForFooter }"
    :style="{
      '--diamond-y': diamondY + 'px',
      '--diamond-size': diamondSize + 'px',
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

        <!-- HDRI environment — provides the reflections crystal/transmission materials need to look luminous.
             Without this, the diamond renders pitch black. -->
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
const diamondY = ref(9999)
const diamondSize = ref(180)

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

const STICKY_TOP_PX = 24
const SIZE_FLOATING = 200    // Bigger at the boundary
const SIZE_STICKY = 92       // Compact when locked at top

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function updatePosition() {
  scrollY = window.scrollY
  const heroEl = document.querySelector('#hero')
  if (!heroEl) return
  const heroH = heroEl.offsetHeight
  const halfFloating = SIZE_FLOATING / 2

  const boundaryFromTop = heroH - scrollY

  if (boundaryFromTop > STICKY_TOP_PX + halfFloating) {
    isSticky.value = false
    diamondY.value = boundaryFromTop - halfFloating
    diamondSize.value = SIZE_FLOATING
  } else {
    isSticky.value = true
    diamondY.value = STICKY_TOP_PX
    diamondSize.value = SIZE_STICKY
  }

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

  // Slow continuous Y rotation
  const baseRot = time * 0.00035
  // Subtle scroll-reactive boost
  const scrollRot = scrollY * 0.0009
  model.rotation.y = baseRot + scrollRot
  // Tiny floating bob on X axis (suggests floating)
  model.rotation.x = Math.sin(time * 0.0004) * 0.04
  // Faint Z tilt
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
   Diamond starts at boundary (heroH - scrollY) and locks at top when scrolled past. */
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
  transition: top 0s linear;
}

.diamond-layer.is-hidden {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
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
  width: var(--diamond-size, 200px);
  height: var(--diamond-size, 200px);
  pointer-events: auto;
  transition:
    width 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.diamond-canvas {
  width: 100% !important;
  height: 100% !important;
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
  z-index: -1;
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
  z-index: -2;
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
</style>
