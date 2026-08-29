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
          <path d="M25,2C12.317,2 2,12.317 2,25c0,3.924 1.001,7.61 2.756,10.824l-2.617,9.564l9.803,-2.571C14.787,44.597 19.761,46 25,46c12.683,0 23,-10.317 23,-23S37.683,2 25,2zM36.57,33.116c-0.512,1.434 -2.597,2.774 -3.96,3.021c-0.911,0.165 -2.138,0.334 -6.242,-1.339c-4.949,-2.046 -8.163,-7.172 -8.411,-7.502c-0.247,-0.33 -2.016,-2.682 -2.016,-5.115c0,-2.433 1.258,-3.639 1.708,-4.133c0.45,-0.493 0.981,-0.617 1.309,-0.617c0.328,0 0.655,0.002 0.941,0.012c0.317,0.011 0.738,-0.122 1.156,0.891c0.431,1.043 1.481,3.618 1.611,3.885c0.13,0.267 0.224,0.593 0.051,0.941c-0.163,0.347 -0.252,0.564 -0.5,0.806c-0.25,0.242 -0.521,0.584 -0.73,0.783c-0.228,0.221 -0.47,0.461 -0.197,0.92c0.273,0.46 1.215,2.004 2.607,3.242c1.789,1.597 3.3,2.087 3.789,2.316c0.489,0.228 0.787,0.194 1.076,-0.133c0.288,-0.327 1.256,-1.464 1.585,-1.972c0.328,-0.509 0.665,-0.425 1.124,-0.252c0.459,0.173 2.932,1.381 3.435,1.632c0.502,0.252 0.835,0.373 0.957,0.583C36.877,31.066 36.877,32.181 36.57,33.116z"></path>
        </g>
      </g>
    </svg>
  </a>
</template>

<script>
export default {
  name: 'WhatsappIcon',
  props: {
    href: {
      type: String,
      default: 'https://whatsapp.com'
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