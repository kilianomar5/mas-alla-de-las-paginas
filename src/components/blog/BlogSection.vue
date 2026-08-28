<!-- src/components/blog/BlogSection.vue -->
<template>
  <section class="blog-section">
    <iframe
      id="blogIframe"
      src="https://lmdouglasauthor.blogspot.com/"
      width="100%"
      height="100%"
      title="LM Douglas Author Blog"
    ></iframe>
  </section>

</template>

<script setup>
</script>

<style scoped>
.blog-section {
  width: 100vw;
  height: calc(100vh - 90px); /* Full height minus navbar */
  background: var(--black);
  position: relative;
  overflow: hidden;
    padding-top: 0;
    padding-bottom: 0;
}

#blogIframe {
  border: none;
  display: block;
  width: 100%;
  height: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .blog-section {
    height: calc(100vh - 90px);
  }
}
</style>