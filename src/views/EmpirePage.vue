<template>
  <div class="detail-page">
    <!-- Même nav diamant que la landing (mode page intérieure) -->
    <PersistentDiamondNav static-mode />
    <MobileMenu static-mode />

    <main class="detail-main">

      <!-- HERO -->
      <section class="epage-hero">
        <div class="epage-hero-bg">
          <div class="epage-hero-grid" />
          <div class="epage-hero-glow" />
        </div>
        <div class="epage-hero-inner">
          <div class="section-label">
            <span class="section-label-line" />
            <span>L'empire</span>
          </div>
          <h1 class="epage-hero-title">
            Glow Empire —<br />
            <span class="epage-hero-accent">L'agence qui forme, connecte et valorise.</span>
          </h1>
          <p class="epage-hero-sub">
            Une agence spécialisée en communication, formation, digital, leadership et événementiel.
            Un écosystème de croissance, d'innovation et d'excellence au service de l'impact.
          </p>
        </div>
      </section>

      <!-- CONTENU -->
      <section class="epage-body">
        <div class="epage-body-inner">

          <!-- Manifeste : texte + image -->
          <div class="epage-block">
            <div class="epage-block-text">
              <h2 class="epage-section-title">Une mission claire. Un impact durable.</h2>
              <p class="epage-para">
                À travers ses différents départements, Glow Empire accompagne
                <strong>les entreprises, les institutions, les entrepreneurs et les talents</strong>
                dans le développement de leur image, de leurs compétences et de leur influence.
              </p>
              <p class="epage-para">
                Notre mission : <strong>former, connecter, valoriser et accompagner</strong>
                les leaders d'aujourd'hui et de demain, en leur offrant des solutions innovantes
                et adaptées à leurs besoins.
              </p>
              <p class="epage-para">
                Glow Empire, c'est un écosystème de croissance, d'innovation et d'excellence
                au service de l'impact.
              </p>
            </div>
            <div class="epage-block-img-wrap">
              <img src="/glow-empire1.jpeg" alt="Glow Empire — agence" class="epage-block-img" loading="lazy" />
              <div class="epage-block-img-overlay" />
            </div>
          </div>

          <!-- Départements -->
          <div class="epage-depts-block">
            <div class="epage-depts-head">
              <h2 class="epage-section-title">Nos départements</h2>
              <p class="epage-para epage-para-max">
                Cinq pôles d'expertise complémentaires, réunis sous une même exigence d'excellence.
              </p>
            </div>
            <div class="epage-depts-grid">
              <div
                v-for="d in departements"
                :key="d.nom"
                class="epage-dept"
                :class="{ 'epage-dept-feature': d.feature }"
              >
                <div class="epage-dept-top">
                  <span class="epage-dept-emoji">{{ d.emoji }}</span>
                  <span v-if="d.feature" class="epage-dept-badge">Phare</span>
                </div>
                <h4 class="epage-dept-nom">{{ d.nom }}</h4>
                <p class="epage-dept-tagline">{{ d.tagline }}</p>
                <ul class="epage-dept-list">
                  <li v-for="s in d.services" :key="s">{{ s }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Image + conférence (image + texte empilés, responsive) -->
          <div class="epage-feature">
            <div class="epage-feature-img-wrap">
              <img src="/conference-des-femmes.png" alt="Conférence des Femmes Leaders du Bénin" class="epage-feature-img" loading="lazy" />
              <div class="epage-feature-overlay" />
            </div>
            <div class="epage-feature-caption">
              <div class="section-label">
                <span class="section-label-line" />
                <span>Événement phare</span>
              </div>
              <h3 class="epage-feature-title">La Conférence des Femmes Leaders du Bénin</h3>
              <p class="epage-feature-desc">
                Un rendez-vous incontournable du leadership féminin en Afrique de l'Ouest,
                qui vise à renforcer l'entrepreneuriat, la confiance en soi et la visibilité
                des femmes dans les sphères de décision.
              </p>
              <RouterLink to="/conference-femmes-leaders" class="epage-feature-cta">
                Voir le rapport complet
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </RouterLink>
            </div>
          </div>

          <!-- Qui nous accompagnons -->
          <div class="epage-public">
            <h2 class="epage-section-title">Nous accompagnons</h2>
            <div class="epage-public-grid">
              <div v-for="p in publics" :key="p" class="epage-public-item">
                <span class="epage-public-dot" />
                <span>{{ p }}</span>
              </div>
            </div>
          </div>

          <!-- Citation -->
          <div class="epage-quote-wrap">
            <div class="epage-quote-line" />
            <blockquote class="epage-quote">
              "Nous ne créons pas seulement des projets.<br />
              Nous bâtissons des identités fortes, des leaders capables<br />
              d'inspirer leur génération et des marques qui durent."
            </blockquote>
            <div class="epage-quote-line" />
          </div>

          <!-- Bloc contact / devis -->
          <div class="epage-contact">
            <div class="epage-contact-head">
              <div class="section-label">
                <span class="section-label-line" />
                <span>Travaillons ensemble</span>
              </div>
              <h2 class="epage-section-title">Un projet ? Parlons-en.</h2>
              <p class="epage-para epage-para-max">
                Demandez votre devis ou contactez-nous directement.
                Notre équipe revient vers vous rapidement pour construire la solution adaptée à votre besoin.
              </p>
            </div>

            <a :href="whatsappLink" target="_blank" rel="noopener" class="glass-cta epage-contact-cta">
              <span>Demander un devis sur WhatsApp</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>

            <div class="epage-contact-grid">
              <a :href="`tel:${phoneRaw}`" class="epage-contact-item">
                <span class="epage-contact-label">Téléphone & WhatsApp</span>
                <span class="epage-contact-value">{{ phoneDisplay }}</span>
              </a>
              <a :href="`mailto:${email}`" class="epage-contact-item">
                <span class="epage-contact-label">Email</span>
                <span class="epage-contact-value">{{ email }}</span>
              </a>
              <div class="epage-contact-item">
                <span class="epage-contact-label">Adresse</span>
                <span class="epage-contact-value">Zopha</span>
              </div>
              <div class="epage-contact-item">
                <span class="epage-contact-label">Réseaux</span>
                <span class="epage-contact-socials">
                  <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" class="epage-contact-social">{{ s.label }}</a>
                </span>
              </div>
            </div>
          </div>

          <!-- Liens secondaires -->
          <div class="epage-cta-wrap">
            <RouterLink to="/#books" class="epage-link-secondary" @click="scrollToBooks">
              Découvrir les livres
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
            <RouterLink to="/protagoniste" class="epage-link-secondary">
              Rencontrer Riquier Soussia
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
          </div>

        </div>
      </section>

    </main>

    <!-- Même footer que la landing -->
    <FooterSection />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useLenis } from '@/composables/useLenis'
