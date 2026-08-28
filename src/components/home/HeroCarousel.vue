<!-- src/components/home/HeroCarousel.vue -->
<template>
  <section class="hero-carousel">
    <!-- Loading Screen -->
    <transition name="fade">
      <div v-if="isInitialLoading" class="carousel-loading">
        <div class="hourglass">
          <div class="hourglass-top"></div>
          <div class="hourglass-bottom"></div>
          <div class="sand"></div>
        </div>
        <p class="loading-text">Loading</p>
      </div>
    </transition>

    <!-- Carousel Container -->
    <div class="carousel-container" :class="{ 'is-loading': isInitialLoading }">
      <!-- Slides -->
      <div
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <HeroSlide
          v-for="(slide, index) in slides"
          :key="slide.id"
          :slide="slide"
          :slide-index="index"
          class="carousel-slide"
          @image-loaded="handleImageLoaded(slide.id)"
        />
        class="carousel-slide" @image-loaded="handleImageLoaded(slide.id)" />
      </div>

      <!-- Indicators/Dots -->
      <div class="carousel-indicators">
        <button
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="carousel-indicator"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
        >
          <div
            class="indicator-progress"
            v-if="currentIndex === index && !isTransitioning"
          ></div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { heroSlides } from "./heroData.js";
import HeroSlide from "./HeroSlide.vue";

const slides = heroSlides;
const currentIndex = ref(0);
const isInitialLoading = ref(true);
const isTransitioning = ref(false);
const loadedImages = ref(new Set());
let autoplayInterval;

let prerenderSignalled = false;

// Tells the build-time prerenderer (renderAfterDocumentEvent) that the hero
// content is on screen and it's safe to snapshot the HTML. Guarded so it only
// ever fires once, whether triggered by images loading or the safety fallback.
const signalPrerenderReady = () => {
  if (prerenderSignalled) return;
  prerenderSignalled = true;
  document.dispatchEvent(new Event("app-prerendered"));
};

const handleImageLoaded = (slideId) => {
  loadedImages.value.add(slideId);

  // Check if all initial images are loaded
  if (loadedImages.value.size === slides.length) {
    setTimeout(() => {
      isInitialLoading.value = false;
      startAutoplay();
      signalPrerenderReady();
    }, 500);
  }
};

const nextSlide = () => {
  if (isTransitioning.value) return;

  const nextIndex = (currentIndex.value + 1) % slides.length;
  goToSlide(nextIndex);
};

const goToSlide = (index) => {
  if (isTransitioning.value || currentIndex.value === index) return;

  isTransitioning.value = true;
  currentIndex.value = index;

  // Wait for transition to complete
  setTimeout(() => {
    isTransitioning.value = false;
  }, 1200); // Match the transition duration
};

const startAutoplay = () => {
  stopAutoplay();
  autoplayInterval = setInterval(nextSlide, 8000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
};

let prerenderFallback;

onMounted(() => {
  // Autoplay will start after images load.
  // Safety net: signal the prerenderer even if an image never fires `load`,
  // so a slow/failed asset can't hang the build snapshot.
  prerenderFallback = setTimeout(signalPrerenderReady, 4000);
});

onUnmounted(() => {
  stopAutoplay();
  clearTimeout(prerenderFallback);
});
</script>

<style scoped>
.hero-carousel {
  position: relative;
  overflow: hidden;
  padding-bottom: 3rem;
  min-height: 78vh;
}

/* Loading Screen */
.carousel-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.hourglass {
  width: 60px;
  height: 80px;
  position: relative;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 10px 30px rgba(223, 172, 41, 0.4));
}

.hourglass-top,
.hourglass-bottom {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  position: absolute;
  left: 0;
}

.hourglass-top {
  top: 0;
  border-top: 35px solid var(--gold-dark);
  animation: sand-flow-top 2.5s ease-in-out infinite;
}

.hourglass-bottom {
  bottom: 0;
  border-bottom: 35px solid var(--gold-dark);
  animation: sand-flow-bottom 2.5s ease-in-out infinite;
}

.sand {
  position: absolute;
  width: 4px;
  height: 20px;
  background: var(--gold-dark);
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  animation: sand-fall 2.5s ease-in-out infinite;
  opacity: 0.8;
  box-shadow: 0 0 10px rgba(223, 172, 41, 0.5);
}

@keyframes sand-flow-top {
  0%,
  100% {
    border-top-width: 35px;
    opacity: 1;
  }
  50% {
    border-top-width: 32px;
    opacity: 0.95;
  }
}

@keyframes sand-flow-bottom {
  0%,
  100% {
    border-bottom-width: 32px;
    opacity: 0.95;
  }
  50% {
    border-bottom-width: 35px;
    opacity: 1;
  }
}

@keyframes sand-fall {
  0%,
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-80%) scale(0.8);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) translateY(80%) scale(1);
  }
}

.loading-text {
  font-family: var(--font-body);
  font-size: 1.25rem;
  color: var(--gold-dark);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  animation: pulse 1.5s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(223, 172, 41, 0.5);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.carousel-container.is-loading {
  opacity: 0;
}

.carousel-track {
  display: flex;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
}

/* Indicators */
.carousel-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 10;
}

.carousel-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: all 0.3s ease;
}

.carousel-indicator:hover {
  border-color: var(--gold-dark);
  background: rgba(97, 28, 45, 0.3);
}

.carousel-indicator.active {
  border-color: var(--gold-dark);
  background: var(--gold-dark);
}

.indicator-progress {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--red);
  animation: progress 6s linear infinite;
}

@keyframes progress {
  0% {
    clip-path: polygon(50% 50%, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  100% {
    clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-indicators {
    bottom: 1.5rem;
  }

  .hourglass {
    width: 50px;
    height: 70px;
  }

  .hourglass-top,
  .hourglass-bottom {
    border-left-width: 25px;
    border-right-width: 25px;
  }

  .hourglass-top {
    border-top-width: 30px;
  }

  .hourglass-bottom {
    border-bottom-width: 30px;
  }
}
</style>
