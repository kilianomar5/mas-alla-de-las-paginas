<!-- src/components/home/NewsletterSection.vue -->
<template>
  <section class="newsletter-section" id="newsletter">
    <div class="container">
      <div class="newsletter-grid">
        <!-- Left Column: Book Cover -->
        <div class="newsletter-left">
          <div class="book-cover-container">
            <img
              :src="coverSrc"
              :srcset="coverSrcset"
              sizes="(max-width: 1024px) 80vw, 400px"
              alt="Davga — character art from The Endless War series"
              class="book-cover-image"
            />
            <div class="book-cover-glow"></div>
          </div>
        </div>

        <!-- Right Column: Newsletter Form -->
        <div class="newsletter-right">
          <div class="newsletter-content">
            <h2 class="newsletter-title">The Endless War continues</h2>

            <p class="newsletter-subtitle">
              Sign-up to my newsletter to receive exclusive updates, behind the
              scenes context, character spotlights, cover reveals, and launch
              updates!
            </p>

            <!-- Newsletter Form (MailerLite via Netlify Function) -->
            <form
              class="newsletter-form"
              name="newsletter"
              method="POST"
              @submit.prevent="handleSubmit"
            >
              <!-- Form Fields -->
              <div class="form-group">
                <label for="name" class="form-label">Full Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  class="form-input"
                />
              </div>

              <!-- Checkbox -->
              <div class="form-checkbox-group">
                <input
                  id="terms"
                  v-model="form.agreeToTerms"
                  type="checkbox"
                  name="agreeToTerms"
                  required
                  class="form-checkbox"
                />
                <label for="terms" class="form-checkbox-label">
                  I agree to receive updates about new releases and book news.
                </label>
              </div>

              <!-- Cloudflare Turnstile: invisible bot verification -->
              <div ref="turnstileEl" class="cf-turnstile"></div>

              <!-- Submit Button -->
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">Join my newsletter →</span>
                <span v-else>Sending...</span>
              </button>

              <!-- Success/Error Messages -->
              <div
                v-if="submitMessage"
                class="form-message"
                :class="{ error: isError, success: !isError }"
              >
                {{ submitMessage }}
              </div>
            </form>

            <!-- Privacy Note -->
            <p class="privacy-note">
              🔒 We'll only use your email to send you our newsletter. No spam,
              unsubscribe any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import davgaCover480 from "../../assets/images/Davga_HR-480.webp";
import davgaCover800 from "../../assets/images/Davga_HR-800.webp";
import davgaCoverJpg from "../../assets/images/Davga_HR.jpg";
import { supportsWebp } from "../../utils/webp.js";

// Original JPG as universal fallback; responsive .webp via srcset where supported.
const coverSrc = davgaCoverJpg;
const coverSrcset = supportsWebp()
  ? `${davgaCover480} 480w, ${davgaCover800} 800w`
  : undefined;

const form = reactive({
  name: "",
  email: "",
  agreeToTerms: false,
});

const isSubmitting = ref(false);
const submitMessage = ref("");
const isError = ref(false);

// Cloudflare Turnstile. The site key is public (safe to ship in the client); the
// matching secret lives only in the Netlify function. `action` is echoed back by
// siteverify and checked server-side so a token minted elsewhere can't be replayed here.
const TURNSTILE_SITE_KEY = "0x4AAAAAAENoETuta9nzmjKI";
const TURNSTILE_ACTION = "newsletter";
const turnstileEl = ref(null);
let widgetId = null;

// Explicitly render the widget once the async Turnstile script is ready. In an SPA
// the component can mount before challenges.cloudflare.com/turnstile finishes loading,
// so poll briefly for window.turnstile instead of relying on implicit auto-render.
const renderTurnstile = () => {
  if (!turnstileEl.value) return;
  if (window.turnstile) {
    widgetId = window.turnstile.render(turnstileEl.value, {
      sitekey: TURNSTILE_SITE_KEY,
      action: TURNSTILE_ACTION,
    });
  } else {
    setTimeout(renderTurnstile, 300);
  }
};

onMounted(renderTurnstile);

onBeforeUnmount(() => {
  if (window.turnstile && widgetId !== null) {
    window.turnstile.remove(widgetId);
  }
});

