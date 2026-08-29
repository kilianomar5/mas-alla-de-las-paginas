<template>
  <main>
    <h1 class="sr-only">
      Mas Allá de las Páginas — No solo páginas, sino un mundo de fantasía épica y aventuras. 
    </h1>
    <HeroCarousel id="inicio" />
    <ChroniclesSection id="libros" />
    <MapSection id="mapa" />
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
  'Entróate en nuestras historias: desde el contraste de "Entre Sevilla y el Desierto" hasta la acción de "La Ciudad del Pecado Miami", "A Safehouse in the Hills" y "Un Crimen Elegante".'

useHead({
  title: 'Mas Allá de las Páginas',
  link: [{ rel: 'canonical', href: 'https://kilianomar5.github.io/mas-alla-de-las-paginas/' }],
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: 'Mas Allá de las Páginas' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: 'https://kilianomar5.github.io/mas-alla-de-las-paginas/' },
    { name: 'twitter:title', content: 'Mas Allá de las Páginas' },
    { name: 'twitter:description', content: description }
  ]
})
</script>

<style scoped>
main {
  min-height: calc(100vh - 90px);
}
</style>