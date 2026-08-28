<template>
  <main>
    <h1 class="sr-only">
      L.M. Douglas — Chronicles of the Endless War, an epic fantasy series
    </h1>
    <HeroCarousel id="home" />
    <ChroniclesSection id="chronicles" />
    <MapSection id="map" />
    <NewsletterSection id="newsletter" />
    <FooterSection id="footer" />
  </main>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import FooterSection from '../components/footer/FooterSection.vue'
import ChroniclesSection from '../components/home/ChroniclesSection.vue'
import HeroCarousel from '../components/home/HeroCarousel.vue'
import MapSection from '../components/home/MapSection.vue'
import NewsletterSection from '../components/home/NewsletterSection.vue'

const description =
  'Enter the realm of Gharantia in L.M. Douglas’s Chronicles of the Endless War — an epic fantasy series of gods, war, and destiny. Read the books and join the newsletter.'

useHead({
  title: 'L.M. Douglas — Chronicles of the Endless War | Epic Fantasy Series',
  link: [{ rel: 'canonical', href: 'https://lmdouglas.com/' }],
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: 'L.M. Douglas — Chronicles of the Endless War' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: 'https://lmdouglas.com/' },
    { name: 'twitter:title', content: 'L.M. Douglas — Chronicles of the Endless War' },
    { name: 'twitter:description', content: description }
  ]
})
</script>

<style scoped>
main {
  min-height: calc(100vh - 90px);
}
</style>