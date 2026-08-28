<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container navbar-container">
      <Logo @logo-click="handleLogoClick" />
      <DesktopNav
        :nav-items="navItems"
        :active-item="activeItem"
        @nav-click="handleNavClick"
      />
      <BurgerMenu :is-open="isMobileOpen" @toggle="toggleMobileMenu" />
      <MobileMenu
        :is-open="isMobileOpen"
        :nav-items="navItems"
        :social-links="socialLinks"
        :active-item="activeItem"
        @close="closeMobileMenu"
        @nav-click="handleNavClick"
        @logo-click="handleLogoClick"
      />
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BurgerMenu from './BurgerMenu.vue'
import DesktopNav from './DesktopNav.vue'
import Logo from './Logo.vue'
import MobileMenu from './MobileMenu.vue'
import { navItems, socialLinks } from './navigation.js'

const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const isMobileOpen = ref(false)
const activeItem = ref('home')

// Update activeItem based on current route
const updateActiveItem = () => {
  if (route.path === '/') {
    // on home page, check hash
    if (route.hash === '#books') activeItem.value = 'books'
    else if (route.hash === '#map') activeItem.value = 'map'
    else activeItem.value = 'home'
  } else if (route.path === '/blog') {
    activeItem.value = 'blog'
  }
}

watch(() => route.fullPath, updateActiveItem, { immediate: true })

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleNavClick = (itemId) => {
  const item = navItems.find(i => i.id === itemId)
  if (item) {
    router.push(item.href)
  }
  if (isMobileOpen.value) closeMobileMenu()
}

const handleLogoClick = () => {
  router.push('/')
  if (isMobileOpen.value) closeMobileMenu()
}

const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value
  updateBodyScroll()
}

const closeMobileMenu = () => {
  isMobileOpen.value = false
  updateBodyScroll()
}

const updateBodyScroll = () => {
  document.body.style.overflow = isMobileOpen.value ? 'hidden' : ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* existing styles unchanged – keep as is */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  z-index: 1000;
  padding: 1.4rem 0 1rem 0;
  background: var(--white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.navbar-decoration {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.nav-decoration-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(223, 172, 41, 0.3) 20%,
    rgba(223, 172, 41, 0.6) 50%,
    rgba(223, 172, 41, 0.3) 80%,
    transparent 100%
  );
}

.nav-decoration-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.decoration-dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-gold-light);
  opacity: 0.5;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-decoration {
    display: none;
  }
}
</style>