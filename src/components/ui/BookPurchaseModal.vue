<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="book"
        class="bpm-overlay"
        @click.self="close"
      >
        <div class="bpm-panel" role="dialog" aria-modal="true">
          <!-- Bouton fermeture -->
          <button class="bpm-close" type="button" aria-label="Fermer" @click="close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>

          <!-- HEADER : image figée -->
          <div class="bpm-header">
            <div class="bpm-cover" :style="{ background: book.gradient }">
              <img
                v-if="book.image"
                :src="book.image"
                :alt="book.title"
                class="bpm-cover-img"
                draggable="false"
              />
            </div>
          </div>

          <!-- BODY : description scrollable -->
          <div class="bpm-body">
            <div class="bpm-body-fade" aria-hidden="true" />
            <div class="bpm-body-inner">
              <div class="bpm-badge">{{ book.badge }}</div>
              <h2 class="bpm-title">{{ book.title }}</h2>
              <div class="bpm-meta">
                <span>{{ book.pages }} pages</span>
                <span class="bpm-meta-dot">•</span>
                <span>{{ book.year }}</span>
              </div>
              <p v-for="(para, i) in book.longDesc" :key="i" class="bpm-para">
                {{ para }}
              </p>

              <RouterLink to="/my-purchases" class="bpm-already" @click="close">
                Déjà acheté ? Retrouver mes ebooks
              </RouterLink>
            </div>
          </div>

          <!-- FOOTER sticky : email + payer -->
          <div v-if="book.oldPrice" class="bpm-promo">
            <span class="bpm-promo-old">{{ formatPrice(book.oldPrice) }}</span>
            <span class="bpm-promo-new">{{ formatPrice(book.price) }}</span>
            <span class="bpm-promo-badge">Offre spéciale</span>
          </div>
          <div class="bpm-footer">
            <div class="bpm-field">
              <input
                v-model="email"
                type="email"
                inputmode="email"
                autocomplete="email"
                placeholder="Votre email"
                class="bpm-input"
                :class="{ 'bpm-input-error': showError }"
                @keyup.enter="pay"
              />
            </div>
            <button
              type="button"
              class="bpm-pay glass-cta"
              :disabled="loading"
              @click="pay"
            >
              <span v-if="!loading">Payer {{ formatPrice(book.price) }}</span>
              <span v-else>Ouverture…</span>
            </button>
          </div>
          <p v-if="showError" class="bpm-error-msg">Entre un email valide pour continuer.</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useKkiapay } from '@/composables/useKkiapay'

const props = defineProps({
  book: { type: Object, default: null },
})
const emit = defineEmits(['close'])

const { openCheckout } = useKkiapay()

const email = ref(localStorage.getItem('customer_email') || '')
const loading = ref(false)
const showError = ref(false)

function formatPrice(v) {
  return new Intl.NumberFormat('fr-FR').format(v) + ' FCFA'
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

function close() {
  emit('close')
}

async function pay() {
  if (loading.value) return
  if (!isValidEmail(email.value)) {
    showError.value = true
    return
  }
  showError.value = false
  const cleanEmail = email.value.trim()
  localStorage.setItem('customer_email', cleanEmail)
  loading.value = true
  try {
    await openCheckout({
      amount: props.book.price,
      email: cleanEmail,
      bookId: props.book.id,
    })
  } catch (e) {
    console.error('[Kkiapay] ouverture impossible', e)
  } finally {
    loading.value = false
  }
}

// Verrou du scroll de la page + reset état à l'ouverture
watch(
  () => props.book,
  (b) => {
    if (b) {
      document.body.style.overflow = 'hidden'
      showError.value = false
      loading.value = false
    } else {
      document.body.style.overflow = ''
    }
  }
)

function onKeydown(e) {
  if (e.key === 'Escape' && props.book) close()
}
window.addEventListener('keydown', onKeydown)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.bpm-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(1, 6, 14, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0;
}

.bpm-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  background:
    radial-gradient(ellipse 90% 60% at 50% 0%, rgba(13, 57, 117, 0.4) 0%, transparent 70%),
    #010B19;
  overflow: hidden;
}

