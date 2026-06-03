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

      <!-- Deck layout -->
      <div class="books-deck-wrap reveal-up" style="transition-delay:0.45s">
        <!-- Desktop nav arrows -->
        <button class="deck-arrow deck-arrow-left" @click="prev" aria-label="Précédent">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Stack of cards -->
        <div
          ref="deckRef"
          class="books-deck"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          @pointerleave="onPointerUp"
        >
          <div
            v-for="(book, i) in books"
            :key="book.title"
            class="book-card"
            :class="getCardClass(i)"
            :style="getCardStyle(i)"
            @click="onCardClick(i)"
          >
            <div class="book-cover-wrap">
              <div
                class="book-cover"
                :class="{ 'has-image': !!book.image }"
                :style="{ background: book.gradient }"
              >
                <div v-if="!book.image" class="book-cover-pattern" />
                <img
                  v-if="book.image"
                  :src="book.image"
                  :alt="book.title"
                  class="book-cover-img"
                  draggable="false"
                />
                <div v-if="!book.image" class="book-cover-content">
                  <span class="book-cover-label">Glow Empire</span>
                  <span class="book-cover-title-overlay">{{ book.title }}</span>
                </div>
              </div>
              <div class="book-cover-shadow" :style="{ background: book.shadow }" />
            </div>

            <div class="book-info">
              <div class="book-badge">{{ book.badge }}</div>
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-desc">{{ book.desc }}</p>
              <div class="book-meta">
                <span class="book-pages">{{ book.pages }} pages</span>
                <span class="book-year">{{ book.year }}</span>
              </div>
              <button type="button" class="book-cta glass-cta" @click="openModal(book)">
                <span>Obtenir le livre</span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M8 3L11 6.5 8 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button class="deck-arrow deck-arrow-right" @click="next" aria-label="Suivant">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Dot indicators (always at the very bottom of the section) -->
      <div class="deck-dots">
        <button
          v-for="(book, i) in books"
          :key="i"
          class="deck-dot"
          :class="{ 'deck-dot-active': i === activeIndex }"
          @click="goTo(i)"
          :aria-label="book.title"
        />
      </div>
    </div>

    <!-- Discreet hint, anchored bottom-right corner of the section -->
    <div class="deck-hint" aria-hidden="true">
      <span>Glisser</span>
      <svg class="deck-hint-arrow" width="18" height="10" viewBox="0 0 18 10" fill="none">
        <path d="M1 5h15M12 1l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- Modal d'achat -->
    <BookPurchaseModal :book="selectedBook" @close="closeModal" />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import BookPurchaseModal from '@/components/ui/BookPurchaseModal.vue'

const books = [
  {
    id: 'prise-de-parole',
    title: 'Prise de parole en public',
    badge: 'Bestseller',
    desc: "Maîtrise l'art de captiver une salle, de convaincre et de laisser une empreinte durable. Le guide pour prendre le contrôle de chaque prise de parole.",
    longDesc: [
      "Prendre la parole, c'est exercer un pouvoir. Celui de captiver, de convaincre et de marquer les esprits. Pourtant, pour la plupart des gens, c'est aussi la source d'une peur paralysante.",
      "Ce livre démonte, étape par étape, les mécanismes d'une prise de parole maîtrisée : la préparation mentale, la structure d'un discours qui retient l'attention, le langage du corps, la gestion du trac et l'art de répondre à n'importe quelle question avec assurance.",
      "Que tu sois entrepreneur, étudiant, leader ou créateur, tu y trouveras une méthode concrète et immédiatement actionnable pour transformer chaque intervention en un moment d'impact.",
    ],
    pages: '220',
    year: '2022',
    price: 5000,
    gradient: 'linear-gradient(135deg, #0E3975 0%, #1D74E8 55%, #7AD3FF 100%)',
    shadow: 'linear-gradient(to bottom, rgba(29, 116, 232, 0.5), transparent)',
    image: '/livre1.jpeg',
  },
  {
    id: 'entrepreneuriat-femmes',
    title: "L'entrepreneuriat des femmes",
    badge: 'Top 10',
    desc: "Le manuel de l'entrepreneuriat féminin moderne — stratégies, positionnement et mindset pour bâtir un empire à son image.",
    longDesc: [
      "L'entrepreneuriat féminin n'est pas une version allégée de l'entrepreneuriat. C'est une force à part entière, avec ses codes, ses défis et ses leviers spécifiques.",
      "Ce manuel rassemble les stratégies de positionnement, de mindset et de construction d'image qui permettent à une femme de bâtir un projet solide, rentable et aligné avec sa vision — sans se renier.",
      "De l'idée au lancement, de la confiance en soi à la visibilité, chaque chapitre offre des outils éprouvés pour transformer l'ambition en empire.",
    ],
    pages: '288',
    year: '2023',
    price: 6000,
    gradient: 'linear-gradient(135deg, #001C3D 0%, #0E3975 55%, #1D74E8 100%)',
    shadow: 'linear-gradient(to bottom, rgba(14, 57, 117, 0.5), transparent)',
    image: '/livre2.jpg',
  },
  {
    id: 'pourquoi-un-homme',
    title: 'Pourquoi un homme ?',
    badge: 'Best-seller #1',
    desc: "Le livre qui a tout changé. Une exploration sans filtre des dynamiques relationnelles, du pouvoir et des choix qui définissent une vie.",
    longDesc: [
      "Pourquoi un homme ? Une question simple, une réponse qui ne l'est jamais. Ce livre explore sans filtre les dynamiques relationnelles, les rapports de pouvoir et les choix qui façonnent une vie.",
      "Loin des clichés, il propose une réflexion lucide sur le désir, l'engagement, la valeur et les décisions qui définissent qui nous devenons.",
      "Un ouvrage qui dérange, éclaire et pousse à se poser les vraies questions — celui dont tout le monde parle.",
    ],
    pages: '264',
    year: '2024',
    price: 6000,
    gradient: 'linear-gradient(135deg, #0052A3 0%, #00A3FF 55%, #7AD3FF 100%)',
    shadow: 'linear-gradient(to bottom, rgba(0, 163, 255, 0.4), transparent)',
    image: '/livre3.jpeg',
  },
]

