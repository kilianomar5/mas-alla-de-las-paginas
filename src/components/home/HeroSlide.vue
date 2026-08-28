<!-- src/components/home/HeroSlide.vue -->
<template>
  <div
    class="hero-slide"
    :style="{ backgroundImage: slideLoaded ? `url(${bgSrc})` : 'none' }"
    :class="[`alignment-${slide.alignment}`, { loaded: slideLoaded }]"
  >
    <!-- Preload background image -->
    <img
      :src="bgSrc"
      @load="handleBgLoad"
      @error="handleBgLoad"
      style="display: none"
      alt=""
    />

    <!-- Background Overlay -->
    <div
      class="hero-overlay"
      :style="{ backgroundColor: slide.overlayColor }"
    ></div>

    <div class="container hero-container">
      <!-- Text Content Column -->
      <div class="hero-content">
        <!-- Main Title -->
        <h2 class="hero-title">
          <span
            v-for="(line, index) in slide.titleLines"
            :key="index"
            class="title-line"
          >
            {{ line }}
          </span>
        </h2>

        <!-- Subtitle (small text above title) -->
        <p class="hero-subtitle">
          {{ slide.subtitle }}
        </p>

        <!-- Description -->
        <p class="hero-description">
          {{ slide.description }}
        </p>

        <!-- CTA Button -->
        <template v-if="slide.ctaLink && slide.ctaLink !== '#'">
          <a
            :href="slide.ctaLink"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-hero"
          >
            {{ slide.ctaText }}
            <span class="btn-arrow">→</span>
          </a>
        </template>
        <template v-else>
          <button class="btn-hero btn-disabled" disabled>
            {{ slide.ctaText }}
            <ClockIcon size="sm" />
          </button>
        </template>
      </div>

      <!-- Book Cover Column -->
      <div class="hero-book-cover">
        <div class="book-cover-wrapper">
          <span v-if="slide.badge" class="hero-book-badge">
            <span
              v-for="(word, index) in slide.badge.split(' ')"
              :key="index"
              class="badge-word"
              >{{ word }}</span
            >
          </span>
          <img
            :src="slide.bookCover"
            :srcset="webpSrcset(slide.bookCover, [500, 1000])"
            sizes="(max-width: 1024px) 80vw, 460px"
            :alt="slide.title"
            class="book-cover-image"
            @load="handleCoverLoad"
            @error="handleCoverLoad"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ClockIcon from "../svgs/ClockIcon.vue";
import { responsiveBg, webpSrcset } from "../../utils/webp.js";
import { useViewportWidth } from "../../composables/useViewportWidth.js";

const props = defineProps({
  slide: {
    type: Object,
    required: true,
  },
});

// Serve a viewport-appropriate .webp background to capable browsers
// (smaller image on phones), original JPG as fallback.
const vw = useViewportWidth();
const bgSrc = computed(() => responsiveBg(props.slide.bgImage, vw.value));

const emit = defineEmits(["image-loaded"]);

const bgLoaded = ref(false);
const coverLoaded = ref(false);
const slideLoaded = ref(false);

const handleBgLoad = () => {
  bgLoaded.value = true;
  checkAllLoaded();
};

const handleCoverLoad = () => {
  coverLoaded.value = true;
  checkAllLoaded();
};

const checkAllLoaded = () => {
  if (bgLoaded.value && coverLoaded.value && !slideLoaded.value) {
    slideLoaded.value = true;
    emit("image-loaded", props.slide.id);
  }
};
</script>

<style scoped>
.hero-slide {
  position: relative;
  height: calc(100vh - 30px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: pre-line;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.hero-slide.loaded {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 3rem 2rem 0 5rem;
  width: 100%;
}

/* Text Content Column */
.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

/* Center all text elements within .hero-content */
.hero-subtitle,
.hero-title,
.hero-description {
  text-align: center;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.1px;
  margin-bottom: 0.2rem;
  /* text-transform: uppercase; */
  color: var(--white);
  white-space: pre-line;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 62px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0;
}

.title-line {
  background: linear-gradient(to bottom, #ffe607 0%, #f0b429 50%, #bd7500 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
}

.hero-description {
  font-family: var(--font-body);
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  font-weight: 700;
  margin-top: 0.2rem;
  color: var(--white);
  margin-left: auto;
  margin-right: auto;
}

/* Center the CTA button */
.btn-hero {
  display: inline-flex;
  width: 172px;
  height: 54px;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--gold-light);
  background: var(--black);
  padding: 0.6rem 0cm;
  border-radius: 8px;
  border: 1px solid var(--gold-light);
  transition: all 0.3s ease;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
}

.btn-hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--gold-dark) 0%,
    var(--gold-light) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  border-radius: 8px;
}

