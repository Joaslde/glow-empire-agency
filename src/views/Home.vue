<template>
  <div id="app-root">
    <PersistentDiamondNav />
    <HeroSection id="hero" />
    <div class="stack-container">
      <ProtagonistSection class="stack-section" style="--z: 2; --next-bg: #010B19;" />
      <EmpireSection class="stack-section" style="--z: 3;" />
      <BooksSection class="stack-section" style="--z: 4;" />
      <TestimonialsSection class="stack-section" style="--z: 5;" />
    </div>
    <FooterSection id="footer" />
    <MobileMenu />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useLenis } from '@/composables/useLenis'
import { useScrollReveal } from '@/composables/useScrollReveal'

import HeroSection from '@/components/sections/HeroSection.vue'
import PersistentDiamondNav from '@/components/ui/PersistentDiamondNav.vue'
import ProtagonistSection from '@/components/sections/ProtagonistSection.vue'
import EmpireSection from '@/components/sections/EmpireSection.vue'
import BooksSection from '@/components/sections/BooksSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import FooterSection from '@/components/sections/FooterSection.vue'
import MobileMenu from '@/components/ui/MobileMenu.vue'

const lenis = useLenis()
const scrollReveal = useScrollReveal()

onMounted(() => {
  lenis.init()
  setTimeout(() => scrollReveal.init(), 200)
})

onUnmounted(() => {
  lenis.destroy()
  scrollReveal.destroy()
})
</script>

<style>
#app-root {
  position: relative;
  overflow-x: hidden;
  background: #010B19;
}

.stack-container {
  position: relative;
  z-index: 2;
}

.stack-section {
  position: sticky;
  top: 0;
  min-height: 100vh;
  z-index: var(--z, 1);
  border-radius: 2.5rem 2.5rem 0 0;
  overflow: hidden;
  box-shadow:
    0 -32px 80px -20px rgba(0, 0, 0, 0.55),
    0 -1px 0 rgba(122, 211, 255, 0.15);
}

#footer {
  position: relative;
  z-index: 6;
  border-radius: 2.5rem 2.5rem 0 0;
  overflow: hidden;
  box-shadow:
    0 -32px 80px -20px rgba(0, 0, 0, 0.55),
    0 -1px 0 rgba(122, 211, 255, 0.15);
}
</style>
