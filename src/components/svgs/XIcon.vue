<template>
  <a :href="href" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="X (Twitter)">
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 50 50">
      <mask id="xIconMask">
        <rect x="0" y="0" width="50" height="50" fill="white" />
        <path
          d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
          fill="black"
          transform="translate(25 25) scale(1.32) translate(-12 -12)"
        />
      </mask>
      <path
        d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 Z"
        fill="#dfac29"
        mask="url(#xIconMask)"
      />
    </svg>
  </a>
</template>

<script>
export default {
  name: 'XIcon',
  props: {
    href: {
      type: String,
      default: 'https://x.com'
    }
  }
}
</script>

<style scoped>
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-icon:hover {
  opacity: 0.8;
  transform: scale(1.05);
}
</style>