.btn-hero:hover::before {
  opacity: 0.15;
}

.btn-hero:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(223, 172, 41, 0.3);
}

.btn-hero.btn-disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-hero.btn-disabled:hover {
  transform: none;
  box-shadow: none;
}

.btn-hero.btn-disabled:hover::before {
  opacity: 0;
}

.btn-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.btn-hero:hover .btn-arrow {
  transform: translateX(5px);
}

/* Book Cover Column */
.hero-book-cover {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}

.book-cover-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 460px;
}

.book-cover-image {
  max-width: 460px;
  max-height: 460px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6));
  transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
  transition:
    transform 0.5s ease,
    filter 0.5s ease;
  position: relative;
  z-index: 2;
  background: transparent;
}

.hero-book-badge {
  position: absolute;
  top: -0.3rem;
  right: 70px;
  z-index: 3;
  width: 78px;
  height: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 50%;
  font-family: var(--font-body);
  font-weight: 900;
  font-size: 1rem;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--black);
  background: linear-gradient(
    135deg,
    var(--gold-dark) 0%,
    var(--gold-light) 50%,
    var(--gold-dark) 100%
  );
  border: 4px solid var(--gold-light);
  box-shadow:
    0 6px 14px rgba(0, 0, 0, 0.45),
    inset 2px 2px 5px rgba(0, 0, 0, 0.5),
    inset -2px -2px 5px rgba(255, 255, 255, 0.45);
}

.badge-word {
  display: block;
}

.hero-book-cover:hover .book-cover-image {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8));
}

/* SIMPLIFIED ALIGNMENT - USING FLEX DIRECTION */
.alignment-left .hero-container {
  display: flex;
  flex-direction: row;
}

.alignment-right .hero-container {
  display: flex;
  flex-direction: row-reverse;
}

/* Make sure both children take equal space */
.alignment-left .hero-content,
.alignment-right .hero-content,
.alignment-left .hero-book-cover,
.alignment-right .hero-book-cover {
  flex: 1;
}

/* Responsive - Stack vertically on smaller screens */
@media (max-width: 1024px) {
  .alignment-left .hero-container,
  .alignment-right .hero-container {
    flex-direction: column;
    gap: 3rem;
  }

  .hero-content {
    order: 2;
  }

  .hero-book-cover {
    order: 1;
  }

  .book-cover-image {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .alignment-left .hero-container,
  .alignment-right .hero-container {
    gap: 0rem;
  }
  .hero-container {
  }
  .hero-title {
    font-size: clamp(2.5rem, 8vw, 4rem);
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-description {
    font-size: 16px;
  }

  .btn-hero {
    width: 180px;
    height: 50px;
    padding: 0.875rem 1.2rem;
    font-size: 1rem;
    margin-bottom: 5rem;
  }

  .book-cover-image {
    max-width: 320px;
    margin-top: 4rem;
  }

  .hero-container {
    padding: 2rem 1rem 0 1rem;
    min-height: fit-content;
  }
  .hero-book-badge {
    top: 2rem;
    right: 50px;
  }
}
@media (max-width: 400px) {
  .hero-slide {
    position: relative;
    height: fit-content;
  }
  .hero-title {
    font-size: clamp(2.5rem, 8vw, 4rem);
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-description {
    font-size: 16px;
  }

  .btn-hero {
    width: 180px;
    height: 50px;
    padding: 0.875rem 1.2rem;
    font-size: 1rem;
  }

  .book-cover-image {
    max-width: 360px;
    margin-top: 1rem;
  }

  .hero-container {
    padding: 2rem 1rem 0 1rem;
    margin-top: 30px;
    min-height: fit-content;
    margin-bottom: 5rem;
  }
}
</style>
