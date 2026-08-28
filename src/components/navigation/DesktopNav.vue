<!-- src/components/navigation/DesktopNav.vue -->
<template>
  <div class="desktop-nav">
    <ul class="nav-list">
      <NavLink 
        v-for="item in navItems" 
        :key="item.id"
        :item="item"
        :active="activeItem === item.id"
        @nav-click="handleNavClick"
      />
    </ul>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import NavLink from './NavLink.vue'

const props = defineProps({
  navItems: {
    type: Array,
    required: true
  },
  activeItem: {
    type: String,
    default: 'home'
  }
})

const emit = defineEmits(['nav-click'])

const handleNavClick = (itemId) => {
  emit('nav-click', itemId)
}
</script>

<style scoped>
.desktop-nav {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-list {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
}
</style>