import { ArrowRight, Clock, Gauge, Route } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { experiences, experiencesSection } from '../../data/services'
import type { Experience, ExperienceAccent } from '../../data/services'

// Acento de marca por card (tokens del Design System). Un solo color por card,
// usado en la barra superior de la imagen y en el dash de la numeración.
const accentClasses: Record<ExperienceAccent, { bar: string; dash: string }> = {
  nature: { bar: 'bg-nature', dash: 'bg-nature' },
  water: { bar: 'bg-water', dash: 'bg-water' },
  earth: { bar: 'bg-earth', dash: 'bg-earth' },
}

// Encaje de la fotografía dentro del bloque de igual altura visual.
// Senderismo y Kayak usan object-contain (sobre un contenedor 3:4 no generan
// franjas). Saltos es mucho más vertical (747×1600): se usa object-cover con un
// recorte controlado y centrado para llenar la tarjeta sin franjas blancas.
const imageFit: Record<string, string> = {
  'saltos-cascadas': 'object-cover object-center',
}

export function Experiences() {
  return (
    <Section id="experiencias" background="cream" size="md">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
              <span aria-hidden="true" className="h-px w-10 bg-nature" />
              {experiencesSection.eyebrow}
            </p>
            <h2 className="mt-4 text-h2">{experiencesSection.title}</h2>
          </div>
          <p className="max-w-xl text-body-lg text-ink lg:col-span-5 lg:pb-2">
            {experiencesSection.description}
          </p>
        </div>

        {/* 3 experiencias del mismo peso visual: mismo ancho de columna y bloque
            de fotografía de igual altura. object-contain preserva la fotografía
            completa sin recortarla ni deformarla. */}
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index + 1}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const accent = accentClasses[experience.accent]

  return (
    <article className="group flex flex-col">
      {/* Bloque de fotografía con ALTURA VISUAL EQUIVALENTE entre las tres cards.
          Saltos (formato muy vertical) usa object-cover con recorte controlado
          para llenar la tarjeta; las otras dos se mantienen como están. */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-card">
        <span aria-hidden="true" className={cn('absolute inset-x-0 top-0 z-10 h-1', accent.bar)} />
        <img
          src={experience.image}
          alt={experience.name}
          loading="lazy"
          decoding="async"
          className={cn(
            'relative z-0 mx-auto h-full w-full object-contain motion-safe:transition-transform duration-700 motion-safe:group-hover:scale-[1.02]',
            imageFit[experience.id],
          )}
        />
        <span className="absolute left-4 top-4 rounded-full bg-deep-earth px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-warm-white">
          {experience.activity}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <p className="flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-ink">
          <span aria-hidden="true" className={cn('h-px w-8', accent.dash)} />
          {String(index).padStart(2, '0')}
        </p>
        <h3 className="mt-2 text-h3 text-deep-earth">{experience.name}</h3>
        <p className="mt-3 text-body text-ink/80">{experience.description}</p>

        <ul className="mt-4 flex flex-col gap-1.5 text-sm text-ink/70">
          <li className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {experience.duration}
          </li>
          <li className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4" aria-hidden="true" />
            Dificultad {experience.difficulty}
          </li>
          <li className="flex items-center gap-1.5">
            <Route className="h-4 w-4" aria-hidden="true" />
            {experience.modality}
          </li>
        </ul>

        <div className="mt-auto pt-6">
          <Button href={experience.cta.href} fullWidth className="group/cta" size="md">
            {experience.cta.label}
            <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </div>
    </article>
  )
}