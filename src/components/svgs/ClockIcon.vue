<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="clock-icon"
    :class="size"
  >
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
});
</script>

<style scoped>
.clock-icon {
  flex-shrink: 0;
  color: var(--gold-dark);
  stroke: currentColor;
  width: fit-content;
}

/* Make sure icon shows in disabled button */
.btn-hero.btn-disabled .clock-icon {
  color: var(--gold-light);
  stroke: var(--gold-light);
  opacity: 1;
}

.clock-icon.sm {
  width: 22px;
  height: 22px;
}

.clock-icon.md {
  width: 20px;
  height: 20px;
}

.clock-icon.lg {
  width: 24px;
  height: 24px;
}
</style>