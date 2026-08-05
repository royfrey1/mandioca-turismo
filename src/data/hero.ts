import imgBghero from '../assets/HERO/bghero.jpg'
import imgSaltos from '../assets/HERO/saltosycascadas.webp'
import imgSelvayrio from '../assets/HERO/selvayrio.jpg'

export type Cta = {
  label: string
  href: string
}

export type HeroContent = {
  eyebrow: string
  title: string
  description: string
  primaryCta: Cta
  secondaryCta: Cta
}

export type HeroSlide = {
  image: string
  objectPosition?: string
}

// Carrusel del Hero — imágenes reales del propietario en orden de reproducción.
// bghero es la primera (LCP, prioridad alta). Rotan con loop infinito.
export const heroSlides: HeroSlide[] = [
  { image: imgBghero },
  { image: imgSaltos },
  { image: imgSelvayrio },
]

export const heroContent: HeroContent = {
  eyebrow: 'Turismo de Naturaleza · Misiones',
  title: 'Descubrí Misiones de una manera diferente.',
  description:
    'Experiencias de naturaleza, aventura y descubrimiento acompañadas por guías locales.',
  primaryCta: { label: 'Consultar una experiencia', href: '#pre-reserva' },
  secondaryCta: { label: 'Explorar experiencias', href: '#experiencias' },
}
