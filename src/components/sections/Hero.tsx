import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { heroContent, heroSlides } from '../../data/hero'
import { businessConfig } from '../../config/business'
import { useHeroCarousel } from '../../hooks/useHeroCarousel'

const AUTOPLAY_MS = 6000

export function Hero() {
  const reducedMotion = useReducedMotion()

  const { index, play, pause, previous, next } = useHeroCarousel({
    slideCount: heroSlides.length,
    intervalMs: AUTOPLAY_MS,
    reducedMotion: !!reducedMotion,
  })

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden bg-deep-earth"
      onPointerEnter={pause}
      onPointerLeave={play}
      onFocus={pause}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) play()
      }}
    >
      {/* Carrusel de fotografías (decorativo). Todas las capas permanecen montadas
          y superpuestas: la activa en opacity 1 y las demás en 0. Al cambiar, la
          saliente va 1→0 mientras la entrante va 0→1 (crossfade real). Nunca queda
          un frame sin imagen visible. */}
      <div aria-hidden="true" className="absolute inset-0">
        {heroSlides.map((slide, i) => {
          const isActive = i === index
          return (
            <motion.img
              key={i}
              src={slide.image}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority={i === 0 && isActive ? 'high' : undefined}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: reducedMotion ? 1 : isActive ? 1.06 : 1,
              }}
              transition={
                isActive
                  ? {
                      opacity: { duration: 1.1, ease: 'easeInOut' },
                      scale: { duration: AUTOPLAY_MS / 1000, ease: 'linear' },
                    }
                  : {
                      opacity: { duration: 1.1, ease: 'easeInOut' },
                      scale: { duration: 1.1, ease: 'easeInOut' },
                    }
              }
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: slide.objectPosition ?? 'center' }}
            />
          )
        })}
      </div>

      {/* Overlays sutiles para legibilidad: blend del navbar (superior), contenido (izquierda) y strip inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-deep-earth/40 to-transparent lg:h-28"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-deep-earth/60 via-deep-earth/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-deep-earth/80 to-transparent"
      />

      {/* Flechas de navegación */}
      <button
        type="button"
        aria-label="Imagen anterior"
        onClick={previous}
        className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-warm-white/15 bg-deep-earth/10 text-warm-white opacity-60 backdrop-blur-sm transition-colors duration-300 hover:bg-warm-white/15 hover:opacity-90 focus-visible:outline-warm-white lg:left-6 lg:h-9 lg:w-9"
      >
        <ChevronLeft className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="Imagen siguiente"
        onClick={next}
        className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-warm-white/15 bg-deep-earth/10 text-warm-white opacity-60 backdrop-blur-sm transition-colors duration-300 hover:bg-warm-white/15 hover:opacity-90 focus-visible:outline-warm-white lg:right-6 lg:h-9 lg:w-9"
      >
        <ChevronRight className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={1.75} />
      </button>

      <Container className="relative pt-20 pb-24 sm:pt-24 lg:pt-44 lg:pb-44">
        <div className="w-full max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/90">
            <span aria-hidden="true" className="h-px w-10 bg-primary" />
            {heroContent.eyebrow}
          </p>

          <h1 className="mt-6 text-display leading-[1.1] text-warm-white lg:leading-[1.02]">
            {heroContent.title}
          </h1>

          <p className="mt-6 max-w-xl text-body-lg text-warm-white/90">
            {heroContent.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="w-full sm:w-auto">
              <Button href={heroContent.primaryCta.href} size="lg" fullWidth>
                {heroContent.primaryCta.label}
              </Button>
            </div>
            <div className="w-full sm:w-auto">
              <Button
                variant="outlineLight"
                href={heroContent.secondaryCta.href}
                size="lg"
                fullWidth
              >
                {heroContent.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-0">
        <Container
          width="wide"
          className="flex items-center justify-between border-t border-warm-white/15 py-5"
        >
          <p className="text-xs font-medium tracking-wide text-warm-white">
            {businessConfig.location}
          </p>
          <a
            href="#experiencias"
            className="hidden items-center gap-2 text-xs font-medium tracking-wide text-warm-white sm:inline-flex"
          >
            Explorá
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </Container>
      </div>
    </section>
  )
}