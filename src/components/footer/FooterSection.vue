<template>
  <footer class="site-footer">
    <!-- Corner SVGs -->
    <FooterCorner class="corner corner-tl" :rotation="0" />
    <FooterCorner class="corner corner-tr" :rotation="90" />
    <FooterCorner class="corner corner-bl" :rotation="270" />
    <FooterCorner class="corner corner-br" :rotation="180" />

    <!-- Main Footer Content -->
    <div class="footer-content">
      <!-- Top Row -->
      <div class="footer-top">
        <!-- Left Column -->
        <div class="footer-left">
          <div class="logo-section">
            <h2 class="logo-name">Mas Allá de las Páginas</h2>
            <h3 class="logo-subtitle">Crónicas de Páginas</h3>
            <p class="author-description">
             Adrián es un joven escritor de 19 años radicado en Tenerife. 
             Su amor por la escritura despertó en la infancia, pero las responsabilidades de la adolescencia —exámenes, amigos y un sinfín de distracciones— terminaron 
             relegando su pasión a un segundo plano. No fue hasta los encierros de la pandemia de 2020 cuando, entre aburrimiento y soledad, encontró el tiempo y 
             la inspiración para dar vida a su propio mundo mágico. Hoy equilibra su rutina entre clases, un trabajo de medio tiempo en una cafetería de barrio, 
             cuidar de su perra Luna y tejer tramas cada vez más intrincadas.
            </p>
          </div>
        </div>

        <!-- Right Column -->
        <div class="footer-right">
          <div class="right-columns">
            <!-- Navigation Column -->
            <div class="nav-column">
              <h4 class="section-title">Navegación</h4>
              <ul class="nav-links">
                <li><router-link to="/">INICIO</router-link></li>
                <!-- <li><router-link to="/about">ABOUT</router-link></li> -->
                <li><router-link to="/map">MAPA</router-link></li>
                <li><router-link to="/blog">BLOG</router-link></li>
              </ul>
            </div>

            <!-- Contact Column -->
            <div class="contact-column">
              <h4 class="section-title">Contacto</h4>
              <a href="mailto:poner@gmail.com" class="contact-email"
                >poner@gmail.com</a
              >

              <div class="social-links">
                <FooterInstagram href="https://www.instagram.com/mas.alladelaspaginas/" />
                <FacebookIcon href="https://www.facebook.com/people/M%C3%A1s-all%C3%A1-de-las-p%C3%A1ginas/61593795336965/?mibextid=wwXIfr&rdid=1IoVjuP43wti3QU0&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HdVxjAN3D%2F%3Fmibextid%3DwwXIfr6" />
                <ThreadsIcon href="https://www.threads.com/@MasAlladelasPaginas" />
                <FooterTikTok href="https://www.tiktok.com/@ms.all.de.las.pgi1" />
                <XIcon href="https://x.com/MasAlladelasPaginas" />
                <AmazonIcon href="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row (Copyright) -->
      <div class="footer-bottom">
        <p class="copyright">
          &copy; Mas Allá de las Páginas {{ currentYear }} -
          <a
            href="https://victorblancoweb.com"
            target="_blank"
            rel="noopener noreferrer"
            class="portfolio-link"
          >
            Web Hecha por Kilian Omar
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import AmazonIcon from "../svgs/AmazonIcon.vue";
import FooterCorner from "../svgs/CornerDesign.vue";
import FacebookIcon from "../svgs/FacebookIcon.vue";
import FooterTikTok from "../svgs/FooterTikTok.vue";
import FooterInstagram from "../svgs/InstagramIcon.vue";
import ThreadsIcon from "../svgs/ThreadsIcon.vue";
import XIcon from "../svgs/XIcon.vue";

export default {
  name: "SiteFooter",
  components: {
    FooterCorner,
    FooterInstagram,
    ThreadsIcon,
    FacebookIcon,
    FooterTikTok,
    XIcon,
    AmazonIcon,
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.site-footer {
  background-color: #000;
  color: var(--white);
  position: relative;
  min-height: 400px;
  padding: 60px 0 20px;
  border-top: 2px solid #d4af37;
}

/* Corner SVG Styles */
.corner {
  position: absolute;
  width: 80px;
  height: 80px;
}

.corner-tl {
  top: 12px;
  left: 12px;
}

.corner-tr {
  top: 12px;
  right: 12px;
  transform: rotate(90deg);
}

.corner-bl {
  bottom: 12px;
  left: 12px;
  transform: rotate(270deg);
}

.corner-br {
  bottom: 12px;
  right: 12px;
  transform: rotate(180deg);
}

/* Footer Content */
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 350px;
}

/* Top Row */
.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 120px;
  margin: 3rem 0;
  flex: 1;
}

/* Left Column */
.footer-left {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-section {
  text-align: left;
  width: 100%;
}

.logo-name {
  color: var(--white);
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 10px;
  text-transform: uppercase;
  text-align: left;
}

.logo-subtitle {
  color: #d4af37;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-align: left;
}

.author-description {
  color: var(--white);
  text-align: left;
  line-height: 1.6;
  font-size: 1.1rem;
  max-width: 450px;
  margin: 0;
  font-weight: 500;
}

/* Right Column */
.footer-right {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-columns {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
  width: 100%;
}

.nav-column,
.contact-column {
  flex: 1;
  min-width: 150px;
  max-width: 200px;
}

.section-title {
  color: #d4af37;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.nav-links li {
  margin-bottom: 12px;
  line-height: 1.4;
  font-size: 1rem;
  font-weight: 500;
}

.nav-links a {
  color: var(--white);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-links a:hover {
  color: #d4af37;
}

.contact-email {
  display: block;
  color: var(--white);
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 25px;
  transition: color 0.3s ease;
  line-height: 1.4;
  font-weight: 500;
  text-align: center;
}

.contact-email:hover {
  color: #d4af37;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  align-items: center;
}

/* Bottom Row */
.footer-bottom {
  padding-top: 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
}

.copyright {
  color: #d4af37;
  font-size: 1rem;
  margin: 0;
  font-weight: 600;
}

.portfolio-link {
  color: #d4af37;
  margin-left: 5px;
  transition: opacity 0.3s ease;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
}

.portfolio-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-top {
    gap: 40px;
  }

  .right-columns {
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .logo-section,
  .logo-name,
  .logo-subtitle,
  .author-description {
    text-align: center;
  }
  .footer-top {
    flex-direction: column;
    gap: 40px;
  }

  .footer-left,
  .footer-right {
    max-width: 100%;
  }

  .right-columns {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .nav-column,
  .contact-column {
    text-align: center;
    max-width: 100%;
  }

  .logo-name {
    font-size: 2rem;
  }

  .logo-subtitle {
    font-size: 1rem;
  }

  .author-description {
    font-size: 0.95rem;
  }

  .corner {
    width: 60px;
    height: 60px;
  }

  .corner-tl {
    top: 14px;
    left: 6px;
  }
  .corner-tr {
    top: 14px;
    right: 6px;
  }

  .corner-bl {
    bottom: 6px;
    left: 6px;
  }

  .corner-br {
    bottom: 6px;
    right: 6px;
  }
  .footer-bottom {
    padding-top: 0.4rem;
    padding-bottom: 1.4rem;
  }
}
</style>
