import { onMounted, onUnmounted, ref } from "vue";

// Shared reactive viewport width. A single resize listener is shared across
// all consumers (e.g. every hero slide) regardless of how many mount.
const width = ref(typeof window !== "undefined" ? window.innerWidth : 1280);
let consumers = 0;
let onResize = null;

export function useViewportWidth() {
  onMounted(() => {
    if (consumers++ === 0) {
      onResize = () => {
        width.value = window.innerWidth;
      };
      window.addEventListener("resize", onResize, { passive: true });
    }
    width.value = window.innerWidth;
  });

  onUnmounted(() => {
    if (--consumers === 0 && onResize) {
      window.removeEventListener("resize", onResize);
      onResize = null;
    }
  });

  return width;
}
