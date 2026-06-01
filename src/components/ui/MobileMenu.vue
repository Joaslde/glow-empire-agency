<template>
  <div class="mobile-menu-wrap">
    <!-- Radial menu items, each with its own explicit angle -->
    <a
      v-for="item in navItems"
      :key="item.href"
      :href="item.href"
      class="radial-item"
      :class="{ 'item-open': isOpen }"
      :style="getItemStyle(item)"
      :aria-label="item.label"
      @click.prevent="navigate(item.href)"
    >
      <component :is="item.icon" :size="16" weight="light" class="radial-item-icon" />
      <span class="radial-item-label">{{ item.label }}</span>
    </a>

    <!-- Toggle button — same liquid-glass style as the hero CTA -->
    <button
      class="mobile-menu-btn"
      :class="{ 'btn-open': isOpen }"
      @click="toggle"
      aria-label="Menu"
    >
      <span class="btn-line btn-line-1" />
      <span class="btn-line btn-line-2" />
      <span class="btn-line btn-line-3" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  PhHouseSimple,
  PhUser,
  PhBuildings,
  PhBooks,
  PhStar,
  PhArrowRight,
} from '@phosphor-icons/vue'

// staticMode = pages intérieures : les liens renvoient vers la home + ancre.
const props = defineProps({
  staticMode: { type: Boolean, default: false },
})

const router = useRouter()
const isOpen = ref(false)

/**
 * Angle convention :
 *   0°  = item directement AU-DESSUS du bouton
 *   90° = item directement À GAUCHE du bouton
 *   Linéaire entre les deux.
 *
 * Modifie librement `angle` pour chaque icône — c'est l'angle individuel.
 * `radius` (en px) contrôle la distance depuis le bouton.
 */
const RADIUS = 105

const navItems = [
  { href: '#hero',         angle: -10,   icon: PhHouseSimple, label: 'Accueil' },
  { href: '#protagonist',  angle: 18,  icon: PhUser,        label: 'L\'homme' },
  { href: '#empire',       angle: 47,  icon: PhBuildings,   label: 'Empire' },
  { href: '#books',        angle: 74,  icon: PhBooks,       label: 'Livres' },
  { href: '#testimonials', angle: 102,  icon: PhStar,        label: 'Impact' },
]

function getItemStyle(item) {
  const rad = (item.angle * Math.PI) / 180
  // X negative = move LEFT from button. Y negative = move UP from button.
  const x = -Math.sin(rad) * RADIUS
  const y = -Math.cos(rad) * RADIUS

  return {
    '--target-x': `${x}px`,
    '--target-y': `${y}px`,
    '--item-delay': `${(item.angle / 90) * 0.08}s`,
  }
}

function toggle() {
  isOpen.value = !isOpen.value
}

function navigate(href) {
  isOpen.value = false
  if (props.staticMode) {
    router.push('/' + href)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 350)
    return
  }
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.mobile-menu-wrap {
  position: fixed;
  bottom: 1.75rem;
  right: 1.75rem;
  z-index: 100;
  width: 52px;
  height: 52px;
}

@media (min-width: 1024px) {
  .mobile-menu-wrap {
    display: none;
  }
}

/* Glassmorphism button — same attributes as the hero CTA (rgba white tint, blur+saturate, inset hi-light, soft shadow) */
.mobile-menu-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  /* Fond de base dense (fallback si backdrop-filter ignoré en prod) */
  background: rgba(8, 28, 56, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.15);
}

/* Liquid sheen layers — identical to hero-glass-btn ::before / ::after */
.mobile-menu-btn::before {
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
.mobile-menu-btn::after {
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

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    0 12px 40px rgba(0, 0, 0, 0.2),
    0 0 60px rgba(122, 211, 255, 0.15);
}

/* Burger lines must sit ABOVE the sheen pseudo-elements */
.btn-line {
  position: relative;
  z-index: 1;
}

.btn-line {
  display: block;
  width: 18px;
  height: 1px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.btn-open .btn-line-1 {
  transform: translateY(6px) rotate(45deg);
}
.btn-open .btn-line-2 {
  opacity: 0;
  transform: scaleX(0);
}
.btn-open .btn-line-3 {
  transform: translateY(-6px) rotate(-45deg);
}

/* Radial items — same hero-style liquid glass as the toggle button.
   Placement via CSS variables --target-x / --target-y. */
.radial-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 47px;
  height: 47px;
  margin: 2.5px;   /* centers the 47px item within the 52px button area */
  border-radius: 50%;
  /* Fond de base dense (fallback si backdrop-filter ignoré en prod) */
  background: rgba(8, 28, 56, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05),
    0 6px 22px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  overflow: hidden;
  z-index: 1;
  /* Closed: stacked behind the button, invisible */
  transform: translate(0, 0) scale(0);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) var(--item-delay, 0s),
    opacity 0.3s ease var(--item-delay, 0s),
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    color 0.3s ease;
}

/* Liquid sheen — identical structure to the toggle button */
.radial-item::before {
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
.radial-item::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background: radial-gradient(
    ellipse at 30% 0%,
    rgba(255, 255, 255, 0.18) 0%,
    transparent 30%
  );
  pointer-events: none;
}

/* Icon must sit above the sheen pseudo-elements — légèrement remontée */
.radial-item-icon {
  position: relative;
  z-index: 1;
  margin-top: -1px;
}

/* Petit label à l'intérieur de la boule, sous l'icône */
.radial-item-label {
  position: relative;
  z-index: 1;
  font-size: 0.40rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.8);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease var(--item-delay, 0s);
}
.radial-item.item-open .radial-item-label {
  opacity: 1;
}
.radial-item:hover .radial-item-label {
  color: #7AD3FF;
}

.radial-item.item-open {
  transform: translate(var(--target-x), var(--target-y)) scale(1);
  opacity: 1;
  pointer-events: auto;
}

.radial-item:hover {
  background: rgba(20, 50, 92, 0.78);
  border-color: rgba(122, 211, 255, 0.4);
  color: #7AD3FF;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    0 10px 28px rgba(0, 0, 0, 0.22),
    0 0 40px rgba(122, 211, 255, 0.18);
}

/* Quand le flou est réellement supporté ET appliqué, on allège le fond
   pour retrouver le vrai verre dépoli translucide. Sinon, le fond dense
   ci-dessus reste (évite la transparence excessive observée en prod). */
@supports ((backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))) {
  .mobile-menu-btn,
  .radial-item {
    background: rgba(12, 36, 68, 0.42);
  }
  .mobile-menu-btn:hover,
  .radial-item:hover {
    background: rgba(20, 50, 92, 0.5);
  }
}
</style>
