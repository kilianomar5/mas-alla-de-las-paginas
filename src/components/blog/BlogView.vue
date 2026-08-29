<template>
  <div class="blog-page">
    <main class="blog-main">
      <BlogSection />
    </main>
    
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import BlogSection from './BlogSection.vue';

const description =
  'Noticias, detrás de escena y actualizaciones sobre las obras literarias de Adrián Andrés Díaz Fortes y Samuel Alemán Durán.'

useHead({
  title: 'Blog — Más Allá de las Páginas',
  link: [{ rel: 'canonical', href: 'https://kilianomar5.github.io/mas-alla-de-las-paginas/blog' }],
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: 'Blog — Más Allá de las Páginas' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: 'https://kilianomar5.github.io/mas-alla-de-las-paginas/blog' },
    { name: 'twitter:title', content: 'Blog — Más Allá de las Páginas' },
    { name: 'twitter:description', content: description }
  ]
})
</script>

<style scoped>
.blog-page {
  min-height: calc(100vh - 90px);
  margin-top: 90px;
  padding-bottom: 0;
}
.blog-main {
  height: 100%;
}
</style>