/* Desktop : carte centrée */
@media (min-width: 768px) {
  .bpm-overlay { padding: 2rem; }
  .bpm-panel {
    width: min(520px, 100%);
    height: auto;
    max-height: 90vh;
    border-radius: 1.5rem;
    border: 1px solid rgba(122, 211, 255, 0.14);
    box-shadow: 0 40px 120px -20px rgba(0, 0, 0, 0.8);
  }
}

.bpm-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 5;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 28, 56, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background 0.25s ease, color 0.25s ease;
}
.bpm-close:hover {
  background: rgba(20, 50, 92, 0.85);
  color: #7AD3FF;
}

/* HEADER — image figée */
.bpm-header {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding: 2.25rem 1.5rem 1.25rem;
}
.bpm-cover {
  position: relative;
  width: auto;
  height: 34vh;
  max-height: 280px;
  aspect-ratio: 2/3;
  border-radius: 0.9rem;
  overflow: hidden;
  border: 1px solid rgba(122, 211, 255, 0.16);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 50px rgba(29, 116, 232, 0.18);
}
.bpm-cover-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (min-width: 768px) {
  .bpm-cover { height: 240px; }
}

/* BODY — texte scrollable */
.bpm-body {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}
.bpm-body-fade {
  position: sticky;
  top: 0;
  height: 1.5rem;
  margin-bottom: -1.5rem;
  background: linear-gradient(to bottom, #010B19, transparent);
  pointer-events: none;
  z-index: 1;
}
.bpm-body-inner {
  padding: 0.5rem 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.bpm-badge {
  align-self: flex-start;
  padding: 0.22rem 0.65rem;
  border-radius: 100px;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(14, 57, 117, 0.65);
  color: rgba(122, 211, 255, 0.85);
  border: 1px solid rgba(122, 211, 255, 0.18);
}
.bpm-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1.15;
}
.bpm-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 300;
}
.bpm-meta-dot { color: rgba(122, 211, 255, 0.4); }
.bpm-para {
  font-size: 0.95rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 300;
}
.bpm-already {
  margin-top: 0.5rem;
  font-size: 0.82rem;
  color: rgba(122, 211, 255, 0.6);
  text-decoration: none;
  transition: color 0.25s ease;
}
.bpm-already:hover { color: #7AD3FF; }

/* Bandeau prix promotionnel */
.bpm-promo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 1.25rem;
  background: rgba(2, 12, 26, 0.9);
}
.bpm-promo-old {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: line-through;
}
.bpm-promo-new {
  font-size: 1rem;
  font-weight: 700;
  color: #7AD3FF;
}
.bpm-promo-badge {
  margin-left: auto;
  padding: 0.22rem 0.6rem;
  border-radius: 100px;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7AD3FF;
  border: 1px solid rgba(122, 211, 255, 0.35);
  background: rgba(122, 211, 255, 0.08);
}

/* FOOTER sticky */
.bpm-footer {
  flex-shrink: 0;
  display: flex;
  gap: 0.65rem;
  align-items: stretch;
  padding: 1rem 1.25rem calc(1rem + env(safe-area-inset-bottom));
  border-top: 1px solid rgba(122, 211, 255, 0.12);
  background: rgba(2, 12, 26, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.bpm-field { flex: 1; display: flex; }
.bpm-input {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.25s ease, background 0.25s ease;
}
.bpm-input::placeholder { color: rgba(255, 255, 255, 0.35); }
.bpm-input:focus {
  border-color: rgba(122, 211, 255, 0.5);
  background: rgba(255, 255, 255, 0.09);
}
.bpm-input-error {
  border-color: rgba(255, 90, 90, 0.7);
}
.bpm-pay {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.4rem;
  border-radius: 100px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #fff;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}
.bpm-pay:disabled { opacity: 0.6; cursor: default; }

.bpm-error-msg {
  flex-shrink: 0;
  padding: 0 1.25rem 1rem;
  font-size: 0.75rem;
  color: rgba(255, 130, 130, 0.9);
  background: rgba(2, 12, 26, 0.9);
}

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .bpm-panel,
.modal-fade-leave-active .bpm-panel {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from .bpm-panel,
.modal-fade-leave-to .bpm-panel {
  transform: translateY(2%);
}
</style>
