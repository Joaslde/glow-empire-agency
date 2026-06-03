<template>
  <div class="mp-page">
    <PersistentDiamondNav static-mode />
    <MobileMenu static-mode />

    <main class="mp-main">
      <div class="mp-card">
        <div class="section-label">
          <span class="section-label-line" />
          <span>Mes ebooks</span>
        </div>

        <!-- Étape 1 : email -->
        <template v-if="step === 'email'">
          <h1 class="mp-title">Retrouver mes ebooks</h1>
          <p class="mp-text">
            Entre l'email utilisé lors de ton achat. Nous t'enverrons un code de connexion.
          </p>
          <form class="mp-form" @submit.prevent="sendCode">
            <input
              v-model="email"
              type="email"
              inputmode="email"
              autocomplete="email"
              placeholder="Votre email"
              class="mp-input"
              required
            />
            <button type="submit" class="mp-btn glass-cta" :disabled="loading">
              <span v-if="!loading">Recevoir mon code</span>
              <span v-else>Envoi…</span>
            </button>
          </form>
        </template>

        <!-- Étape 2 : code OTP -->
        <template v-else-if="step === 'code'">
          <h1 class="mp-title">Entre ton code</h1>
          <p class="mp-text">
            Un code à 6 chiffres a été envoyé à <strong>{{ email }}</strong>.
          </p>
          <form class="mp-form" @submit.prevent="verifyCode">
            <input
              v-model="code"
              type="text"
              inputmode="numeric"
              maxlength="6"
              placeholder="••••••"
              class="mp-input mp-input-code"
              required
            />
            <button type="submit" class="mp-btn glass-cta" :disabled="loading">
              <span v-if="!loading">Se connecter</span>
              <span v-else>Vérification…</span>
            </button>
          </form>
          <button class="mp-link" @click="step = 'email'">Changer d'email</button>
        </template>

        <!-- Étape 3 : liste -->
        <template v-else>
          <h1 class="mp-title">Mes ebooks</h1>
          <p v-if="purchases.length === 0 && !loading" class="mp-text">
            Aucun achat trouvé pour cet email.
          </p>
          <ul v-else class="mp-list">
            <li v-for="p in purchases" :key="p.book_id" class="mp-item">
              <div class="mp-item-info">
                <span class="mp-item-title">{{ p.title }}</span>
                <span class="mp-item-date">Acheté le {{ formatDate(p.created_at) }}</span>
              </div>
              <button
                class="mp-dl"
                :disabled="dlId === p.book_id"
                @click="downloadBook(p.book_id)"
              >
                <span v-if="dlId !== p.book_id">Télécharger</span>
                <span v-else>…</span>
              </button>
            </li>
          </ul>
          <button class="mp-link" @click="signOut">Se déconnecter</button>
        </template>

        <p v-if="message" class="mp-message" :class="{ 'mp-message-error': isError }">
          {{ message }}
        </p>
      </div>
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useLenis } from '@/composables/useLenis'
import PersistentDiamondNav from '@/components/ui/PersistentDiamondNav.vue'
import MobileMenu from '@/components/ui/MobileMenu.vue'
import FooterSection from '@/components/sections/FooterSection.vue'

const lenis = useLenis()

const step = ref('email') // email | code | list
const email = ref(localStorage.getItem('customer_email') || '')
const code = ref('')
const loading = ref(false)
const message = ref('')
const isError = ref(false)
const purchases = ref([])
const dlId = ref('')

function setMessage(msg, error = false) {
  message.value = msg
  isError.value = error
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric',
    })
  } catch (_) {
    return ''
  }
}

async function sendCode() {
  loading.value = true
  setMessage('')
  const cleanEmail = email.value.trim()
  const { error } = await supabase.auth.signInWithOtp({
    email: cleanEmail,
    options: { shouldCreateUser: true },
  })
  loading.value = false
  if (error) {
    setMessage("Impossible d'envoyer le code. Réessaie dans un instant.", true)
    return
  }
  localStorage.setItem('customer_email', cleanEmail)
  step.value = 'code'
}

async function verifyCode() {
  loading.value = true
  setMessage('')
  const { error } = await supabase.auth.verifyOtp({
    email: email.value.trim(),
    token: code.value.trim(),
    type: 'email',
  })
  loading.value = false
  if (error) {
    setMessage('Code invalide ou expiré.', true)
    return
  }
  step.value = 'list'
  loadPurchases()
}

