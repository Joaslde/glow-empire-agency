<template>
  <div class="detail-page">
    <PersistentDiamondNav static-mode />
    <MobileMenu static-mode />

    <main class="detail-main">

      <!-- HERO : logo en grand -->
      <section class="cpage-hero">
        <div class="cpage-hero-bg">
          <div class="cpage-hero-grid" />
          <div class="cpage-hero-glow" />
        </div>
        <div class="cpage-hero-inner reveal-up">
          <img src="/conference-des-femmes.png" alt="Conférence des Femmes Leaders du Bénin" class="cpage-hero-logo" />
          <div class="section-label cpage-hero-label">
            <span class="section-label-line" />
            <span>Événement · 21 mars 2026</span>
          </div>
          <h1 class="cpage-hero-title">
            Quand le leadership féminin<br />
            <span class="cpage-hero-accent">prend toute la place.</span>
          </h1>
          <p class="cpage-hero-sub">
            Deuxième édition de la Conférence des Femmes Leaders du Bénin — plus de
            200 femmes réunies à l'Université d'Abomey-Calavi autour de l'innovation,
            de l'intelligence artificielle et de l'excellence.
          </p>
        </div>
      </section>

      <!-- CONTENU -->
      <section class="cpage-body">
        <div class="cpage-body-inner">

          <!-- La vision -->
          <div class="cpage-block reveal-up">
            <div class="cpage-block-text">
              <div class="section-label">
                <span class="section-label-line" />
                <span>La vision</span>
              </div>
              <h2 class="cpage-section-title">Former la génération de femmes qui façonnera demain.</h2>
              <p class="cpage-para">
                Les femmes restent encore trop peu représentées dans les secteurs qui
                façonnent demain. La technologie. L'intelligence artificielle. L'innovation.
                <strong>Cette conférence existe pour changer ça — une édition à la fois.</strong>
              </p>
              <p class="cpage-para">
                Initiée pour valoriser le potentiel féminin, former des leaders audacieuses
                et créer des ponts entre les femmes ambitieuses du Bénin et du monde, la
                Conférence des Femmes Leaders s'impose désormais comme une référence nationale.
              </p>
            </div>
            <div class="cpage-block-img-wrap">
              <img src="/cflb-image/img-jury-femme.jpeg" alt="La vision de la conférence" class="cpage-block-img" loading="lazy" />
              <div class="cpage-block-img-overlay" />
            </div>
          </div>

          <!-- Chiffres clés -->
          <div class="cpage-stats reveal-up">
            <div v-for="s in stats" :key="s.label" class="cpage-stat">
              <span class="cpage-stat-value">{{ s.value }}</span>
              <span class="cpage-stat-label">{{ s.label }}</span>
            </div>
          </div>

          <!-- Récit de la journée -->
          <div class="cpage-story reveal-up">
            <div class="cpage-story-text">
              <div class="section-label">
                <span class="section-label-line" />
                <span>Le récit de la journée</span>
              </div>
              <h2 class="cpage-section-title">Retour sur le 21 mars 2026.</h2>
              <p class="cpage-para">
                Dans un contexte où le leadership féminin s'impose comme un véritable levier
                de développement économique et social, la Conférence des Femmes Leaders du Bénin
                a posé, pour sa deuxième édition, une nouvelle pierre à un édifice ambitieux.
                Rendez-vous était donné le <strong>21 mars 2026, à l'amphithéâtre HOUDEGBE de
                l'Université d'Abomey-Calavi</strong> — un cadre académique propice aux échanges,
                à l'apprentissage et à l'inspiration.
              </p>
              <p class="cpage-para">
                Dès l'accueil, l'ambiance était à la fois professionnelle et chaleureuse.
                Plus de <strong>200 participantes</strong> — étudiantes, entrepreneures,
                professionnelles et passionnées de technologie — ont convergé vers la salle,
                portées par une même envie : apprendre, se connecter, et oser. La cérémonie
                d'ouverture a donné le ton, entre mots de bienvenue, présentation de la vision
                et mise en lumière des enjeux du leadership féminin et de l'innovation.
              </p>
              <p class="cpage-para">
                Le cœur de la journée a battu au rythme de deux concours phares : le
                <strong>« Reine de l'IA »</strong>, pensé pour encourager l'implication des femmes
                dans l'intelligence artificielle, et le <strong>« Meilleur Styliste de l'Année »</strong>,
                célébrant la créativité et l'excellence de la mode béninoise. Sous le haut patronage
                de la marraine AHO Claudia et du parrain YARIS Kassim Rachad, l'événement a confirmé
                sa dimension : bien plus qu'une conférence, un mouvement.
              </p>
            </div>
            <div class="cpage-story-img-wrap">
              <img src="/cflb-image/fille-public.jpeg" alt="Le déroulé de la conférence" class="cpage-story-img" loading="lazy" />
              <div class="cpage-story-img-overlay" />
            </div>
          </div>

          <!-- Image large : ambiance de l'événement -->
          <div class="cpage-feature reveal-up">
            <div class="cpage-feature-img-wrap">
              <img src="/cflb-image/salle.jpeg" alt="Ambiance de la conférence" class="cpage-feature-img" loading="lazy" />
              <div class="cpage-feature-overlay" />
            </div>
            <div class="cpage-feature-caption">
              <div class="section-label">
                <span class="section-label-line" />
                <span>L'amphithéâtre HOUDEGBE</span>
              </div>
              <h3 class="cpage-feature-title">Une journée, un tournant.</h3>
              <p class="cpage-feature-desc">
                Dans un cadre académique pensé pour l'échange et l'apprentissage, plus de
                200 participantes — étudiantes, entrepreneures, professionnelles et passionnées
                de technologie — ont vécu une édition dynamique, inspirante et orientée vers l'impact.
              </p>
            </div>
          </div>

          <!-- Les concours -->
          <div class="cpage-awards reveal-up">
            <div class="cpage-awards-head">
              <div class="section-label">
                <span class="section-label-line" />
                <span>Les concours</span>
              </div>
              <h2 class="cpage-section-title">Célébrer celles qui osent.</h2>
            </div>

            <div class="cpage-awards-grid">
              <div
                v-for="c in concours"
                :key="c.titre"
                class="cpage-award"
              >
                <div class="cpage-award-img-wrap">
                  <img :src="c.image" :alt="c.titre" class="cpage-award-img" loading="lazy" />
                  <div class="cpage-award-img-overlay" />
                </div>
                <div class="cpage-award-body">
                  <h4 class="cpage-award-title">{{ c.titre }}</h4>
                  <p class="cpage-award-desc">{{ c.desc }}</p>
                  <ul class="cpage-award-list">
                    <li v-for="l in c.laureates" :key="l.nom">
                      <span class="cpage-award-medal">{{ l.medaille }}</span>
                      <span class="cpage-award-laureate">
                        <span class="cpage-award-prix">{{ l.prix }}</span>
                        <span class="cpage-award-nom">{{ l.nom }}</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- L'impact -->
          <div class="cpage-block cpage-block-reverse reveal-up">
            <div class="cpage-block-text">
              <div class="section-label">
                <span class="section-label-line" />
                <span>L'impact</span>
              </div>
              <h2 class="cpage-section-title">Ce n'est pas juste une journée.<br />C'est une communauté qui se construit.</h2>
              <ul class="cpage-impact-list">
                <li v-for="i in impacts" :key="i">{{ i }}</li>
              </ul>
            </div>
            <div class="cpage-block-img-wrap">
              <img src="/cflb-image/gagnante-ALLI RAZAKI.jpeg" alt="L'impact de la conférence" class="cpage-block-img" loading="lazy" />
              <div class="cpage-block-img-overlay" />
            </div>
          </div>

          <!-- Personnalités -->
          <div class="cpage-people reveal-up">
            <div class="cpage-people-head">
              <div class="section-label">
                <span class="section-label-line" />
                <span>Sous le haut patronage de</span>
              </div>
            </div>
            <div class="cpage-people-grid">
              <div v-for="p in personnalites" :key="p.nom" class="cpage-person">
                <div v-if="p.image" class="cpage-person-img-wrap">
                  <img :src="p.image" :alt="p.nom" class="cpage-person-img" loading="lazy" />
                </div>
                <span class="cpage-person-role">{{ p.role }}</span>
                <span class="cpage-person-nom">{{ p.nom }}</span>
              </div>
            </div>
          </div>

          <!-- Citation -->
          <div class="cpage-quote-wrap reveal-fade">
            <div class="cpage-quote-line" />
            <blockquote class="cpage-quote">
              "Au-delà d'un événement, la Conférence s'affirme comme un mouvement engagé
              pour l'avenir des femmes — audacieuses, compétentes et résolument tournées
              vers l'innovation."
            </blockquote>
            <div class="cpage-quote-line" />
          </div>

          <!-- Prochaine édition (CTA) -->
          <div class="cpage-next reveal-up">
            <div class="section-label">
              <span class="section-label-line" />
              <span>L'histoire continue</span>
            </div>
            <span class="cpage-next-date">20 mars 2027</span>
            <h2 class="cpage-section-title">La prochaine édition se prépare.</h2>
            <p class="cpage-para cpage-para-max">
              Une ambition encore plus grande. Une portée internationale. De nouveaux
              ateliers, de nouveaux partenariats, et des femmes encore plus nombreuses
              à inspirer leur génération.
            </p>
            <a :href="whatsappLink" target="_blank" rel="noopener" class="glass-cta cpage-next-cta">
              <span>Être informée de la prochaine édition</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          <!-- Liens secondaires -->
          <div class="cpage-cta-wrap">
            <RouterLink to="/empire" class="cpage-link-secondary">
              Découvrir l'agence Glow Empire
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
            <RouterLink to="/" class="cpage-link-secondary">
              Retour à l'accueil
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
          </div>

        </div>
      </section>

    </main>

    <FooterSection id="footer" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useLenis } from '@/composables/useLenis'
