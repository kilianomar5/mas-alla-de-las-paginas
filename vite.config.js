import prerender from '@prerenderer/rollup-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    // Build-time prerender: renders each route in headless Chromium and writes
    // real static HTML into /dist, so page content + per-route meta ship in the
    // markup (see HeroCarousel's `app-prerendered` event for the snapshot cue).
    prerender({
      routes: ['/', '/blog'],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterDocumentEvent: 'app-prerendered',
        maxConcurrentRoutes: 1,
        timeout: 30000,
        // Required for headless Chromium in CI/Netlify build containers.
        launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
      }
    })
  ]
})
