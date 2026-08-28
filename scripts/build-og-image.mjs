// Generates public/og-image.jpg — a 1200x630 branded social share card.
// Run on demand:  npm run og
// Renders an HTML card in headless Chromium (puppeteer, already a dependency of
// the prerender step) using the site's Imperator/Manrope fonts and gold palette.

import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const asDataUri = (relPath, mime) =>
  `data:${mime};base64,${readFileSync(resolve(root, relPath)).toString('base64')}`

// Assets embedded as data URIs so the page needs no server.
const bg = asDataUri('public/images/book1-bg.jpg', 'image/jpeg')
const imperator = asDataUri(
  'src/assets/fonts/Imperator/ImperatorSmallCapsBold.woff',
  'font/woff'
)
const manrope = asDataUri(
  'src/assets/fonts/Manrope/static/Manrope-ExtraBold.ttf',
  'font/ttf'
)

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: 'Imperator'; src: url('${imperator}') format('woff'); }
  @font-face { font-family: 'Manrope'; src: url('${manrope}') format('truetype'); }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; }
  .card {
    position: relative; width: 1200px; height: 630px;
    background: #151515 url('${bg}') center/cover no-repeat;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; color: #fff; font-family: 'Manrope', sans-serif;
  }
  .overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(21,21,21,.55) 0%, rgba(21,21,21,.35) 45%, rgba(21,21,21,.8) 100%);
  }
  .frame {
    position: absolute; inset: 34px;
    border: 2px solid rgba(223,172,41,.55); border-radius: 6px;
  }
  .content { position: relative; z-index: 2; padding: 0 90px; }
  .eyebrow {
    font-family: 'Manrope', sans-serif; font-weight: 800;
    letter-spacing: .38em; text-transform: uppercase;
    font-size: 22px; color: #DFAC29; margin-bottom: 26px;
  }
  .title {
    font-family: 'Imperator', Georgia, serif;
    font-size: 96px; line-height: .98; letter-spacing: .01em;
    background: linear-gradient(135deg, #DFAC29 0%, #FFE607 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    text-shadow: 0 4px 30px rgba(0,0,0,.35);
  }
  .rule { width: 120px; height: 2px; background: #DFAC29; margin: 34px auto; opacity: .8; }
  .author {
    font-family: 'Manrope', sans-serif; font-weight: 800;
    letter-spacing: .28em; text-transform: uppercase;
    font-size: 34px; color: #fff;
  }
</style></head><body>
  <div class="card">
    <div class="overlay"></div>
    <div class="frame"></div>
    <div class="content">
      <div class="eyebrow">An Epic Fantasy Series</div>
      <div class="title">Chronicles of the<br>Endless War</div>
      <div class="rule"></div>
      <div class="author">L.M. Douglas</div>
    </div>
  </div>
</body></html>`

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})
try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'networkidle0' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({
    path: resolve(root, 'public/og-image.jpg'),
    type: 'jpeg',
    quality: 90,
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  })
  console.log('✓ Wrote public/og-image.jpg (1200x630)')
} finally {
  await browser.close()
}
