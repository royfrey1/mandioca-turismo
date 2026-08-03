import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { destinations, destinationsSection } from '../../data/destinations'
import type { Destination } from '../../data/destinations'

type DestinationCtaProps = {
  href: string
  label: string
  accent?: Destination['accent']
}

function DestinationCta({
  href,
  label,
  accent = 'default',
}: DestinationCtaProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-sm font-semibold text-deep-earth focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {label}
      <ArrowRight
        aria-hidden="true"
        className={cn(
          'h-4 w-4 transition-transform duration-200 group-hover:translate-x-1',
          accent === 'water' ? 'text-water' : 'text-primary',
        )}
      />
    </a>
  )
}

// Sección "Destinos": lugares / paisaje / exploración. Composición editorial
// distinta de Experiences (que usa protagonista vertical + secundarias apiladas):
// panorama full-width con overlay + dúo escalonado, sin numeración ni barras de
// acento superiores. Fondo claro (white) para diferenciarse del cream de
// Experiences y separarse del dark de Nosotros.
export function Destinations() {
  const main = destinations.find((destination) => destination.featured) ?? destinations[0]
  const secondaries = destinations.filter((destination) => destination !== main)

  return (
    <Section id="destinos" background="default" size="md">
      <Container>
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
            <span aria-hidden="true" className="h-px w-10 bg-earth" />
            {destinationsSection.eyebrow}
          </p>
          <h2 className="mt-4 text-h2">{destinationsSection.title}</h2>
          <p className="mt-5 text-body-lg text-ink/80">
            {destinationsSection.description}
          </p>
        </div>

        <div aria-hidden="true" className="mt-8 h-px w-full bg-deep-earth/10 lg:mt-10" />

        <article className="group mt-8 lg:mt-16">
          <div className="relative lg:aspect-[21/9]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
              <img
                src={main.image}
                alt={main.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="hidden bg-linear-to-t from-deep-earth/85 via-deep-earth/25 to-transparent lg:absolute lg:inset-0 lg:block"
              />
              <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-deep-earth lg:px-3.5 lg:py-1.5 lg:text-xs">
                Destacado
              </span>
            </div>

            <div className="mt-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:p-8">
              <h3 className="text-h2 text-deep-earth lg:text-warm-white">
                {main.name}
              </h3>
              <p className="mt-4 max-w-xl text-body-lg text-ink/80 lg:mt-3 lg:text-warm-white/90 lg:line-clamp-2">
                {main.description}
              </p>
              <div className="mt-6">
                <Button href={main.cta.href} className="group/cta">
                  {main.cta.label}
                  <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-8 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-8">
          {secondaries.map((destination, index) => (
            <article
              key={destination.id}
              className={cn(
                'group',
                index === 0 && 'lg:col-span-5',
                index === 1 && 'lg:col-span-7 lg:mt-16',
              )}
            >
              <div className="overflow-hidden rounded-card">
                <img
                  src={destination.image}
                  alt={destination.name}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    'w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]',
                    index === 0 ? 'aspect-[4/3]' : 'aspect-[16/10]',
                  )}
                />
              </div>
              <div className="pt-5">
                <h3 className="text-h3">{destination.name}</h3>
                <p className="mt-2 text-body text-ink/80 line-clamp-1">
                  {destination.description}
                </p>
                <div className="mt-4">
                  <DestinationCta {...destination.cta} accent={destination.accent} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
