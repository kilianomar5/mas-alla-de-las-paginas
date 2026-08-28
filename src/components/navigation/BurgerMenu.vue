<!-- src/components/navigation/BurgerMenu.vue -->
<template>
  <!-- Mobile Toggle Button -->
  <button
    class="burger-toggle"
    @click="toggleMenu"
    :aria-label="isOpen ? 'Close menu' : 'Open menu'"
    :class="{ 'burger-open': isOpen }"
  >
    <span class="burger-line" :class="{ 'burger-line-1': isOpen }"></span>
    <span class="burger-line" :class="{ 'burger-line-2': isOpen }"></span>
    <span class="burger-line" :class="{ 'burger-line-3': isOpen }"></span>
  </button>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle"]);

const toggleMenu = () => {
  emit("toggle");
};
</script>

<style scoped>
.burger-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  z-index: 1002;
  width: 40px;
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.burger-line {
  display: block;
  width: 30px;
  height: 4px;
  background: var(--black);
  transition: all 0.3s ease;
  border-radius: 2px;
}

/* When burger is open, lines turn to X */
.burger-open .burger-line {
  background: var(--black);
}

.burger-line-1 {
  transform: rotate(45deg) translate(7px, 7px);
}

.burger-line-2 {
  opacity: 0;
}

.burger-line-3 {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Responsive */
@media (max-width: 768px) {
  .burger-toggle {
    display: flex;
  }
}
</style>
