import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/mas-alla-de-las-paginas/',
  plugins: [
    vue(),
    /* COMENTAMOS EL PRERENDER PARA QUE NO FALLE EL BUILD 
    prerender({
      routes: ['/', '/blog'],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterDocumentEvent: 'app-prerendered',
        maxConcurrentRoutes: 1,
        timeout: 30000,
        launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
      }
    })
    */
  ]
})