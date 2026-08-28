<!-- src/components/navigation/MobileMenu.vue -->
<template>
  <!-- Mobile Navigation Overlay -->
  <div 
    class="mobile-overlay" 
    :class="{ 'mobile-overlay-open': isOpen }" 
    @click="closeMenu"
  >
    <div class="mobile-menu" @click.stop>
      <div class="mobile-menu-header">
  <Logo :light="true" @logo-click="handleLogoClick" />  <!-- ← add :light="true" here -->
  <button class="mobile-close" @click="closeMenu" aria-label="Close menu">
  </button>
</div>
      
      <ul class="mobile-nav-list">
        <li 
          class="mobile-nav-item" 
          v-for="item in navItems" 
          :key="item.id"
        >
          <a 
            :href="item.path" 
            class="mobile-nav-link"
            :class="{ 'mobile-nav-link-active': activeItem === item.id }"
            @click="handleNavClick(item.id)"
          >
            <span class="mobile-nav-icon">{{ item.icon }}</span>
            <span class="mobile-nav-text">{{ item.label }}</span>
            <span class="mobile-nav-indicator">
              <span class="indicator-dot"></span>
            </span>
          </a>
        </li>
      </ul>
      
      <div class="mobile-menu-footer">
        <div class="mobile-social">
          <a 
            v-for="social in socialLinks" 
            :key="social.id"
            :href="social.path" 
            class="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="social-icon">{{ social.icon }}</span>
            <!-- <span class="social-label">{{ social.label }}</span> -->
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  navItems: {
    type: Array,
    required: true
  },
  socialLinks: {
    type: Array,
    required: true
  },
  activeItem: {
    type: String,
    default: 'home'
  }
})

const emit = defineEmits(['close', 'nav-click', 'logo-click'])

const closeMenu = () => {
  emit('close')
}

const handleNavClick = (itemId) => {
  emit('nav-click', itemId)
}

const handleLogoClick = () => {
  emit('logo-click')
}
</script>

<style scoped>
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(21, 21, 21, 0.95);
  backdrop-filter: blur(20px);
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  max-height: 90vh;
  top: 90px;
}

.mobile-overlay-open {
  opacity: 1;
  visibility: visible;
  
}

.mobile-menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 400px;
  height: 100%;
  background: rgba(21, 21, 21, 0.98);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.4s ease;
  border-left: 1px solid rgba(223, 172, 41, 0.2);
}

.mobile-overlay-open .mobile-menu {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-close {
  background: none;
  border: none;
  color: var(--white);
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;
}

.mobile-close:hover {
  background: rgba(223, 172, 41, 0.2);
  color: var(--color-gold-light);
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-item {
  position: relative;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.03);
}

.mobile-nav-link:hover,
.mobile-nav-link-active {
  background: rgba(223, 172, 41, 1);
  transform: translateX(10px);
}

.mobile-nav-icon {
  font-size: 1.25rem;
  opacity: 0.8;
}

.mobile-nav-text {
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--white);
  opacity: 0.8;
  transition: all 0.3s ease;
  flex: 1;
}

.mobile-nav-link:hover .mobile-nav-text,
.mobile-nav-link-active .mobile-nav-text {
  color: var(--color-gold-light);
  opacity: 1;
}

.mobile-nav-indicator {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-nav-link:hover .mobile-nav-indicator,
.mobile-nav-link-active .mobile-nav-indicator {
  opacity: 1;
}

.indicator-dot {
  display: block;
  width: 8px;
  height: 8px;
  background: var(--gradient-gold);
  border-radius: 50%;
}

.mobile-menu-footer {
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-social {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  background: rgba(255, 255, 255, 0.03);
  color: var(--white);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(223, 172, 41, 0.1);
  color: var(--color-gold-light);
  transform: translateX(5px);
}

.social-icon {
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
}

.social-label {
  font-family: var(--font-body);
  font-size: 0.875rem;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 480px) {
  .mobile-menu {
    width: 100%;
    max-width: none;
    border-left: none;
  }
  
  .mobile-nav-link {
    padding: 0.875rem 1.25rem;
  }
}
</style>