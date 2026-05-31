<template>
  <div class="detail-page">
    <!-- Même nav diamant que la landing -->
    <PersistentDiamondNav />

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
            <span class="epage-hero-accent">L'agence qui révèle, propulse et valorise.</span>
          </h1>
          <p class="epage-hero-sub">
            Née d'un profond désir d'impact et de transformation,
            Glow Empire est une agence dédiée à la révélation des potentiels,
            à la construction de l'image et à l'accompagnement des leaders de demain.
          </p>
        </div>
      </section>

      <!-- CONTENU -->
      <section class="epage-body">
        <div class="epage-body-inner">

          <!-- Manifeste : texte + image -->
          <div class="epage-block">
            <div class="epage-block-text">
              <h2 class="epage-section-title">Une vision. Un écosystème.</h2>
              <p class="epage-para">
                Dans un monde où beaucoup possèdent du talent sans véritable orientation,
                Glow Empire a choisi de créer un <strong>écosystème capable d'aider une génération entière</strong>
                à croire en sa valeur, développer son influence et marquer son époque.
              </p>
              <p class="epage-para">
                Nous croyons que chaque personne possède une lumière unique,
                capable d'impacter le monde lorsqu'elle est <strong>bien développée, bien encadrée et bien positionnée</strong>.
                Notre rôle est de créer les conditions pour que cette lumière devienne un rayonnement.
              </p>
            </div>
            <div class="epage-block-img-wrap">
              <img src="/protagoniste.jpeg" alt="Glow Empire — vision" class="epage-block-img" loading="lazy" />
              <div class="epage-block-img-overlay" />
            </div>
          </div>

          <!-- Valeurs : image + liste -->
          <div class="epage-block epage-block-reverse">
            <div class="epage-block-img-wrap">
              <img src="/protagoniste.jpeg" alt="Glow Empire — valeurs" class="epage-block-img" loading="lazy" />
              <div class="epage-block-img-overlay" />
            </div>
            <div class="epage-block-text">
              <h2 class="epage-section-title">Nos piliers fondamentaux</h2>
              <div class="epage-valeurs-list">
                <div v-for="v in valeurs" :key="v.titre" class="epage-valeur">
                  <div class="epage-valeur-header">
                    <span class="epage-valeur-num">{{ v.num }}</span>
                    <h4 class="epage-valeur-titre">{{ v.titre }}</h4>
                  </div>
                  <p class="epage-valeur-desc">{{ v.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Ce que nous construisons : pleine largeur puis liste -->
          <div class="epage-offres">
            <div class="epage-offres-header">
              <h2 class="epage-section-title">Ce que nous construisons</h2>
              <p class="epage-para epage-para-max">
                Glow Empire n'est pas seulement une maison d'édition ou un cabinet de coaching.
                C'est une infrastructure complète au service de l'excellence humaine.
              </p>
            </div>

            <div class="epage-offres-grid">
              <div v-for="offre in offres" :key="offre.titre" class="epage-offre-item">
                <div class="epage-offre-dot" />
                <div>
                  <h4 class="epage-offre-titre">{{ offre.titre }}</h4>
                  <p class="epage-offre-desc">{{ offre.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Image pleine largeur + conférence -->
          <div class="epage-block-full">
            <div class="epage-block-full-img-wrap">
              <img src="/protagoniste.jpeg" alt="Conférence des Femmes Leaders du Bénin" class="epage-block-full-img" loading="lazy" />
              <div class="epage-block-full-overlay" />
              <div class="epage-block-full-caption">
                <div class="section-label">
                  <span class="section-label-line" />
                  <span>Événement phare</span>
                </div>
                <h3 class="epage-block-full-title">La Conférence des Femmes Leaders du Bénin</h3>
                <p class="epage-block-full-desc">
                  Un rendez-vous incontournable du leadership féminin en Afrique de l'Ouest,
                  qui vise à renforcer l'entrepreneuriat, la confiance en soi et la visibilité
                  des femmes dans les sphères de décision.
                </p>
              </div>
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

          <!-- Citation finale -->
          <div class="epage-quote-wrap">
            <div class="epage-quote-line" />
            <blockquote class="epage-quote">
              "Chez Glow Empire, nous ne créons pas seulement des projets.<br />
              Nous construisons des identités fortes, des visions durables<br />
              et des leaders capables d'inspirer leur génération."
            </blockquote>
            <div class="epage-quote-line" />
          </div>

          <!-- CTA -->
          <div class="epage-cta-wrap">
            <RouterLink to="/#books" class="glass-cta epage-cta" @click="scrollToBooks">
              <span>Découvrir les livres</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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

const valeurs = [
  {
    num: '01',
    titre: 'Excellence sans compromis',
    desc: 'Nous ne publions, ne transmettons et ne construisons que ce qui élève véritablement.',
  },
  {
    num: '02',
    titre: 'Authenticité radicale',
    desc: 'Pas de recettes miracles. Des principes éprouvés, des méthodes testées sur le terrain.',
  },
  {
    num: '03',
    titre: 'Élégance en toute chose',
    desc: 'La forme honore le fond. L\'excellence se reconnaît dans les détails.',
  },
  {
    num: '04',
    titre: 'Impact social ancré',
    desc: 'Chaque personne révélée devient un catalyseur pour sa communauté et sa génération.',
  },
]

const offres = [
  {
    titre: 'Publications et livres de transformation',
    desc: 'Des ouvrages pensés pour être vécus, structurés pour provoquer des déclics réels et durables.',
  },
  {
    titre: 'Coaching et accompagnement individuel',
    desc: 'Un suivi de haute précision pour les entrepreneurs, professionnels et leaders qui veulent accélérer leur trajectoire.',
  },
  {
    titre: 'Formations et programmes collectifs',
    desc: 'Des formats intensifs conçus pour transformer des groupes en communautés de leaders.',
  },
  {
    titre: 'Conférences et événements à impact',
    desc: 'Des espaces de rencontre, d\'inspiration et de passage à l\'action — dont la Conférence des Femmes Leaders du Bénin.',
  },
  {
    titre: 'Stratégie de personal branding',
    desc: 'Construire une identité forte, un positionnement clair et une présence digitale magnétique.',
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
  filter: brightness(0.75) contrast(1.05);
}
.epage-block-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(1,11,25,0.5) 100%);
}

/* Valeurs liste -->  */
.epage-valeurs-list {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}
.epage-valeur {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid rgba(122,211,255,0.07);
}
.epage-valeur:last-child { border-bottom: none; padding-bottom: 0; }
.epage-valeur-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.epage-valeur-num {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: rgba(122,211,255,0.4);
}
.epage-valeur-titre {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}
.epage-valeur-desc {
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.45);
  font-weight: 300;
}

/* Offres -->  */
.epage-offres {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
.epage-offres-header {
  display: flex;
  flex-direction: column;
}
.epage-offres-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 640px) {
  .epage-offres-grid { grid-template-columns: repeat(2, 1fr); }
}
.epage-offre-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
.epage-offre-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #7AD3FF;
  box-shadow: 0 0 8px rgba(122,211,255,0.55);
  flex-shrink: 0;
  margin-top: 0.35rem;
}
.epage-offre-titre {
  font-size: 0.97rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.4rem;
}
.epage-offre-desc {
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.45);
  font-weight: 300;
}

/* Bloc pleine largeur -->  */
.epage-block-full {
  width: 100%;
}
.epage-block-full-img-wrap {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.1);
  aspect-ratio: 16/7;
  min-height: 300px;
}
.epage-block-full-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  filter: brightness(0.55) contrast(1.05);
}
.epage-block-full-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(1,11,25,0.9) 0%,
    rgba(1,11,25,0.35) 55%,
    transparent 100%
  );
}
.epage-block-full-caption {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 2.5rem 3rem;
  max-width: 580px;
}
.epage-block-full-title {
  font-size: clamp(1.2rem, 2.5vw, 1.7rem);
  font-weight: 600;
  color: #fff;
  line-height: 1.25;
  letter-spacing: -0.01em;
}
.epage-block-full-desc {
  font-size: 0.92rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.6);
  font-weight: 300;
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
