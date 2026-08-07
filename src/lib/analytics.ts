declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

// Invoca un evento personalizado de Google Analytics 4 (GA4) únicamente si el
// global `window.gtag` ya fue cargado por la etiqueta de `index.html`.
// No dispara eventos automáticamente: cada llamador decide cuándo ejecutarlo.
export function trackEvent(
  action: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params)
  }
}