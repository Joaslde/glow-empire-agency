/**
 * Attend qu'un élément apparaisse dans le DOM (poll via requestAnimationFrame)
 * puis scrolle vers lui. Remplace les `setTimeout` à délai fixe qui échouent
 * silencieusement quand la page cible n'a pas fini de se monter (connexion
 * lente, diamant 3D encore en cours de traitement, etc.).
 */
export function scrollToSectionWhenReady(selector, { maxWaitMs = 2500 } = {}) {
  const start = performance.now()

  function tryScroll() {
    const el = document.querySelector(selector)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (performance.now() - start < maxWaitMs) {
      requestAnimationFrame(tryScroll)
    }
    // Au-delà du délai max, on abandonne silencieusement — la section
    // n'existe vraiment pas sur cette page.
  }

  requestAnimationFrame(tryScroll)
}
