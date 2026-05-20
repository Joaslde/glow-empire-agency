import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer = null

  function init(selector = '.reveal-up, .reveal-fade') {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el)
    })
  }

  function destroy() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  return { init, destroy }
}
