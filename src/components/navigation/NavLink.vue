<!-- src/components/navigation/NavLink.vue -->
<template>
  <li class="nav-item">
    <a 
      :href="item.href" 
      class="nav-link"
      :class="{ 'nav-link-active': active }"
      @click.prevent="handleClick"
    >
      <span class="nav-text">{{ item.label }}</span>
      <span class="nav-underline"></span>
    </a>
  </li>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['nav-click'])

const handleClick = () => {
  emit('nav-click', props.item.id)
}
</script>

<style scoped>
/* Keep your existing styles exactly as they are */
.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
}

.nav-text {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-white);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.nav-link:hover .nav-text {
  color: var(--color-gold-light);
  opacity: 1;
  transform: translateY(-2px);
}

.nav-link-active .nav-text {
  color: var(--red);
  opacity: 1;
}

.nav-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-gold-horizontal);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.nav-link:hover .nav-underline,
.nav-link-active .nav-underline {
  width: 100%;
}
</style>