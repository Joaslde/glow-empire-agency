<template>
  <footer id="footer" class="footer-section">
    <!-- Video background — desktop / mobile variants -->
    <div class="footer-video-wrap">
      <video
        v-if="!isMobile"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        class="footer-video"
        src="/footer-vid.mp4"
      />
      <video
        v-else
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        class="footer-video"
        src="/footer-mobile-vid.mp4"
      />
      <div class="footer-video-overlay" />
    </div>

    <div class="footer-container">
      <!-- Top: Statement -->
      <div class="footer-statement">
        <div class="footer-logo-img">
          <img src="/logo.jpg" alt="Glow Empire" />
        </div>
        <h2 class="footer-headline reveal-up">
          L'empire<br />
          <span class="footer-headline-accent">commence ici.</span>
        </h2>
        <p class="footer-tagline reveal-up" style="transition-delay:0.2s">
          Rejoins des milliers d'entrepreneurs qui construisent quelque chose de réel.
        </p>
        <div class="footer-cta-wrap reveal-up" style="transition-delay:0.35s">
          <button class="glass-cta footer-cta-btn" @click="scrollTo('#books')">
            <span>Découvrir les livres</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Divider -->
      <div class="footer-divider">
        <div class="gradient-line" />
      </div>

      <!-- Links grid -->
      <div class="footer-links-grid reveal-up" style="transition-delay:0.1s">
        <div class="footer-brand-col">
          <div class="footer-logo">
            <span class="footer-logo-diamond">◆</span>
            <span>Glow Empire</span>
          </div>
          <p class="footer-brand-desc">
            Personal branding, business coaching, et outils de croissance pour entrepreneurs ambitieux.
          </p>
          <div class="footer-socials">
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" class="footer-social-btn glass-liquid" :aria-label="s.label">
              <component :is="s.icon" :size="16" weight="light" />
            </a>
          </div>
        </div>

        <div v-for="col in linkCols" :key="col.title" class="footer-link-col">
          <h4 class="footer-col-title">{{ col.title }}</h4>
          <ul class="footer-link-list">
            <li v-for="link in col.links" :key="link.label">
              <RouterLink v-if="link.route" :to="link.route" class="footer-link">{{ link.label }}</RouterLink>
              <a v-else-if="link.hash" href="#" class="footer-link" @click.prevent="scrollTo(link.hash)">{{ link.label }}</a>
              <span v-else-if="!link.href" class="footer-link footer-link-static">{{ link.label }}</span>
              <a
                v-else
                :href="link.href"
                class="footer-link"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener' : undefined"
              >{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <div class="gradient-line" />
        <div class="footer-bottom-content">
          <span class="footer-copyright">
            © {{ currentYear }} Glow Empire. Tous droits réservés.
          </span>
          <a href="https://joas-eight.vercel.app/" target="_blank" rel="noopener" class="footer-signature">
            <span class="footer-signature-label">Design &amp; code par</span>
            <span class="footer-signature-name">Joas Lde</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import {
  PhInstagramLogo,
  PhYoutubeLogo,
  PhLinkedinLogo,
} from '@phosphor-icons/vue'

const currentYear = computed(() => new Date().getFullYear())
const router = useRouter()

const isMobile = ref(false)
function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

function scrollTo(hash) {
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    })
  } else {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

const socials = [
  { label: 'Instagram', icon: PhInstagramLogo, href: 'https://instagram.com' },
  { label: 'YouTube', icon: PhYoutubeLogo, href: 'https://youtube.com' },
  { label: 'LinkedIn', icon: PhLinkedinLogo, href: 'https://linkedin.com' },
]

const linkCols = [
  {
    title: 'L\'empire',
    links: [
      { label: 'Riquier Soussia', route: '/protagoniste' },
      { label: 'Glow Empire', route: '/empire' },
      { label: 'Témoignages', hash: '#testimonials' },
    ],
  },
  {
    title: 'Les livres',
    links: [
      { label: 'Prise de parole en public', hash: '#books' },
      { label: 'Leadership féminin', hash: '#books' },
      { label: 'Pourquoi un homme', hash: '#books' },
      { label: 'Mes achats', route: '/my-purchases' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'support@glow-empire-agency.com', href: 'mailto:support@glow-empire-agency.com' },
      { label: '+229 01 98 52 38 70', href: 'tel:+2290198523870' },
      { label: 'Devis sur WhatsApp', href: 'https://wa.me/2290198523870', external: true },
      { label: 'Zopha', href: null },
    ],
  },
]
</script>

<style scoped>
.footer-section {
  position: relative;
  background: #010B19;
  overflow: hidden;
  padding: 0;
}

/* Video */
.footer-video-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.footer-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}
.footer-video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(1, 11, 25, 0.8) 0%,
    rgba(1, 11, 25, 0.35) 25%,
    rgba(1, 11, 25, 0.35) 75%,
    rgba(1, 11, 25, 0.85) 100%
  );
}

.footer-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 7rem 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* Statement */
.footer-statement {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.footer-logo-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.25);
  box-shadow:
    0 0 24px rgba(122, 211, 255, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
.footer-logo-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.footer-headline {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #ffffff;
}
.footer-headline-accent {
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 50%, #7AD3FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 0 40px rgba(0, 163, 255, 0.3));
}

.footer-tagline {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.4);
  max-width: 440px;
  font-weight: 300;
}

.footer-cta-wrap {
  display: flex;
  justify-content: center;
}
.footer-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.8rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  letter-spacing: 0.02em;
}

/* Divider */
.footer-divider {
  display: flex;
  justify-content: center;
}
.gradient-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(122, 211, 255, 0.2), transparent);
}

/* Links grid */
.footer-links-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 640px) {
  .footer-links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-links-grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

/* Brand col */
.footer-brand-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.02em;
}
.footer-logo-diamond {
  color: #7AD3FF;
  font-size: 0.7rem;
  filter: drop-shadow(0 0 6px rgba(122, 211, 255, 0.5));
}

.footer-brand-desc {
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 300;
  max-width: 280px;
}

.footer-socials {
  display: flex;
  gap: 0.5rem;
}
.footer-social-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
}
.footer-social-btn:hover {
  color: #7AD3FF;
  transform: translateY(-2px);
}

/* Link cols */
.footer-link-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.footer-col-title {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}
.footer-link-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.footer-link {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-weight: 300;
  transition: color 0.25s ease;
}
.footer-link:hover {
  color: rgba(255, 255, 255, 0.85);
}
.footer-link-static {
  cursor: default;
}

/* Bottom bar */
.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.footer-bottom-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .footer-bottom-content {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.footer-copyright {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.25);
  font-weight: 300;
}

.footer-signature {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.6rem 1.1rem;
  border-radius: 100px;
  text-decoration: none;
  border: 1px solid rgba(122, 211, 255, 0.25);
  background: rgba(122, 211, 255, 0.06);
  transition: all 0.3s ease;
}
.footer-signature:hover {
  border-color: rgba(122, 211, 255, 0.5);
  background: rgba(122, 211, 255, 0.12);
  transform: translateY(-1px);
}
.footer-signature-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 300;
}
.footer-signature-name {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: #7AD3FF;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(122, 211, 255, 0.4);
}
.footer-signature:hover .footer-signature-name {
  text-decoration-color: #7AD3FF;
}
</style>
