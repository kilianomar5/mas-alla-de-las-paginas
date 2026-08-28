// Lightweight WebP support detection + responsive-image helpers.
// We serve responsive .webp to capable browsers and keep the original
// JPG/PNG as a single-size fallback. Detection runs once and is cached.

let _supported = null;

export function supportsWebp() {
  if (_supported !== null) return _supported;
  try {
    const canvas = document.createElement("canvas");
    _supported =
      !!(canvas.getContext && canvas.getContext("2d")) &&
      canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  } catch {
    _supported = false;
  }
  return _supported;
}

// Single .webp variant for a public path (no responsive variants needed).
export function toWebp(path) {
  if (!path) return path;
  return supportsWebp() ? path.replace(/\.(png|jpe?g)$/i, ".webp") : path;
}

// Build a responsive webp `srcset` for a public-path image that has
// width-suffixed variants on disk, e.g. "/images/book1-flat.jpg" + [400, 800]
// -> "/images/book1-flat-400.webp 400w, /images/book1-flat-800.webp 800w".
// Returns undefined when WebP is unsupported so the <img> falls back to `src`.
export function webpSrcset(base, widths) {
  if (!base || !supportsWebp()) return undefined;
  const b = base.replace(/\.(png|jpe?g)$/i, "");
  return widths.map((w) => `${b}-${w}.webp ${w}w`).join(", ");
}

// Pick a viewport-appropriate webp for a CSS background (which can't use
// <picture>/srcset). Uses the "-sm" (mobile) / "-lg" (desktop) variants,
// falling back to the original path when WebP is unsupported.
export function responsiveBg(base, viewportWidth) {
  if (!base || !supportsWebp()) return base;
  const b = base.replace(/\.(png|jpe?g)$/i, "");
  return viewportWidth <= 768 ? `${b}-sm.webp` : `${b}-lg.webp`;
}