import PersistentDiamondNav from '@/components/ui/PersistentDiamondNav.vue'
import MobileMenu from '@/components/ui/MobileMenu.vue'
import FooterSection from '@/components/sections/FooterSection.vue'

const scrollReveal = useScrollReveal()
const lenis = useLenis()
const router = useRouter()

onMounted(() => {
  lenis.init()
  setTimeout(() => scrollReveal.init(), 200)
  window.scrollTo(0, 0)
})
onUnmounted(() => {
  lenis.destroy()
  scrollReveal.destroy()
})

function scrollToBooks() {
  router.push('/').then(() => {
    setTimeout(() => {
      const el = document.querySelector('#books')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  })
}

// Coordonnées
const phoneRaw = '+2290198523879'
const phoneDisplay = '+229 01 98 52 38 79'
const email = 'contact@glow-empire-agency.com'
const whatsappLink = 'https://wa.me/2290198523879?text=' +
  encodeURIComponent('Bonjour Glow Empire, je souhaite demander un devis.')

const socials = [
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
]

const departements = [
  {
    emoji: '📣',
    nom: 'GLOW Communication & Influence',
    tagline: 'Communication, branding et influence digitale.',
    feature: true,
    services: [
      'Communication d\'entreprise, commerciale, événementielle et marketing stratégique',
      'Relations publiques, branding et storytelling',
      'Gestion de l\'image et influence digitale',
    ],
  },
  {
    emoji: '👗',
    nom: 'GLOW Aura',
    tagline: 'Hôtessariat & événementiel haut de gamme.',
    feature: true,
    services: [
      'Agence d\'hôtessariat et services événementiels haut de gamme',
      'Accueil VIP et accompagnement protocolaire',
      'Animation commerciale',
      'Modèles, shooting photo, défilés et représentation de marques',
    ],
  },
  {
    emoji: '🚀',
    nom: 'GLOW Summit',
    tagline: 'Leadership, business et networking.',
    feature: true,
    services: [
      'Conférences, masterclass et événements de networking',
      'Développement du leadership, du business et de l\'innovation',
      'Plateforme de visibilité pour talents, entreprises et partenaires',
    ],
  },
  {
    emoji: '🧠',
    nom: 'GLOW Educ',
    tagline: 'Coaching, leadership & personal branding.',
    feature: true,
    services: [
      'Programmes de formation pour entrepreneurs, jeunes diplômés, entreprises et ONG',
      'Coaching, leadership et développement personnel',
      'Personal branding et préparation des leaders de demain',
    ],
  },
  {
    emoji: '🎓',
    nom: 'GLOW Academy & Digital Hub',
    tagline: 'Formation digitale & solutions tech.',
    feature: false,
    services: [
      'Formation et transfert de compétences (digital, design, marketing, technologie)',
      'Création de contenu : vidéos, podcasts, community management',
      'Développement web, applications mobiles et stratégies digitales',
    ],
  },
]

const publics = [
  'Les jeunes en quête de direction et de méthode',
  'Les femmes ambitieuses qui veulent diriger avec impact',
  'Les entrepreneurs qui veulent scaler leur influence',
  'Les créateurs de contenu en recherche d\'identité forte',
  'Les professionnels qui souhaitent élever leur image',
  'Les porteurs de vision qui ont besoin de structure',
]
</script>

<style scoped>
.detail-page {
  background: #010B19;
  min-height: 100vh;
  color: #fff;
  overflow-x: hidden;
}

.detail-main {
  padding-top: 0;
}

/* === HERO === */
.epage-hero {
  position: relative;
  min-height: 75vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.epage-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.epage-hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(122,211,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(122,211,255,0.025) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 100%, black 0%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 100%, black 0%, transparent 80%);
}
.epage-hero-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 50% 80%, rgba(0,82,163,0.2) 0%, transparent 70%);
}

