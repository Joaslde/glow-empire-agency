<template>
  <div class="ps-page">
    <PersistentDiamondNav static-mode />
    <MobileMenu static-mode />

    <main class="ps-main">
      <div class="ps-card">
        <!-- État : validation en cours -->
        <template v-if="state === 'pending'">
          <div class="ps-spinner" />
          <h1 class="ps-title">Validation du paiement…</h1>
          <p class="ps-text">
            Nous confirmons ton paiement auprès de notre partenaire.
            Cela prend généralement quelques secondes.
          </p>
        </template>

        <!-- État : confirmé -->
        <template v-else-if="state === 'confirmed'">
          <div class="ps-check">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path d="M8 17.5l6 6L26 11" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="ps-title">Paiement confirmé</h1>
          <p class="ps-text">
            Merci pour ton achat<span v-if="book"> de « {{ book.title }} »</span>.
            Ton ebook est prêt à être téléchargé.
          </p>
          <button class="ps-btn glass-cta" :disabled="downloading" @click="download">
            <span v-if="!downloading">Télécharger maintenant</span>
            <span v-else>Préparation…</span>
          </button>
          <RouterLink to="/my-purchases" class="ps-link">
            Retrouver tous mes ebooks
          </RouterLink>
        </template>

        <!-- État : en attente prolongée / timeout -->
        <template v-else-if="state === 'timeout'">
          <div class="ps-clock">⏳</div>
          <h1 class="ps-title">Paiement en cours de validation</h1>
          <p class="ps-text">
            La confirmation peut prendre un instant. Si tu as bien payé,
            ton ebook apparaîtra dans ton espace dès la validation.
          </p>
          <button class="ps-btn glass-cta" @click="startPolling">
            Réessayer
          </button>
          <RouterLink to="/my-purchases" class="ps-link">
            Aller à « Mes achats »
          </RouterLink>
        </template>

        <!-- État : erreur -->
        <template v-else>
          <h1 class="ps-title">Lien invalide</h1>
          <p class="ps-text">
            Nous n'avons pas pu identifier ta transaction.
            Rends-toi dans ton espace pour retrouver tes ebooks.
          </p>
          <RouterLink to="/my-purchases" class="ps-btn glass-cta">
            Aller à « Mes achats »
          </RouterLink>
        </template>
      </div>
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { useLenis } from '@/composables/useLenis'
import PersistentDiamondNav from '@/components/ui/PersistentDiamondNav.vue'
import MobileMenu from '@/components/ui/MobileMenu.vue'
import FooterSection from '@/components/sections/FooterSection.vue'

const route = useRoute()
const lenis = useLenis()

const transactionId = route.query.tx || ''
const state = ref('pending') // pending | confirmed | timeout | error
const book = ref(null)
const lastSignedUrl = ref('')
const downloading = ref(false)

const MAX_ATTEMPTS = 10
const INTERVAL_MS = 2500
let attempts = 0
let timer = null

function triggerDownload(url) {
  if (!url) return
  const a = document.createElement('a')
  a.href = url
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

async function checkOnce() {
  const { data, error } = await supabase.functions.invoke('download-ebook', {
    body: { transactionId },
  })
  if (error) {
    // Erreur réseau/fonction : on retentera
    return false
  }
  if (data && data.found && data.signedUrl) {
    book.value = data.book || null
    lastSignedUrl.value = data.signedUrl
    return true
  }
  return false
}

async function poll() {
  attempts += 1
  let ok = false
  try {
    ok = await checkOnce()
  } catch (_) {
    ok = false
  }
  if (ok) {
    state.value = 'confirmed'
    // Téléchargement automatique (avec bouton manuel en secours)
    triggerDownload(lastSignedUrl.value)
    return
  }
  if (attempts >= MAX_ATTEMPTS) {
    state.value = 'timeout'
    return
  }
  timer = window.setTimeout(poll, INTERVAL_MS)
}

function startPolling() {
  if (!transactionId) {
    state.value = 'error'
    return
  }
  attempts = 0
  state.value = 'pending'
  poll()
}

async function download() {
  if (downloading.value) return
  downloading.value = true
  try {
    // Régénère une URL signée fraîche (les URLs sont à durée courte)
    const { data, error } = await supabase.functions.invoke('download-ebook', {
      body: { transactionId },
    })
    if (!error && data && data.signedUrl) {
      lastSignedUrl.value = data.signedUrl
    }
    triggerDownload(lastSignedUrl.value)
  } finally {
    downloading.value = false
  }
}

onMounted(() => {
  lenis.init()
  window.scrollTo(0, 0)
  startPolling()
})
onUnmounted(() => {
  if (timer) clearTimeout(timer)
  lenis.destroy()
})
</script>

<style scoped>
.ps-page {
  background: #010B19;
  min-height: 100vh;
  color: #fff;
  overflow-x: hidden;
}
.ps-main {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9rem 1.5rem 5rem;
}
.ps-card {
  max-width: 460px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(122, 211, 255, 0.14);
  background:
    radial-gradient(ellipse 90% 70% at 50% 0%, rgba(13, 57, 117, 0.35) 0%, transparent 70%),
    rgba(2, 24, 51, 0.4);
}

.ps-title {
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #fff;
}
.ps-text {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
}

.ps-check {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7AD3FF;
  background: rgba(122, 211, 255, 0.1);
  border: 1px solid rgba(122, 211, 255, 0.35);
  box-shadow: 0 0 40px rgba(122, 211, 255, 0.2);
}
.ps-clock { font-size: 2.5rem; }

.ps-spinner {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid rgba(122, 211, 255, 0.18);
  border-top-color: #7AD3FF;
  animation: ps-spin 0.9s linear infinite;
}
@keyframes ps-spin {
  to { transform: rotate(360deg); }
}

.ps-btn {
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.8rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  border: none;
  cursor: pointer;
}
.ps-btn:disabled { opacity: 0.6; cursor: default; }

.ps-link {
  font-size: 0.85rem;
  color: rgba(122, 211, 255, 0.6);
  text-decoration: none;
  transition: color 0.25s ease;
}
.ps-link:hover { color: #7AD3FF; }
</style>