const handleSubmit = async () => {
  if (!form.agreeToTerms) {
    submitMessage.value = "Please agree to the terms to continue.";
    isError.value = true;
    return;
  }

  // Require a Turnstile token before contacting the server.
  const turnstileToken =
    window.turnstile && widgetId !== null
      ? window.turnstile.getResponse(widgetId)
      : "";
  if (!turnstileToken) {
    submitMessage.value = "Please complete the verification and try again.";
    isError.value = true;
    return;
  }

  isSubmitting.value = true;
  submitMessage.value = "";
  isError.value = false;

  const formBody = new URLSearchParams({
    name: form.name,
    email: form.email,
    agreeToTerms: form.agreeToTerms,
    turnstileToken,
  }).toString();

  try {
    const mlRes = await fetch("/api/newsletter-subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    });

    if (mlRes.ok) {
      submitMessage.value =
        "Thank you! Look for a confirmation email in your inbox (or spam folder)";
      isError.value = false;
      form.name = "";
      form.email = "";
      form.agreeToTerms = false;
    } else if (mlRes.status === 429) {
      submitMessage.value =
        "Too many attempts. Please wait a minute and try again.";
      isError.value = true;
    } else if (mlRes.status === 403) {
      submitMessage.value =
        "Verification failed. Please reload the page and try again.";
      isError.value = true;
    } else {
      const data = await mlRes.json().catch(() => ({}));
      submitMessage.value = data.error
        ? `Couldn't subscribe: ${data.error}.`
        : "Something went wrong. Please try again.";
      isError.value = true;
    }
  } catch (error) {
    console.error("Form submission error:", error);
    submitMessage.value = "Something went wrong. Please try again.";
    isError.value = true;
  } finally {
    // Reset the widget so the single-use token can't be replayed on a retry.
    if (window.turnstile && widgetId !== null) {
      window.turnstile.reset(widgetId);
    }
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.newsletter-section {
  padding: 3rem 0;
  background: var(--white);
  color: var(--black);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 2rem;
}

/* Two Column Grid */
.newsletter-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Left Column: Book Cover */
.newsletter-left {
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-cover-container {
  position: relative;
  max-width: 400px;
  width: 100%;
}

.book-cover-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  position: relative;
  z-index: 2;
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.5s ease;
}

.book-cover-container:hover .book-cover-image {
  transform: perspective(1000px) rotateY(0deg);
}

.book-cover-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(
    ellipse at center,
    rgba(223, 172, 41, 0.2) 0%,
    rgba(255, 230, 7, 0.1) 40%,
    transparent 70%
  );
  filter: blur(20px);
  z-index: 1;
  opacity: 0.8;
}

/* Right Column: Newsletter Content */
.newsletter-content {
  max-width: 500px;
}

.newsletter-title {
  font-family: var(--font-body);
  line-height: 1.2;
  letter-spacing: -3%;
  margin-bottom: 0.4rem;
  color: var(--black);
}

.newsletter-title .highlight {
  background: linear-gradient(
    135deg,
    var(--gold-dark) 0%,
    var(--gold-light) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.newsletter-subtitle {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 1.5rem;
}

/* Form Styles */
.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.form-label {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--black);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border: var(--black) 3px solid;
  border-radius: 4px;
  background: var(--white);
  color: var(--black);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--gold-dark);
  box-shadow: 0 0 0 3px rgba(223, 172, 41, 0.1);
}

.form-input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

/* Checkbox */
.form-checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0.3rem 0;
}

.form-checkbox {
  margin-top: 0.25rem;
  accent-color: var(--gold-dark);
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  cursor: pointer;
}

.form-checkbox-label {
  font-family: var(--font-body);
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
}

.form-checkbox-label a {
  color: var(--gold-dark);
  text-decoration: underline;
  transition: color 0.3s ease;
}

.form-checkbox-label a:hover {
  color: var(--gold-light);
}

/* Submit Button */
.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--black);
  background: var(--white);
  padding: 1rem 2.5rem;
  border-radius: 4px;
  border: var(--black) 3px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  min-width: 200px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.submit-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--gold-dark) 0%,
    var(--gold-light) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.submit-btn:hover:not(:disabled) {
  color: var(--black);
  border-color: var(--gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(223, 172, 41, 0.2);
}

.submit-btn:hover:not(:disabled)::before {
  opacity: 1;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Form Messages */
.form-message {
  font-family: var(--font-body);
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.form-message.success {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border: 1px solid rgba(5, 150, 105, 0.2);
}

.form-message.error {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 1px solid rgba(220, 38, 38, 0.2);
}

/* Privacy Note */
.privacy-note {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .newsletter-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .newsletter-left {
    order: 2;
  }

  .newsletter-right {
    order: 1;
  }

  .newsletter-content {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  .submit-btn {
    margin: 0 auto;
  }

  .book-cover-container {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .newsletter-section {
    padding: 1rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .newsletter-title {
    font-size: 2rem;
  }

  .newsletter-subtitle {
    font-size: 1rem;
  }

  .form-checkbox-group {
    align-items: flex-start;
  }

  /* Hide the cover image on mobile — content-only newsletter form */
  .newsletter-left {
    display: none;
  }
}

@media (max-width: 480px) {
  .newsletter-title {
    font-size: 1.75rem;
  }

  .submit-btn {
    width: 100%;
    min-width: auto;
  }

  .form-input {
    padding: 0.625rem 0.875rem;
  }
}
</style>