import PersistentDiamondNav from '@/components/ui/PersistentDiamondNav.vue'
import MobileMenu from '@/components/ui/MobileMenu.vue'
import FooterSection from '@/components/sections/FooterSection.vue'

const scrollReveal = useScrollReveal()
const lenis = useLenis()

onMounted(() => {
  lenis.init()
  setTimeout(() => scrollReveal.init(), 200)
  window.scrollTo(0, 0)
})
onUnmounted(() => {
  lenis.destroy()
  scrollReveal.destroy()
})

const whatsappLink = 'https://wa.me/2290198523870?text=' +
  encodeURIComponent('Bonjour Glow Empire, je souhaite être informée de la prochaine Conférence des Femmes Leaders du Bénin.')

const stats = [
  { value: '+200', label: 'participantes mobilisées' },
  { value: '2ᵉ', label: 'édition · UAC, amphi HOUDEGBE' },
  { value: '21.03', label: 'mars 2026 · une journée, un tournant' },
]

const concours = [
  {
    titre: 'Concours « Reine de l\'IA »',
    desc: 'Promouvoir l\'implication des femmes dans l\'intelligence artificielle — un combat pour l\'avenir.',
    image: '/cflb-image/les-trois-premiere-IA.jpeg',
    laureates: [
      { medaille: '👑', prix: 'Reine de l\'IA', nom: 'ALLI RAZAKI Raïmathou A.' },
      { medaille: '🌟', prix: 'Ambassadrice de l\'IA', nom: 'AGOSSOU Foumilayo Joana Eunice' },
      { medaille: '✨', prix: 'Étoile Montante de l\'IA', nom: 'APONI Houéfa Marilyne M.' },
    ],
  },
  {
    titre: 'Concours « Meilleur Styliste de l\'Année »',
    desc: 'La créativité et l\'excellence au service de la mode béninoise.',
    image: '/cflb-image/stylistes.jpeg',
    laureates: [
      { medaille: '🏆', prix: 'Grand Prix Styliste d\'Excellence', nom: 'HOUETON Oxana Gaëlle Stella' },
      { medaille: '🏆', prix: 'Grand Prix Styliste d\'Excellence', nom: 'FELIHO Laurienne' },
    ],
  },
]

