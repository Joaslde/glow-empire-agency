<template>
  <section id="books" class="books-section">
    <div class="books-bg">
      <div class="books-bg-glow-left" />
      <div class="books-bg-glow-right" />
    </div>

    <div class="books-container">
      <!-- Header -->
      <div class="books-header">
        <div class="section-label reveal-fade">
          <span class="section-label-line" />
          <span>Les livres</span>
        </div>
        <h2 class="books-title reveal-up" style="transition-delay:0.15s">
          La connaissance,<br />
          <span class="books-title-accent">mise en forme.</span>
        </h2>
        <p class="books-subtitle reveal-up" style="transition-delay:0.3s">
          Des ouvrages qui condensent des années d'expérience en leviers pratiques
          immédiatement actionnables.
        </p>
      </div>

      <!-- Books grid / horizontal scroll on mobile -->
      <div class="books-track-wrap">
        <div class="books-track">
          <article
            v-for="(book, i) in books"
            :key="book.title"
            class="book-card reveal-up"
            :style="{ transitionDelay: `${0.1 + i * 0.15}s` }"
          >
            <!-- Cover -->
            <div class="book-cover-wrap">
              <div class="book-cover" :style="{ background: book.gradient }">
                <div class="book-cover-pattern" />
                <div class="book-cover-content">
                  <span class="book-cover-label">Glow Empire</span>
                  <span class="book-cover-title-overlay">{{ book.title }}</span>
                </div>
              </div>
              <div class="book-cover-shadow" :style="{ background: book.shadow }" />
            </div>

            <!-- Info -->
            <div class="book-info">
              <div class="book-badge">{{ book.badge }}</div>
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-desc">{{ book.desc }}</p>
              <div class="book-meta">
                <span class="book-pages">{{ book.pages }} pages</span>
                <span class="book-year">{{ book.year }}</span>
              </div>
              <a href="#" class="book-cta glass-cta">
                <span>Obtenir le livre</span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M8 3L11 6.5 8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const books = [
  {
    title: 'Glow Up',
    badge: 'Bestseller #1',
    desc: 'Le guide ultime pour transformer ton image, ton mindset et ta trajectoire. Pas de théories creuses — des systèmes concrets.',
    pages: '248',
    year: '2022',
    gradient: 'linear-gradient(135deg, #0E3975 0%, #1D74E8 50%, #7AD3FF 100%)',
    shadow: 'linear-gradient(to bottom, rgba(29, 116, 232, 0.4), transparent)',
  },
  {
    title: 'Empire Mindset',
    badge: 'Top 10',
    desc: 'Déconstruis les croyances qui te bloquent. Installe les schémas mentaux des entrepreneurs qui construisent des empires durables.',
    pages: '312',
    year: '2023',
    gradient: 'linear-gradient(135deg, #001C3D 0%, #0E3975 60%, #1D74E8 100%)',
    shadow: 'linear-gradient(to bottom, rgba(14, 57, 117, 0.4), transparent)',
  },
  {
    title: 'Personal Brand',
    badge: 'Nouveau',
    desc: 'Comment construire une marque personnelle magnétique qui attire clients, opportunités et collaborations de haute valeur.',
    pages: '276',
    year: '2024',
    gradient: 'linear-gradient(135deg, #0052A3 0%, #00A3FF 60%, #7AD3FF 100%)',
    shadow: 'linear-gradient(to bottom, rgba(0, 163, 255, 0.3), transparent)',
  },
  {
    title: 'Système Empire',
    badge: 'En cours',
    desc: 'Le manuel complet pour automatiser, déléguer et scaler ton business digital. Bâtis une machine à revenus sans te brûler.',
    pages: '—',
    year: '2025',
    gradient: 'linear-gradient(135deg, #010B19 0%, #021833 50%, #0E3975 100%)',
    shadow: 'linear-gradient(to bottom, rgba(1, 11, 25, 0.4), transparent)',
  },
]
</script>

<style scoped>
.books-section {
  position: relative;
  background: #021833;
  padding: 8rem 0 6rem;
  overflow: hidden;
}

.books-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.books-bg-glow-left {
  position: absolute;
  top: 30%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(0, 82, 163, 0.1) 0%, transparent 70%);
}
.books-bg-glow-right {
  position: absolute;
  bottom: 20%;
  right: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(0, 163, 255, 0.08) 0%, transparent 70%);
}

.books-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 0 1.5rem;
}

/* Header */
.books-header {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

.books-title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.025em;
  color: #ffffff;
}
.books-title-accent {
  color: transparent;
  background: linear-gradient(135deg, #7AD3FF 0%, #1D74E8 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.books-subtitle {
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.45);
  max-width: 480px;
  font-weight: 300;
}

/* Books track - horizontal scroll */
.books-track-wrap {
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  margin: 0 -1.5rem;
  padding: 1rem 1.5rem 2rem;
}
.books-track-wrap::-webkit-scrollbar {
  display: none;
}

.books-track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
}

@media (min-width: 1024px) {
  .books-track-wrap {
    overflow-x: visible;
    margin: 0;
    padding: 1rem 0 2rem;
  }
  .books-track {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: auto;
  }
}

/* Book card */
.book-card {
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .book-card {
    width: auto;
  }
}

/* Book cover */
.book-cover-wrap {
  position: relative;
}
.book-cover {
  position: relative;
  aspect-ratio: 2/3;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.1);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.book-card:hover .book-cover {
  transform: translateY(-6px) rotate(-1deg);
}

.book-cover-pattern {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.03) 0px,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 12px
  );
}

.book-cover-content {
  position: absolute;
  inset: 0;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.book-cover-label {
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}
.book-cover-title-overlay {
  font-size: 1.15rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.book-cover-shadow {
  position: absolute;
  bottom: -20px;
  left: 10%;
  right: 10%;
  height: 40px;
  border-radius: 50%;
  filter: blur(16px);
  opacity: 0.6;
}

/* Book info */
.book-info {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.book-badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(14, 57, 117, 0.6);
  color: rgba(122, 211, 255, 0.8);
  border: 1px solid rgba(122, 211, 255, 0.15);
  align-self: flex-start;
}

.book-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -0.01em;
}

.book-desc {
  font-size: 0.82rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
}

.book-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 300;
}

.book-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.1rem;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  align-self: flex-start;
  border: none;
  cursor: pointer;
}
</style>
