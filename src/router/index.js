import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/protagoniste', component: () => import('@/views/ProtagonistePage.vue') },
  { path: '/empire', component: () => import('@/views/EmpirePage.vue') },
  { path: '/payment/success', component: () => import('@/views/PaymentSuccess.vue') },
  { path: '/my-purchases', component: () => import('@/views/MyPurchases.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  },
})
