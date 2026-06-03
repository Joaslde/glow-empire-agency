import { router } from '@/router/index.js'

const KKIAPAY_SRC = 'https://cdn.kkiapay.me/k.js'
const PUBLIC_KEY = import.meta.env.VITE_KKIAPAY_PUBLIC_KEY
const SANDBOX = import.meta.env.VITE_KKIAPAY_SANDBOX !== 'false'

let scriptPromise = null
let listenersAttached = false
// Contexte de la transaction en cours (email + bookId) pour la redirection.
let pendingContext = { email: '', bookId: '' }

/**
 * Charge le SDK Kkiapay une seule fois (promesse mémoïsée).
 */
function loadScript() {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.openKkiapayWidget) {
      resolve()
      return
    }
    const existing = document.querySelector(`script[src="${KKIAPAY_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', reject)
      return
    }
    const s = document.createElement('script')
    s.src = KKIAPAY_SRC
    s.async = true
    s.onload = () => resolve()
    s.onerror = reject
    document.body.appendChild(s)
  })
  return scriptPromise
}

/**
 * Branche les listeners succès/échec une seule fois.
 */
function attachListeners() {
  if (listenersAttached) return
  if (typeof window.addSuccessListener === 'function') {
    window.addSuccessListener((response) => {
      const txId = response?.transactionId || response?.transaction_id || ''
      const { email, bookId } = pendingContext
      const query = new URLSearchParams({
        tx: txId,
        book: bookId || '',
        email: email || '',
      }).toString()
      router.push(`/payment/success?${query}`)
    })
  }
  if (typeof window.addFailedListener === 'function') {
    window.addFailedListener((error) => {
      console.error('[Kkiapay] paiement échoué', error)
    })
  }
  listenersAttached = true
}

export function useKkiapay() {
  /**
   * Ouvre le widget de paiement Kkiapay.
   * @param {{ amount:number, email:string, bookId:string, name?:string }} opts
   */
  async function openCheckout({ amount, email, bookId, name }) {
    await loadScript()
    attachListeners()

    pendingContext = { email, bookId }

    if (typeof window.openKkiapayWidget !== 'function') {
      throw new Error('Kkiapay SDK indisponible (openKkiapayWidget manquant).')
    }

    window.openKkiapayWidget({
      amount,
      key: PUBLIC_KEY,
      sandbox: SANDBOX,
      position: 'center',
      theme: '#00A3FF',
      email,
      name: name || '',
      countries: ['BJ'],
      // Métadonnées rattachées à la transaction (récupérées côté webhook).
      data: JSON.stringify({ email, bookId }),
    })
  }

  return { openCheckout }
}