const impacts = [
  'Une confiance en soi renforcée et une motivation accrue',
  'Un réseau professionnel activé entre femmes ambitieuses',
  'Des talents identifiés, valorisés et célébrés',
  'Un écosystème entrepreneurial féminin consolidé',
  'Une visibilité accrue du leadership féminin au Bénin',
  'Une communauté engagée qui dépasse l\'événement',
]

const personnalites = [
  { role: 'Marraine de l\'événement', nom: 'AHO Claudia', image: '/cflb-image/marraine.jpeg' },
  { role: 'Parrain de l\'événement', nom: 'YARIS Kassim Rachad', image: '/cflb-image/parrain.jpeg' },
]
</script>

<style scoped>
.detail-page {
  background: #010B19;
  min-height: 100vh;
  color: #fff;
  overflow-x: hidden;
}
.detail-main { padding-top: 0; }

/* === HERO === */
.cpage-hero {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cpage-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.cpage-hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(122,211,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(122,211,255,0.025) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 45%, black 0%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 45%, black 0%, transparent 80%);
}
.cpage-hero-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 35%, rgba(0,82,163,0.22) 0%, transparent 70%);
}
.cpage-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 880px;
  margin: 0 auto;
  padding: 11rem 1.5rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  width: 100%;
}
.cpage-hero-logo {
  width: clamp(140px, 28vw, 230px);
  height: auto;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 40px rgba(122, 211, 255, 0.25));
}
.cpage-hero-label { justify-content: center; }
.cpage-hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #fff;
}
.cpage-hero-accent {
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 100%);
  -webkit-background-clip: text;
  background-clip: text;
}
.cpage-hero-sub {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
  max-width: 620px;
  font-weight: 300;
}