async function loadPurchases() {
  loading.value = true
  setMessage('')
  const { data, error } = await supabase
    .from('purchases')
    .select('book_id, created_at, books(title)')
    .order('created_at', { ascending: false })
  loading.value = false
  if (error) {
    setMessage('Erreur de chargement de tes achats.', true)
    return
  }
  // Dédoublonne par book_id et aplatit le titre
  const seen = new Set()
  purchases.value = (data || [])
    .filter((p) => {
      if (seen.has(p.book_id)) return false
      seen.add(p.book_id)
      return true
    })
    .map((p) => ({
      book_id: p.book_id,
      created_at: p.created_at,
      title: p.books?.title || p.book_id,
    }))
}

async function downloadBook(bookId) {
  if (dlId.value) return
  dlId.value = bookId
  setMessage('')
  try {
    const { data, error } = await supabase.functions.invoke('download-ebook', {
      body: { bookId },
    })
    if (error || !data?.signedUrl) {
      setMessage('Téléchargement indisponible. Réessaie.', true)
      return
    }
    const a = document.createElement('a')
    a.href = data.signedUrl
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
  } finally {
    dlId.value = ''
  }
}

async function signOut() {
  await supabase.auth.signOut()
  purchases.value = []
  code.value = ''
  step.value = 'email'
}

onMounted(async () => {
  lenis.init()
  window.scrollTo(0, 0)
  // Session déjà active ? (magic link / retour) → afficher directement la liste
  const { data } = await supabase.auth.getSession()
  if (data?.session) {
    step.value = 'list'
    loadPurchases()
  }
})
onUnmounted(() => {
  lenis.destroy()
})
</script>

<style scoped>
.mp-page {
  background: #010B19;
  min-height: 100vh;
  color: #fff;
  overflow-x: hidden;
}
.mp-main {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9rem 1.5rem 5rem;
}
.mp-card {
  max-width: 460px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 2.75rem 2rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(122, 211, 255, 0.14);
  background:
    radial-gradient(ellipse 90% 70% at 50% 0%, rgba(13, 57, 117, 0.35) 0%, transparent 70%),
    rgba(2, 24, 51, 0.4);
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

.mp-title {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #fff;
}
.mp-text {
  font-size: 0.92rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
}
.mp-text strong { color: rgba(255, 255, 255, 0.8); font-weight: 500; }

.mp-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.mp-input {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 0.92rem;
  outline: none;
  transition: border-color 0.25s ease, background 0.25s ease;
}
.mp-input::placeholder { color: rgba(255, 255, 255, 0.35); }
.mp-input:focus {
  border-color: rgba(122, 211, 255, 0.5);
  background: rgba(255, 255, 255, 0.09);
}
.mp-input-code {
  text-align: center;
  letter-spacing: 0.5em;
  font-size: 1.2rem;
  font-weight: 600;
}

.mp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.6rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  border: none;
  cursor: pointer;
}
.mp-btn:disabled { opacity: 0.6; cursor: default; }

.mp-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0.5rem 0 0;
  padding: 0;
}
.mp-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.1rem;
  border-radius: 0.9rem;
  border: 1px solid rgba(122, 211, 255, 0.12);
  background: rgba(2, 24, 51, 0.4);
}
.mp-item-info { display: flex; flex-direction: column; gap: 0.2rem; }
.mp-item-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
}
.mp-item-date {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 300;
}
.mp-dl {
  flex-shrink: 0;
  padding: 0.55rem 1.1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #010B19;
  background: #7AD3FF;
  border: none;
  cursor: pointer;
  transition: background 0.25s ease;
}
.mp-dl:hover { background: #a3e1ff; }
.mp-dl:disabled { opacity: 0.6; cursor: default; }

.mp-link {
  align-self: flex-start;
  background: none;
  border: none;
  padding: 0;
  font-size: 0.82rem;
  color: rgba(122, 211, 255, 0.6);
  cursor: pointer;
  text-decoration: none;
  transition: color 0.25s ease;
}
.mp-link:hover { color: #7AD3FF; }

.mp-message {
  font-size: 0.82rem;
  color: rgba(122, 211, 255, 0.7);
}
.mp-message-error { color: rgba(255, 130, 130, 0.9); }
</style>
