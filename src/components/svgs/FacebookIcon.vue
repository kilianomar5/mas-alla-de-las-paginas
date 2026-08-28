<template>
  <a :href="href" target="_blank" rel="noopener noreferrer" class="social-icon">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="38" 
      height="38" 
      viewBox="0 0 256 256"
    >
      <g fill="#D4AF37" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
        <g transform="scale(5.12,5.12)">
          <path d="M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM37,19h-2c-2.14,0 -3,0.5 -3,2v3h5l-1,5h-4v15h-5v-15h-4v-5h4v-3c0,-4 2,-7 6,-7c2.9,0 4,1 4,1z"></path>
        </g>
      </g>
    </svg>
  </a>
</template>

<script>
export default {
  name: 'FacebookIcon',
  props: {
    href: {
      type: String,
      default: 'https://facebook.com'
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

.social-icon svg {
  fill: #D4AF37;
}
</style>