<!-- src/components/navigation/Logo.vue -->
<template>
  <div class="logo">
    <a href="/" class="logo-link" @click.prevent="handleClick">
      <img
        :src="logoSrc"
        alt="LM Douglas Logo"
        class="logo-image"
      />
      <span class="logo-text">LM DOUGLAS</span>
    </a>
  </div>
</template>

<script setup>
import { supportsWebp } from '../../utils/webp.js'
import logoPng from '../../assets/images/logo-img.png'
import logoWebp from '../../assets/images/logo-img.webp'

// Imported asset (so it resolves in production) + .webp where supported.
const logoSrc = supportsWebp() ? logoWebp : logoPng

const emit = defineEmits(['logo-click'])

const handleClick = () => {
  emit('logo-click')
}
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1002;
}

.logo-link {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-decoration: none;
  cursor: pointer;
}

.logo-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
  transition: all 0.3s ease;
  padding-bottom: 6px;
}

.logo-text {
  font-family: var(--font-heading, Georgia, serif);
  font-size: 2.2rem; 
  letter-spacing: -0.01em;
  color: var(--color-white);
  transition: all 0.3s ease;
  z-index: 2;
}

.logo-link:hover .logo-image,
.logo-link:hover .logo-text {
  transform: scale(1.05);
}

/* Glow effect (optional) */
.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(
    circle at center,
    rgba(223, 172, 41, 0.3) 0%,
    rgba(255, 230, 7, 0.1) 40%,
    transparent 70%
  );
  filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.logo-link:hover .logo-glow {
  opacity: 1;
}

/* Responsive */
@media (max-width: 1024px) {
  .logo-text {
    font-size: 1.75rem;
  }
  
  .logo-image {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 1.5rem;
  }
  
  .logo-image {
    width: 60px;
    height: 60px;
  }
  
  .logo-link {
    gap: 0.75rem;
  }
}

@media (max-width: 640px) {
  .logo-text {
    font-size: 1.25rem;
  }
  
  .logo-image {
    width: 50px;
    height: 50px;
  }
  
  .logo-link {
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .logo-text {
    display: block; 
    /* color: white; */
    margin-left: 1rem;
    font-size: 28px;
  }
  
  .logo-link {
    gap: 0;
  }
}
</style>