const TOTAL = books.length
const activeIndex = ref(0)
const deckRef = ref(null)

// === Modal d'achat ===
const selectedBook = ref(null)
function openModal(book) {
  // Évite l'ouverture si un drag vient de se terminer
  if (Math.abs(dragX.value) > 4) return
  selectedBook.value = book
}
function closeModal() {
  selectedBook.value = null
}

// === Drag state ===
// dragX = current finger displacement in px from start (signed: negative = left)
const dragX = ref(0)
const isDragging = ref(false)
// progress = 0 (rest) → 1 (fully swiped away). Sign carried in dragSign.
const dragProgress = computed(() => {
  const w = deckWidth.value || 1
  return Math.min(1, Math.abs(dragX.value) / w)
})
const dragSign = computed(() => (dragX.value === 0 ? 0 : dragX.value < 0 ? -1 : 1))
const deckWidth = ref(340)

let pointerId = null
let startX = 0
let startY = 0
let lockedAxis = null // 'x' | 'y' | null

function onPointerDown(e) {
  // Only primary pointer / left mouse
  if (e.pointerType === 'mouse' && e.button !== 0) return
  pointerId = e.pointerId
  startX = e.clientX
  startY = e.clientY
  lockedAxis = null
  // NOTE: do NOT set isDragging=true yet — we only become "dragging" once we
  // know the gesture is horizontal. Otherwise we hijack vertical page scroll.
  isDragging.value = false
  dragX.value = 0
  if (deckRef.value) {
    deckWidth.value = deckRef.value.getBoundingClientRect().width
  }
}

function onPointerMove(e) {
  if (pointerId === null || e.pointerId !== pointerId) return
  const dx = e.clientX - startX
  const dy = e.clientY - startY

  // Lock axis after small threshold
  if (lockedAxis === null) {
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
      lockedAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (lockedAxis === 'x') {
        // Now we own the gesture — start dragging the card
        isDragging.value = true
        try { deckRef.value?.setPointerCapture(pointerId) } catch (_) {}
      } else {
        // Vertical intent — release: let the page scroll, abandon this gesture
        pointerId = null
        return
      }
    } else {
      // Below threshold — don't react yet
      return
    }
  }
  if (lockedAxis !== 'x') return
  dragX.value = dx
}

function onPointerUp(e) {
  if (!isDragging.value) return
  if (e && pointerId !== null) {
    try { deckRef.value?.releasePointerCapture(pointerId) } catch (_) {}
  }
  const threshold = deckWidth.value * 0.28
  const committed = lockedAxis === 'x' && Math.abs(dragX.value) > threshold
  const sign = dragSign.value

  isDragging.value = false
  pointerId = null
  lockedAxis = null

  if (committed) {
    // Snap the card AWAY in the swipe direction, then commit the index switch
    // by setting dragX large so the CSS exit animation finishes naturally,
    // then reset to 0 with the new active card already at rest position.
    commitSwipe(sign)
  } else {
    // Spring back
    dragX.value = 0
  }
}

let isSnapping = false
function commitSwipe(sign) {
  // Animate the current front card off-screen (sign direction), then swap index.
  isSnapping = true
  // Target = full deck width * 1.4 in the same direction
  dragX.value = sign * deckWidth.value * 1.4
  // After CSS transition, swap index and reset dragX without transition flicker
  window.setTimeout(() => {
    if (sign < 0) {
      activeIndex.value = (activeIndex.value + 1) % TOTAL
    } else {
      activeIndex.value = (activeIndex.value - 1 + TOTAL) % TOTAL
    }
    dragX.value = 0
    isSnapping = false
  }, 380)
}

