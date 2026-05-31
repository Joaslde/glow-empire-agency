<template>
  <div class="detail-page">
    <!-- Même nav diamant que la landing (mode page intérieure) -->
    <PersistentDiamondNav static-mode />
    <MobileMenu static-mode />

    <main class="detail-main">

      <!-- HERO -->
      <section class="ppage-hero">
        <div class="ppage-hero-bg">
          <div class="ppage-hero-radial" />
        </div>
        <div class="ppage-hero-portrait-wrap">
          <img src="/protagoniste.jpeg" alt="Riquier Soussia" class="ppage-hero-portrait" />
          <div class="ppage-hero-portrait-overlay" />
        </div>
        <div class="ppage-hero-inner">
          <div class="section-label">
            <span class="section-label-line" />
            <span>Le protagoniste</span>
          </div>
          <h1 class="ppage-hero-title">
            Riquier Soussia —<br />
            <span class="ppage-hero-accent">Architecte de destins.</span>
          </h1>
          <p class="ppage-hero-sub">
            Juriste, entrepreneur, coach, auteur. Un homme qui a choisi de consacrer son énergie
            à une seule mission : révéler la grandeur qui sommeille dans chaque individu.
          </p>
        </div>
      </section>

      <!-- BIO -->
      <section class="ppage-bio">
        <div class="ppage-bio-inner">

          <!-- Intro -->
          <div class="ppage-intro">
            <h2 class="ppage-section-title">L'homme derrière la vision</h2>
            <p class="ppage-lead">
              Riquier Soussia n'est pas un auteur ordinaire. C'est un <strong>stratège du développement humain</strong> —
              quelqu'un qui a compris que le talent non encadré reste invisible, que le potentiel non révélé reste silencieux,
              et que la grandeur ne s'improvise jamais. Elle se construit.
            </p>
          </div>

          <!-- Bloc 1 : texte + image -->
          <div class="ppage-block">
            <div class="ppage-block-text">
              <div class="ppage-block-num">01</div>
              <h3 class="ppage-block-title">Des racines solides dans le droit et la stratégie</h3>
              <p>
                Juriste de formation, Riquier Soussia développe très tôt une capacité rare :
                lire les situations avec rigueur, comprendre les dynamiques humaines avec précision,
                et agir avec méthode là où d'autres improvisent.
                Cette formation intellectuelle lui forge une pensée structurée, analytique,
                capable de décortiquer les mécanismes invisibles qui séparent ceux qui rêvent
                de ceux qui accomplissent.
              </p>
            </div>
            <div class="ppage-block-img-wrap">
              <img src="/protagoniste.jpeg" alt="Riquier Soussia" class="ppage-block-img" loading="lazy" />
              <div class="ppage-block-img-overlay" />
            </div>
          </div>

          <!-- Bloc 2 : texte seul -->
          <div class="ppage-text-block">
            <div class="ppage-block-num">02</div>
            <h3 class="ppage-block-title">L'image, la communication, l'influence</h3>
            <p>
              Mannequin professionnel, graphiste et stratège marketing, il évolue dans des univers
              où chaque détail compte — où l'image n'est pas une question de vanité, mais de
              positionnement, de message et d'impact. Il développe une expertise rare :
              bâtir des identités fortes, positionner des marques,
              transformer des talents bruts en leaders visibles, crédibles et impactants.
              Son approche est à la fois esthétique, stratégique et profondément humaine.
            </p>
          </div>

          <!-- Bloc 3 : image + texte (inversé) -->
          <div class="ppage-block ppage-block-reverse">
            <div class="ppage-block-img-wrap">
              <img src="/protagoniste%202.jpeg" alt="Riquier Soussia — coaching" class="ppage-block-img" loading="lazy" />
              <div class="ppage-block-img-overlay" />
            </div>
            <div class="ppage-block-text">
              <div class="ppage-block-num">03</div>
              <h3 class="ppage-block-title">Coach. Mentor. Bâtisseur.</h3>
              <p>
                Coach certifié en prise de parole en public, en personal branding et en développement
                personnel, il accompagne depuis plusieurs années des jeunes, des femmes leaders,
                des entrepreneurs et des professionnels vers une confiance maîtrisée,
                une communication de haute précision et une image parfaitement alignée à leur mission.
              </p>
              <p>
                Son style de coaching est reconnu pour sa rigueur bienveillante et sa capacité
                à provoquer de véritables déclics transformationnels — ceux qui changent une trajectoire
                de vie en une seule conversation.
              </p>
            </div>
          </div>

          <!-- Bloc 4 : texte seul -->
          <div class="ppage-text-block">
            <div class="ppage-block-num">04</div>
            <h3 class="ppage-block-title">Fondateur de Glow Empire</h3>
            <p>
              Fondateur et Président de Glow Empire, il bâtit un écosystème dédié à la révélation
              du potentiel, au leadership conscient et à l'excellence personnelle.
              À travers cette plateforme, il développe des programmes de formation, des conférences,
              des coachings individuels et des initiatives à fort impact social — toujours avec la même
              conviction : chaque être humain possède un diamant brut en lui, qui attend d'être taillé.
            </p>
          </div>

          <!-- Bloc 5 : pleine largeur -->
          <div class="ppage-feature">
            <div class="ppage-feature-img-wrap">
              <img src="/conference-des-femmes.png" alt="Conférence des Femmes Leaders du Bénin" class="ppage-feature-img" loading="lazy" />
              <div class="ppage-feature-overlay" />
            </div>
            <div class="ppage-feature-caption">
              <div class="ppage-block-num">05</div>
              <h3 class="ppage-block-title">La Conférence des Femmes Leaders du Bénin</h3>
              <p>
                Président du Comité d'Organisation de la Conférence des Femmes Leaders du Bénin,
                Riquier Soussia pilote une initiative qui s'impose progressivement comme un
                rendez-vous incontournable du leadership féminin en Afrique de l'Ouest.
                Cette conférence vise à renforcer le leadership féminin, l'entrepreneuriat,
                la confiance en soi et la visibilité des femmes dans les sphères de décision.
              </p>
            </div>
          </div>

          <!-- Citation -->
          <div class="ppage-quote-wrap">
            <div class="ppage-quote-line" />
            <blockquote class="ppage-quote">
              "La grandeur se construit, elle ne s'improvise pas."
            </blockquote>
            <cite class="ppage-quote-author">— Riquier Soussia</cite>
            <div class="ppage-quote-line" />
          </div>

          <!-- CTA retour -->
          <div class="ppage-cta-wrap">
            <RouterLink to="/#books" class="glass-cta ppage-cta" @click="scrollToBooks">
              <span>Découvrir les livres</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
            <RouterLink to="/empire" class="ppage-link-secondary">
              Découvrir Glow Empire
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
.ppage-hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.ppage-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.ppage-hero-radial {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 30% 60%, rgba(0, 82, 163, 0.18) 0%, transparent 70%),
    linear-gradient(to bottom, #010B19 0%, transparent 40%, rgba(1,11,25,0.85) 100%);
}