.epage-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12rem 1.5rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
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

.epage-hero-title {
  font-size: clamp(2rem, 5vw, 4.25rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #fff;
  max-width: 800px;
}
.epage-hero-accent {
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 100%);
  -webkit-background-clip: text;
  background-clip: text;
}
.epage-hero-sub {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.45);
  max-width: 600px;
  font-weight: 300;
}

/* === BODY === */
.epage-body {
  position: relative;
  z-index: 1;
}
.epage-body-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 7rem;
}

.epage-section-title {
  font-size: clamp(1.6rem, 3.5vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 1.25rem;
}

.epage-para {
  font-size: 1rem;
  line-height: 1.85;
  color: rgba(255,255,255,0.5);
  font-weight: 300;
  margin-bottom: 0.85rem;
}
.epage-para:last-child { margin-bottom: 0; }
.epage-para strong {
  color: rgba(255,255,255,0.82);
  font-weight: 500;
}
.epage-para-max { max-width: 640px; }

/* Blocs texte + image */
.epage-block {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 900px) {
  .epage-block {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
  .epage-block-reverse .epage-block-img-wrap {
    order: -1;
  }
}

.epage-block-text {
  display: flex;
  flex-direction: column;
}

.epage-block-img-wrap {
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.1);
  aspect-ratio: 4/5;
}
.epage-block-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.epage-block-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 65%, rgba(1,11,25,0.4) 100%);
}

/* Départements */
.epage-depts-block {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.epage-depts-head {
  display: flex;
  flex-direction: column;
}
.epage-depts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 700px) {
  .epage-depts-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .epage-depts-grid { grid-template-columns: repeat(3, 1fr); }
}

.epage-dept {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.75rem 1.6rem;
  border-radius: 1.1rem;
  border: 1px solid rgba(122, 211, 255, 0.1);
  background: rgba(2, 24, 51, 0.3);
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
}
.epage-dept:hover {
  border-color: rgba(122, 211, 255, 0.25);
  background: rgba(2, 24, 51, 0.5);
  transform: translateY(-3px);
}
.epage-dept-feature {
  border-color: rgba(122, 211, 255, 0.22);
  background: linear-gradient(160deg, rgba(13, 57, 117, 0.35) 0%, rgba(2, 24, 51, 0.4) 100%);
}

