<template>
  <a :href="href" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Amazon author page">
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 50 50">
      <mask id="amazonIconMask">
        <rect x="0" y="0" width="50" height="50" fill="white" />
        <!-- Amazon "a" wordmark -->
        <text
          x="25" y="30" fill="black"
          font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="20"
          text-anchor="middle"
        >a</text>
        <!-- Amazon smile arrow -->
        <path
          d="M 12 33 Q 25 43 38 33 Q 25 38 12 33 Z"
          fill="black"
        />
        <path d="M 34 30 L 41 31.5 L 37.5 36 Z" fill="black" />
      </mask>
      <path
        d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 Z"
        fill="#dfac29"
        mask="url(#amazonIconMask)"
      />
    </svg>
  </a>
</template>

<script>
export default {
  name: 'AmazonIcon',
  props: {
    href: {
      type: String,
      default: 'https://www.amazon.com'
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
