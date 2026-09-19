import { useCallback } from "react"

/**
 * Fade-up on scroll. Only elements that start below the fold are hidden,
 * and only once JS runs: the server-rendered page is fully visible, and
 * nothing already on screen blinks out while the page hydrates. Styling
 * keys off `data-reveal="hidden" | "shown"`.
 */
export function useReveal<T extends HTMLElement>() {
  return useCallback((element: T | null) => {
    if (!element) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let first = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          if (first) return
          element.dataset.reveal = "shown"
          // Hand transitions back to the element's own (hover) timing.
          const done = (event: TransitionEvent) => {
            if (event.target !== element) return
            delete element.dataset.reveal
            element.removeEventListener("transitionend", done)
          }
          element.addEventListener("transitionend", done)
        } else if (first) {
          // Partly on screen already (inside the bottom margin): leave it.
          if (entry.boundingClientRect.top < window.innerHeight) {
            observer.disconnect()
            return
          }
          element.dataset.reveal = "hidden"
        }
        first = false
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
}