function goTo(idx) {
  if (idx === activeIndex.value || isSnapping) return
  const sign = idx > activeIndex.value ? -1 : 1
  // Handle the wrap edges so swipe direction feels natural
  if (activeIndex.value === TOTAL - 1 && idx === 0) commitSwipe(-1)
  else if (activeIndex.value === 0 && idx === TOTAL - 1) commitSwipe(1)
  else {
    // Multi-step: just hop instantly via a single commit. Simpler: set index directly with a small snap.
    isSnapping = true
    dragX.value = sign * deckWidth.value * 1.4
    window.setTimeout(() => {
      activeIndex.value = idx
      dragX.value = 0
      isSnapping = false
    }, 380)
  }
}

function next() { commitSwipe(-1) }
function prev() { commitSwipe(1) }

function onCardClick(i) {
  // Avoid click firing at end of a drag
  if (Math.abs(dragX.value) > 4) return
  if (i === activeIndex.value) return
  goTo(i)
}

// Relative position 0..TOTAL-1 from active
function relPos(i) {
  return (i - activeIndex.value + TOTAL) % TOTAL
}

function getCardClass(i) {
  const d = relPos(i)
  return {
    'card-active': d === 0,
    'card-behind-1': d === 1,
    'card-behind-2': d === 2,
    'card-hidden': d >= 3,
    'is-dragging': d === 0 && isDragging.value,
    'is-snapping': d === 0 && isSnapping,
  }
}

// Rest offsets for back cards
const REST = [
  { x: 0,   y: 0,  scale: 1,    rotate: 0,   opacity: 1 },
  { x: 26,  y: 14, scale: 0.92, rotate: 3,   opacity: 0.85 },
  { x: 48,  y: 24, scale: 0.84, rotate: 5.5, opacity: 0.65 },
]

function lerp(a, b, t) { return a + (b - a) * t }

function getCardStyle(i) {
  const d = relPos(i)
  const front = REST[0]
  const back1 = REST[1]
  const back2 = REST[2]
  const p = dragProgress.value
  const sign = dragSign.value

  // For the FRONT card (d===0): translate with finger + add slight rotation tied to drag
  if (d === 0) {
    const rotate = (dragX.value / Math.max(1, deckWidth.value)) * 14 // up to ~14deg
    // Fade slightly as it leaves
    const opacity = isSnapping
      ? Math.max(0, 1 - Math.min(1, Math.abs(dragX.value) / Math.max(1, deckWidth.value)))
      : 1
    return {
      '--card-x': `${dragX.value}px`,
      '--card-y': `0px`,
      '--card-scale': 1,
      '--card-z': 30,
      '--card-rotate': `${rotate}deg`,
      '--card-opacity': opacity,
    }
  }

  // For BEHIND cards (d===1, d===2): morph toward the slot in front of them as user drags.
  // The 2nd card (d===1) moves from back1 → front position as |progress| → 1
  // The 3rd card (d===2) moves from back2 → back1 position as |progress| → 1
  let target
  if (d === 1) target = front
  else if (d === 2) target = back1
  else target = back2

  const from = REST[d] || back2
  const x = lerp(from.x, target.x, p) * (sign === 0 ? 1 : 1) // keep sign neutral; offsets are static-side
  const y = lerp(from.y, target.y, p)
  const scale = lerp(from.scale, target.scale, p)
  const rotate = lerp(from.rotate, target.rotate, p)
  const opacity = lerp(from.opacity, target.opacity, p)

  // Z-index ordering: front card stays on top until it's mostly gone; behind cards rise.
  // Use a small bump for d===1 once it's nearly committed (p>0.5).
  const z = d === 1 ? (p > 0.5 ? 20 : 20) : (10 - d)

  return {
    '--card-x': `${x}px`,
    '--card-y': `${y}px`,
    '--card-scale': scale,
    '--card-z': z,
    '--card-rotate': `${rotate}deg`,
    '--card-opacity': opacity,
  }
}
</script>

<style scoped>
.books-section {
  position: relative;
  background: #021833;
  /* Tall enough so the CTA never falls under the next section on desktop */
  padding: 8rem 0 15rem;
  overflow: hidden;
  min-height: 100vh;
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
  width: 600px;
  height: 600px;
  background: radial-gradient(ellipse, rgba(0, 82, 163, 0.12) 0%, transparent 70%);
}
.books-bg-glow-right {
  position: absolute;
  bottom: 20%;
  right: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(0, 163, 255, 0.08) 0%, transparent 70%);
}

.books-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

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

