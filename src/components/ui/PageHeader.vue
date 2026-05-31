<template>
  <header class="page-header" :class="{ 'header-scrolled': scrolled }">
    <div class="page-header-inner">
      <RouterLink to="/" class="header-logo">
        <img src="/logo.jpg" alt="Glow Empire" class="header-logo-img" />
        <span class="header-logo-name">Glow Empire</span>
      </RouterLink>

      <nav class="header-nav">
        <RouterLink to="/#protagonist" class="header-nav-link" @click.native="scrollToSection('#protagonist')">L'homme</RouterLink>
        <RouterLink to="/#empire" class="header-nav-link" @click.native="scrollToSection('#empire')">L'empire</RouterLink>
        <RouterLink to="/#books" class="header-nav-link" @click.native="scrollToSection('#books')">Livres</RouterLink>
        <RouterLink to="/#testimonials" class="header-nav-link" @click.native="scrollToSection('#testimonials')">Témoignages</RouterLink>
      </nav>

      <RouterLink to="/#books" class="header-cta glass-cta">
        <span>Découvrir les livres</span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 80;
  padding: 1.25rem 1.5rem;
  transition: background 0.4s ease, backdrop-filter 0.4s ease, padding 0.4s ease;
}

.page-header.header-scrolled {
  background: rgba(1, 11, 25, 0.75);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(122, 211, 255, 0.08);
  padding: 0.9rem 1.5rem;
}

.page-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  flex-shrink: 0;
}
.header-logo-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(122, 211, 255, 0.2);
}
.header-logo-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.header-nav {
  display: none;
  align-items: center;
  gap: 2rem;
  margin-left: auto;
}
@media (min-width: 768px) {
  .header-nav { display: flex; }
}

.header-nav-link {
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.25s ease;
}
.header-nav-link:hover {
  color: rgba(255,255,255,0.9);
}

.header-cta {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.3rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  letter-spacing: 0.03em;
  white-space: nowrap;
}
@media (min-width: 768px) {
  .header-cta { margin-left: 0; }
}
</style>
