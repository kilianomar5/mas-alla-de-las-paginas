<template>
  <div id="app">
    <Navbar />
    <router-view />
    <!-- Optional: Global Footer if not inside views – but we put Footer inside HomeView only.
         If you want Footer on every page, uncomment below and remove from HomeView/BlogView -->
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import { nextTick, onMounted } from 'vue';
import Navbar from './components/navigation/Navbar.vue';
// import Footer from '@/components/footer/FooterSection.vue'

// Global signal for the build-time prerenderer (renderAfterDocumentEvent).
// Content-rich routes may fire it sooner (e.g. HeroCarousel after its images
// load); this guarantees every route — including /blog — resolves the snapshot.
onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    document.dispatchEvent(new Event('app-prerendered'));
  }, 1500);
});
</script>

<style>
#app {
  min-height: 100vh;
}
</style>