.epage-dept-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.epage-dept-emoji {
  font-size: 1.5rem;
  line-height: 1;
}
.epage-dept-badge {
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7AD3FF;
  padding: 0.25rem 0.6rem;
  border-radius: 100px;
  border: 1px solid rgba(122, 211, 255, 0.3);
  background: rgba(122, 211, 255, 0.06);
}
.epage-dept-nom {
  font-size: 1.05rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
  line-height: 1.25;
}
.epage-dept-tagline {
  font-size: 0.82rem;
  color: rgba(122, 211, 255, 0.7);
  font-weight: 400;
  margin-top: -0.35rem;
}
.epage-dept-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin: 0.25rem 0 0;
  padding: 0;
}
.epage-dept-list li {
  position: relative;
  padding-left: 1rem;
  font-size: 0.84rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
}
.epage-dept-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(122, 211, 255, 0.55);
}

/* Bloc feature (image + texte empilés, responsive) */
.epage-feature {
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.1);
  background: rgba(2, 24, 51, 0.35);
}
.epage-feature-img-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #021326;
}
.epage-feature-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}
.epage-feature-overlay {
  display: none;
}

/* Desktop : recadrage cinématique, plein cadre */
@media (min-width: 768px) {
  .epage-feature-img-wrap {
    aspect-ratio: 16/9;
    max-height: 420px;
  }
  .epage-feature-img {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .epage-feature-overlay {
    display: block;
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 45%, rgba(1,11,25,0.7) 100%);
  }
}
.epage-feature-caption {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1.75rem 2.25rem;
}
.epage-feature-title {
  font-size: clamp(1.2rem, 2.5vw, 1.7rem);
  font-weight: 600;
  color: #fff;
  line-height: 1.25;
  letter-spacing: -0.01em;
}
.epage-feature-desc {
  font-size: 0.95rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.55);
  font-weight: 300;
}
.epage-feature-cta {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #7AD3FF;
  text-decoration: none;
  transition: gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.epage-feature-cta svg {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.epage-feature-cta:hover svg {
  transform: translateX(3px);
}
@media (min-width: 768px) {
  .epage-feature-caption {
    padding: 2.5rem 3rem 2.75rem;
  }
}

/* Public -->  */
.epage-public {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}
.epage-public-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 640px) {
  .epage-public-grid { grid-template-columns: repeat(2, 1fr); }
}
.epage-public-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.97rem;
  color: rgba(255,255,255,0.6);
  font-weight: 300;
}
.epage-public-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(122,211,255,0.5);
  flex-shrink: 0;
}

/* Citation -->  */
.epage-quote-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  text-align: center;
}
.epage-quote-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(122,211,255,0.18), transparent);
}
.epage-quote {
  font-size: clamp(1rem, 2.2vw, 1.4rem);
  font-weight: 300;
  font-style: italic;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  letter-spacing: 0.01em;
  max-width: 680px;
}

/* Bloc contact / devis */
.epage-contact {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.75rem 1.75rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(122, 211, 255, 0.14);
  background:
    radial-gradient(ellipse 80% 100% at 50% 0%, rgba(13, 57, 117, 0.3) 0%, transparent 70%),
    rgba(2, 24, 51, 0.4);
}
@media (min-width: 768px) {
  .epage-contact {
    padding: 3.5rem 3rem;
  }
}
.epage-contact-head {
  display: flex;
  flex-direction: column;
}
.epage-contact-head .epage-section-title {
  margin-top: 1rem;
}
.epage-contact-cta {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 0.55rem;
  padding: 0.95rem 1.9rem;
  border-radius: 100px;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
}
.epage-contact-cta svg {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.epage-contact-cta:hover svg {
  transform: translateX(3px);
}
.epage-contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(122, 211, 255, 0.1);
}
@media (min-width: 560px) {
  .epage-contact-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .epage-contact-grid { grid-template-columns: repeat(4, 1fr); }
}
.epage-contact-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-decoration: none;
}
.epage-contact-label {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(122, 211, 255, 0.55);
}
.epage-contact-value {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
  overflow-wrap: anywhere;
  transition: color 0.25s ease;
}
a.epage-contact-item:hover .epage-contact-value {
  color: #7AD3FF;
}
.epage-contact-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.epage-contact-social {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.25s ease;
}
.epage-contact-social:hover {
  color: #7AD3FF;
}

/* CTA -->  */
.epage-cta-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding-bottom: 4rem;
}
@media (min-width: 480px) {
  .epage-cta-wrap { flex-direction: row; align-items: center; }
}
.epage-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.6rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  text-decoration: none;
}
.epage-link-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  font-weight: 300;
  transition: color 0.25s ease;
}
.epage-link-secondary:hover { color: rgba(255,255,255,0.75); }
</style>