/* === DECK LAYOUT === */
.books-deck-wrap {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2.5rem;
  position: relative;
  padding-top: 1rem;
}

/* The stack — sized for the card itself + room for the info block below */
.books-deck {
  position: relative;
  touch-action: pan-y;
  /* Mobile card — smaller as requested */
  width: min(260px, calc(100vw - 5rem));
  min-height: 540px;
  user-select: none;
  -webkit-user-select: none;
}

@media (min-width: 768px) {
  .books-deck {
    width: 340px;
    min-height: 660px;
  }
}

@media (min-width: 1024px) {
  .books-deck {
    width: clamp(320px, 30vw, 420px);
    min-height: 720px;
  }
}

/* === Individual book card === */
.book-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  /* Allow vertical page scroll through the card — only the deck wrapper
     captures horizontal gestures via Pointer Events. */
  touch-action: pan-y;

  transform:
    translate3d(var(--card-x, 0), var(--card-y, 0), 0)
    scale(var(--card-scale, 1))
    rotate(var(--card-rotate, 0deg));
  z-index: var(--card-z, 1);
  opacity: var(--card-opacity, 1);
  will-change: transform, opacity;

  /* No transition while finger is down: card must follow the finger 1:1 */
  transition: none;
}

/* When finger releases without committing, smoothly spring back.
   When committing, glide off + back cards glide in. */
.book-card:not(.is-dragging) {
  transition:
    transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.4s ease;
}
.book-card.is-snapping {
  transition:
    transform 0.38s cubic-bezier(0.5, 0, 0.75, 0),
    opacity 0.38s ease;
}

.card-active { cursor: grab; }
.card-active.is-dragging { cursor: grabbing; }

.card-hidden {
  opacity: 0 !important;
  pointer-events: none;
}

/* Book cover */
.book-cover-wrap {
  position: relative;
}
.book-cover {
  position: relative;
  aspect-ratio: 2/3;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.14);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition: box-shadow 0.4s ease;
}
.card-active .book-cover {
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.65),
    0 0 60px rgba(29, 116, 232, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.book-cover-pattern {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.03) 0px,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 14px
  );
}

.book-cover-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  pointer-events: none;
}
.book-cover.has-image {
  background: #000 !important;
}

.book-cover-content {
  position: absolute;
  inset: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}
.book-cover-label {
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}
.book-cover-title-overlay {
  font-size: clamp(1.05rem, 2.5vw, 1.3rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.book-cover-shadow {
  position: absolute;
  bottom: -24px;
  left: 10%;
  right: 10%;
  height: 48px;
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.55;
}

/* Book info — only fully visible on active card */
.book-info {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
  pointer-events: none;
}
.card-active .book-info {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.book-badge {
  display: inline-block;
  padding: 0.22rem 0.65rem;
  border-radius: 100px;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(14, 57, 117, 0.65);
  color: rgba(122, 211, 255, 0.85);
  border: 1px solid rgba(122, 211, 255, 0.18);
  align-self: flex-start;
}

.book-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: -0.01em;
}

.book-desc {
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.42);
  font-weight: 300;
}

.book-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.28);
  font-weight: 300;
}

.book-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.25rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  align-self: flex-start;
  border: none;
  cursor: pointer;
  margin-top: 0.25rem;
}

/* === Desktop arrows === */
.deck-arrow {
  display: none;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 25%;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 6px 24px rgba(0, 0, 0, 0.2);
}
.deck-arrow:hover {
  background: rgba(122, 211, 255, 0.1);
  border-color: rgba(122, 211, 255, 0.35);
  color: #7AD3FF;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.25);
}

@media (min-width: 1024px) {
  .deck-arrow { display: flex; }
}

/* === Dot indicators — desktop only (mobile uses the discreet hint instead) === */
.deck-dots {
  display: none;
  gap: 0.6rem;
  justify-content: center;
  margin-top: 1rem;
}
@media (min-width: 1024px) {
  .deck-dots { display: flex; }
}

.deck-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  transition: all 0.35s ease;
  padding: 0;
}
.deck-dot-active {
  background: rgba(122, 211, 255, 0.8);
  width: 20px;
  border-radius: 3px;
}

/* === Discreet hint, bottom-right corner of the section === */
.deck-hint {
  /* margin-top:-8rem; */
  position: absolute;
  right: 1rem;
  bottom: 7rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.5rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(122, 211, 255, 0.25);
  pointer-events: none;
  z-index: 2;
}
.deck-hint-arrow {
  animation: hint-pulse 1.6s ease-in-out infinite;
}
@keyframes hint-pulse {
  0%, 100% { transform: translateX(0); opacity: 0.5; }
  50%      { transform: translateX(6px); opacity: 1; }
}

@media (min-width: 1024px) {
  .deck-hint { display: none; }
}
</style>