.ppage-hero-portrait-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.ppage-hero-portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  opacity: 0.3;
  filter: grayscale(20%) brightness(0.65);
}
.ppage-hero-portrait-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(1,11,25,0.6) 0%,
    transparent 25%,
    rgba(1,11,25,0.85) 80%,
    #010B19 100%
  );
}

.ppage-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12rem 1.5rem 6rem;
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

.ppage-hero-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #fff;
  max-width: 700px;
}
.ppage-hero-accent {
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 100%);
  -webkit-background-clip: text;
  background-clip: text;
}
.ppage-hero-sub {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
  max-width: 560px;
  font-weight: 300;
}

/* === BIO === */
.ppage-bio {
  position: relative;
  z-index: 1;
}
.ppage-bio-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.ppage-intro {
  max-width: 780px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.ppage-section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #fff;
  line-height: 1.1;
}

.ppage-lead {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.55);
  font-weight: 300;
}
.ppage-lead strong {
  color: rgba(255,255,255,0.85);
  font-weight: 500;
}

/* Blocs texte + image */
.ppage-block {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 900px) {
  .ppage-block {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
  .ppage-block-reverse .ppage-block-img-wrap {
    order: -1;
  }
}

.ppage-block-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ppage-block-num {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: rgba(122, 211, 255, 0.45);
}

.ppage-block-title {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 600;
  color: #fff;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.ppage-block-text p {
  font-size: 0.97rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.5);
  font-weight: 300;
}

.ppage-block-img-wrap {
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.1);
  aspect-ratio: 4/5;
}
.ppage-block-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}
.ppage-block-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(1,11,25,0.5) 100%);
}

/* Bloc texte seul (pas d'image — évite deux images adjacentes) */
.ppage-text-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 780px;
}
.ppage-text-block p {
  font-size: 1rem;
  line-height: 1.85;
  color: rgba(255,255,255,0.52);
  font-weight: 300;
}

/* Bloc feature (image + texte empilés, responsive) */
.ppage-feature {
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.1);
  background: rgba(2, 24, 51, 0.35);
}
.ppage-feature-img-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #021326;
}
.ppage-feature-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}
.ppage-feature-overlay {
  display: none;
}

/* Desktop : recadrage cinématique, plein cadre */
@media (min-width: 768px) {
  .ppage-feature-img-wrap {
    aspect-ratio: 16/9;
    max-height: 420px;
  }
  .ppage-feature-img {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .ppage-feature-overlay {
    display: block;
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 45%, rgba(1,11,25,0.7) 100%);
  }
}
.ppage-feature-caption {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1.75rem 2.25rem;
}
.ppage-feature-caption p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.55);
  font-weight: 300;
}

@media (min-width: 768px) {
  .ppage-feature-caption {
    padding: 2.5rem 3rem 2.75rem;
  }
}

/* Citation */
.ppage-quote-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  padding: 1rem 0;
  text-align: center;
}
.ppage-quote-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(122,211,255,0.2), transparent);
}
.ppage-quote {
  font-size: clamp(1.2rem, 2.5vw, 1.75rem);
  font-weight: 300;
  font-style: italic;
  color: rgba(255,255,255,0.75);
  line-height: 1.5;
  letter-spacing: 0.01em;
  max-width: 600px;
}
.ppage-quote-author {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(122,211,255,0.5);
  font-style: normal;
}

/* CTA */
.ppage-cta-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding-bottom: 4rem;
}
@media (min-width: 480px) {
  .ppage-cta-wrap { flex-direction: row; align-items: center; }
}
.ppage-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.6rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  letter-spacing: 0.02em;
}
.ppage-link-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  font-weight: 300;
  transition: color 0.25s ease;
}
.ppage-link-secondary:hover { color: rgba(255,255,255,0.8); }
</style>
