import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { TriangleAlert } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { MisionesMap } from './explorar/MisionesMap'
import { DestinationPanel } from './explorar/DestinationPanel'
import { destinations, explorarSection } from '../../data/destinations'

// "Explorá Misiones": destinos + área de operación en una sola sección interactiva.
// Mapa conceptual + panel sincronizado. Eldorado es la base; el visitante explora
// los destinos sin abandonar la página. CTA → #pre-reserva (mismo funnel actual).
// Mantiene el ancla interna `id="destinos"` (Navbar/Footer).
function SelfDriveStrip() {
  const { selfDrive } = explorarSection
  return (
    <div className="mt-14 border-t border-deep-earth/10 pt-8 lg:mt-20 lg:pt-10">
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
        <span aria-hidden="true" className="h-px w-8 bg-deep-earth/40" />
        {selfDrive.eyebrow}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h3 className="text-h3">{selfDrive.title}</h3>
          <p className="mt-3 text-body text-ink/80">{selfDrive.intro}</p>
        </div>

        <div className="lg:col-span-7">
          <ul className="space-y-3">
            {selfDrive.advantages.map((advantage) => (
              <li key={advantage.name} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-earth" aria-hidden="true" />
                <p className="text-body text-ink/80">
                  <span className="font-semibold text-deep-earth">{advantage.name}.</span>{' '}
                  {advantage.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-start gap-3 border-l-2 border-earth/40 pl-4">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-earth" aria-hidden="true" />
            <p className="text-body text-ink/80">{selfDrive.note}</p>
          </div>

          <p className="mt-3 pl-4 text-sm font-semibold text-deep-earth">
            {selfDrive.vehicleNote}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ExplorarMisiones() {
  const [activeId, setActiveId] = useState('eldorado')
  const panelRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const active = destinations.find((destination) => destination.id === activeId) ?? destinations[0]

  const handleSelect = (id: string) => {
    setActiveId(id)
  }

  const handlePillSelect = (id: string) => {
    setActiveId(id)
    if (window.matchMedia('(max-width: 1023px)').matches) {
      panelRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <Section id="destinos" background="default" size="md">
      <Container>
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
            <span aria-hidden="true" className="h-px w-10 bg-earth" />
            {explorarSection.eyebrow}
          </p>
          <h2 className="mt-4 text-h2">{explorarSection.title}</h2>
          <p className="mt-5 text-body-lg text-ink/80">{explorarSection.description}</p>
        </div>

        <div aria-hidden="true" className="mt-8 h-px w-full bg-deep-earth/10 lg:mt-10" />

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-2 lg:hidden"
          role="group"
          aria-label={explorarSection.eyebrow}
        >
          {destinations.map((destination) => {
            const isActive = destination.id === activeId
            return (
              <button
                key={destination.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handlePillSelect(destination.id)}
                className={cn(
                  'min-h-11 shrink-0 snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  isActive
                    ? 'border-deep-earth bg-deep-earth text-warm-white'
                    : 'border-deep-earth/20 bg-transparent text-deep-earth hover:bg-deep-earth/5',
                )}
              >
                {destination.name}
              </button>
            )
          })}
        </div>

        <div className="mt-8 lg:mt-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <MisionesMap
              destinations={destinations}
              activeId={activeId}
              onSelect={handleSelect}
            />
          </div>
          <div ref={panelRef} className="mt-6 scroll-mt-28 lg:col-span-7 lg:mt-0">
            <DestinationPanel destination={active} />
          </div>
        </div>

        <SelfDriveStrip />
      </Container>
    </Section>
  )
}
