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
  width: auto;
  height: auto;
}

.clock-icon.sm {
  width: 14px;
  height: 14px;
}

.clock-icon.md {
  width: 18px;
  height: 18px;
}

.clock-icon.lg {
  width: 22px;
  height: 22px;
}
</style>