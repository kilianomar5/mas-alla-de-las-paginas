import { createRouter, createWebHistory } from 'vue-router'
import BlogView from '../components/blog/BlogView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    }
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // Handle hash anchor links (e.g., #books, #map)
    if (to.hash) {
      const element = document.querySelector(to.hash)
      if (element) {
        // Adjust offset for fixed navbar (90px)
        const navbarHeight = 90
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight
        return { top: offsetTop, behavior: 'smooth' }
      }
    }
    return { top: 0 }
  }
})

export default router