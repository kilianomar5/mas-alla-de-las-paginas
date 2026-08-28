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
  'News, behind-the-scenes context, and updates from L.M. Douglas, author of the Chronicles of the Endless War epic fantasy series.'

useHead({
  title: 'Blog — L.M. Douglas',
  link: [{ rel: 'canonical', href: 'https://lmdouglas.com/blog' }],
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: 'Blog — L.M. Douglas' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: 'https://lmdouglas.com/blog' },
    { name: 'twitter:title', content: 'Blog — L.M. Douglas' },
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