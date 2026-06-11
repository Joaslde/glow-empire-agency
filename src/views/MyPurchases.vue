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

        <template v-if="!sent">
          <h1 class="mp-title">Retrouver mes ebooks</h1>
          <p class="mp-text">
            Entre l'email utilisé lors de ton achat. Nous t'enverrons un email
            contenant le lien de téléchargement de chacun de tes ebooks.
          </p>
          <form class="mp-form" @submit.prevent="resend">
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
              <span v-if="!loading">Recevoir mes ebooks par email</span>
              <span v-else>Envoi…</span>
            </button>
          </form>
        </template>

        <template v-else>
          <div class="mp-check">
            <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
              <path d="M8 17.5l6 6L26 11" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="mp-title">C'est envoyé !</h1>
          <p class="mp-text">
            Si des achats sont rattachés à <strong>{{ email }}</strong>, tu viens de recevoir
            un email avec tes liens de téléchargement.
          </p>
          <div class="mp-spam">
            📬 <strong>Pense à vérifier tes spams / courriers indésirables.</strong>
            L'email peut parfois s'y trouver. Ajoute
            <strong>contact@glow-empire-agency.com</strong> à tes contacts pour ne plus le manquer.
          </div>
          <button class="mp-link" @click="sent = false">Utiliser un autre email</button>
        </template>

        <p v-if="message" class="mp-message mp-message-error">{{ message }}</p>
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

const email = ref(localStorage.getItem('customer_email') || '')
const loading = ref(false)
const sent = ref(false)
const message = ref('')

async function resend() {
  loading.value = true
  message.value = ''
  const cleanEmail = email.value.trim()
  try {
    const { error } = await supabase.functions.invoke('resend-purchases', {
      body: { email: cleanEmail },
    })
    if (error) {
      message.value = "Une erreur est survenue. Réessaie dans un instant."
      return
    }
    localStorage.setItem('customer_email', cleanEmail)
    sent.value = true
  } catch (_) {
    message.value = "Une erreur est survenue. Réessaie dans un instant."
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  lenis.init()
  window.scrollTo(0, 0)
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

.mp-check {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7AD3FF;
  background: rgba(122, 211, 255, 0.1);
  border: 1px solid rgba(122, 211, 255, 0.35);
}

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

.mp-spam {
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  padding: 0.9rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(122, 211, 255, 0.25);
  background: rgba(122, 211, 255, 0.07);
}
.mp-spam strong { color: #7AD3FF; font-weight: 600; }

.mp-message {
  font-size: 0.82rem;
}
.mp-message-error { color: rgba(255, 130, 130, 0.9); }
</style>