/* Section label (global pattern) */
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

/* === BODY === */
.cpage-body { position: relative; z-index: 1; }
.cpage-body-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 7rem;
}

.cpage-section-title {
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #fff;
  line-height: 1.15;
  margin: 1rem 0 1.25rem;
}
.cpage-para {
  font-size: 1rem;
  line-height: 1.85;
  color: rgba(255,255,255,0.5);
  font-weight: 300;
  margin-bottom: 0.85rem;
}
.cpage-para:last-child { margin-bottom: 0; }
.cpage-para strong { color: rgba(255,255,255,0.82); font-weight: 500; }
.cpage-para-max { max-width: 620px; }

/* Blocs texte + image */
.cpage-block {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 900px) {
  .cpage-block {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
  .cpage-block-reverse .cpage-block-img-wrap { order: -1; }
}
.cpage-block-text { display: flex; flex-direction: column; }
.cpage-block-img-wrap {
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.1);
  aspect-ratio: 4/5;
}
.cpage-block-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.cpage-block-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 65%, rgba(1,11,25,0.4) 100%);
}

/* Chiffres clés */
.cpage-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 700px) {
  .cpage-stats { grid-template-columns: repeat(3, 1fr); }
}
.cpage-stat {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 2rem 1.75rem;
  border-radius: 1.1rem;
  border: 1px solid rgba(122, 211, 255, 0.12);
  background: linear-gradient(160deg, rgba(13, 57, 117, 0.3) 0%, rgba(2, 24, 51, 0.4) 100%);
}
.cpage-stat-value {
  font-size: clamp(2.2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  line-height: 1;
}
.cpage-stat-label {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.55);
  font-weight: 300;
  line-height: 1.5;
}

/* Image large feature */
.cpage-feature {
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.1);
  background: rgba(2, 24, 51, 0.35);
}
.cpage-feature-img-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #021326;
}
.cpage-feature-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}
.cpage-feature-overlay { display: none; }
@media (min-width: 768px) {
  .cpage-feature-img-wrap {
    aspect-ratio: 16/9;
    max-height: 440px;
  }
  .cpage-feature-img {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .cpage-feature-overlay {
    display: block;
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 45%, rgba(1,11,25,0.7) 100%);
  }
}
.cpage-feature-caption {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1.75rem 2.25rem;
}
@media (min-width: 768px) {
  .cpage-feature-caption { padding: 2.5rem 3rem 2.75rem; }
}
.cpage-feature-title {
  font-size: clamp(1.2rem, 2.5vw, 1.7rem);
  font-weight: 600;
  color: #fff;
  line-height: 1.25;
  letter-spacing: -0.01em;
}
.cpage-feature-desc {
  font-size: 0.95rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.55);
  font-weight: 300;
}

