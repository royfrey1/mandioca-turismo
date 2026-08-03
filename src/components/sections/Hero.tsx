import { ChevronDown } from 'lucide-react'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { heroContent } from '../../data/hero'
import { businessConfig } from '../../config/business'
import heroImage from '../../assets/HERO/hero1.jpg'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden bg-deep-earth"
    >
      {/* Fotografía protagonista */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
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
