<template>
  <div class="mobile-menu-wrap">
    <!-- Radial menu items, each with its own explicit angle -->
    <a
      v-for="item in navItems"
      :key="item.href"
      :href="item.href"
      class="radial-item glass-liquid"
      :class="{ 'item-open': isOpen }"
      :style="getItemStyle(item)"
      :aria-label="item.label"
      @click.prevent="navigate(item.href)"
    >
      <component :is="item.icon" :size="18" weight="light" />
    </a>

    <!-- Toggle button -->
    <button
      class="mobile-menu-btn glass-liquid"
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
import {
  PhHouseSimple,
  PhUser,
  PhBuildings,
  PhBooks,
  PhStar,
  PhArrowRight,
} from '@phosphor-icons/vue'

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
  { href: '#hero',         angle: 0,   icon: PhHouseSimple, label: 'Accueil' },
  { href: '#protagonist',  angle: 18,  icon: PhUser,        label: 'Protagoniste' },
  { href: '#empire',       angle: 36,  icon: PhBuildings,   label: 'Empire' },
  { href: '#books',        angle: 54,  icon: PhBooks,       label: 'Livres' },
  { href: '#testimonials', angle: 72,  icon: PhStar,        label: 'Témoignages' },
  { href: '#footer',       angle: 90,  icon: PhArrowRight,  label: 'Contact' },
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

.mobile-menu-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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

/* Radial items — positioned absolutely; placement via CSS variables --target-x / --target-y */
.radial-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 44px;
  height: 44px;
  margin: 4px;   /* centers the 44px item within the 52px button area */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  z-index: 1;
  /* Closed: stacked behind the button, invisible */
  transform: translate(0, 0) scale(0);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) var(--item-delay, 0s),
    opacity 0.3s ease var(--item-delay, 0s),
    background 0.3s ease,
    border-color 0.3s ease;
}

.radial-item.item-open {
  transform: translate(var(--target-x), var(--target-y)) scale(1);
  opacity: 1;
  pointer-events: auto;
}

.radial-item:hover {
  color: #7AD3FF;
  border-color: rgba(122, 211, 255, 0.35);
}
</style>