/* Récit de la journée */
.cpage-story {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: start;
}
@media (min-width: 900px) {
  .cpage-story {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 4rem;
  }
}
.cpage-story-text { display: flex; flex-direction: column; }
.cpage-story-img-wrap {
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.1);
  aspect-ratio: 3/4;
}
@media (min-width: 900px) {
  .cpage-story-img-wrap {
    position: sticky;
    top: 6rem;
  }
}
.cpage-story-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.cpage-story-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(1,11,25,0.45) 100%);
}

/* Concours */
.cpage-awards {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.cpage-awards-head { display: flex; flex-direction: column; }
.cpage-awards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 800px) {
  .cpage-awards-grid { grid-template-columns: repeat(2, 1fr); }
}
.cpage-award {
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.12);
  background: rgba(2, 24, 51, 0.35);
}
.cpage-award-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;
  background: #021326;
}
.cpage-award-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.cpage-award-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(1,11,25,0.85) 100%);
}
.cpage-award-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.75rem 1.6rem 2rem;
}
.cpage-award-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
  line-height: 1.25;
}
.cpage-award-desc {
  font-size: 0.88rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.5);
  font-weight: 300;
  margin-top: -0.5rem;
}
.cpage-award-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 1.25rem 0 0;
  border-top: 1px solid rgba(122, 211, 255, 0.1);
}
.cpage-award-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}
.cpage-award-medal {
  font-size: 1.15rem;
  line-height: 1.3;
  flex-shrink: 0;
}
.cpage-award-laureate {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.cpage-award-prix {
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(122, 211, 255, 0.65);
}
.cpage-award-nom {
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.35;
}

/* Impact list */
.cpage-impact-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin: 0.5rem 0 0;
  padding: 0;
}
.cpage-impact-list li {
  position: relative;
  padding-left: 1.4rem;
  font-size: 0.97rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
}
.cpage-impact-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(122, 211, 255, 0.6);
}

/* Personnalités */
.cpage-people {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}
.cpage-people-head { display: flex; flex-direction: column; }
.cpage-people-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 640px) {
  .cpage-people-grid { grid-template-columns: repeat(2, 1fr); }
}
.cpage-person {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.75rem 1.75rem;
  border-radius: 1.1rem;
  border: 1px solid rgba(122, 211, 255, 0.12);
  background: rgba(2, 24, 51, 0.3);
}
.cpage-person-img-wrap {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.cpage-person-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}
.cpage-person-role {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(122, 211, 255, 0.6);
}
.cpage-person-nom {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
}

/* Citation */
.cpage-quote-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  text-align: center;
}
.cpage-quote-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(122,211,255,0.18), transparent);
}
.cpage-quote {
  font-size: clamp(1rem, 2.2vw, 1.4rem);
  font-weight: 300;
  font-style: italic;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  letter-spacing: 0.01em;
  max-width: 700px;
}

/* Prochaine édition */
.cpage-next {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 3rem 1.75rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(122, 211, 255, 0.14);
  background:
    radial-gradient(ellipse 80% 100% at 50% 0%, rgba(13, 57, 117, 0.32) 0%, transparent 70%),
    rgba(2, 24, 51, 0.4);
}
@media (min-width: 768px) {
  .cpage-next { padding: 3.5rem 3rem; }
}
.cpage-next-date {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  margin-top: 1rem;
  line-height: 1.1;
}
.cpage-next .cpage-section-title { margin-top: 0.5rem; }
.cpage-next-cta {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.25rem;
  padding: 0.95rem 1.9rem;
  border-radius: 100px;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
}
.cpage-next-cta svg { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.cpage-next-cta:hover svg { transform: translateX(3px); }

/* Liens secondaires */
.cpage-cta-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding-bottom: 4rem;
}
@media (min-width: 480px) {
  .cpage-cta-wrap { flex-direction: row; align-items: center; }
}
.cpage-link-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  font-weight: 300;
  transition: color 0.25s ease;
}
.cpage-link-secondary:hover { color: rgba(255,255,255,0.75); }
</style>
