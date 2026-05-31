<template>
  <footer class="page-footer">
    <div class="page-footer-inner">
      <div class="pf-brand">
        <img src="/logo.jpg" alt="Glow Empire" class="pf-logo" />
        <span class="pf-name">Glow Empire</span>
      </div>

      <nav class="pf-nav">
        <RouterLink to="/#protagonist" class="pf-link">L'homme</RouterLink>
        <RouterLink to="/#empire" class="pf-link">L'empire</RouterLink>
        <RouterLink to="/#books" class="pf-link">Livres</RouterLink>
        <RouterLink to="/#testimonials" class="pf-link">Témoignages</RouterLink>
      </nav>

      <div class="pf-bottom">
        <div class="pf-line" />
        <div class="pf-row">
          <span class="pf-copy">© {{ year }} Glow Empire. Tous droits réservés.</span>
          <div class="pf-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="pf-social glass-liquid">
              <PhInstagramLogo :size="15" weight="light" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube" class="pf-social glass-liquid">
              <PhYoutubeLogo :size="15" weight="light" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" class="pf-social glass-liquid">
              <PhLinkedinLogo :size="15" weight="light" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { PhInstagramLogo, PhYoutubeLogo, PhLinkedinLogo } from '@phosphor-icons/vue'

const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.page-footer {
  background: #010B19;
  border-top: 1px solid rgba(122, 211, 255, 0.07);
  padding: 3rem 1.5rem;
  margin-top: 6rem;
}
.page-footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.pf-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.pf-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(122, 211, 255, 0.18);
}
.pf-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
}

.pf-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.pf-link {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.25s ease;
}
.pf-link:hover { color: rgba(255,255,255,0.8); }

.pf-bottom {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.pf-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(122,211,255,0.15), transparent);
}
.pf-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}
@media (min-width: 640px) {
  .pf-row {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.pf-copy {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.2);
}
.pf-socials {
  display: flex;
  gap: 0.5rem;
}
.pf-social {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: color 0.25s ease, transform 0.25s ease;
}
.pf-social:hover {
  color: #7AD3FF;
  transform: translateY(-2px);
}
</style>
