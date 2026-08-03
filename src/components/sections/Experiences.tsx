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

// Badge visible para las imágenes placeholder (demo: true), para que en la UI
// quede claro que aún no son fotografías reales de Mandioca (AGENTS.md §9).
function DemoBadge() {
  return (
    <span className="rounded-full bg-warm-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-deep-earth">
      Imagen DEMO
    </span>
  )
}

export function Experiences() {
  const featured = experiences.find((experience) => experience.featured) ?? experiences[0]
  const secondaries = experiences.filter((experience) => experience !== featured)

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

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <ExperienceFeature experience={featured} index={0} />

          <div className="flex flex-col gap-12 lg:col-span-5 lg:gap-10">
            {secondaries.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Experiencia protagonista: mayor tamaño, fotografía vertical con overlay de
// contenido sobre un degradado que garantiza legibilidad (composición 7/12).
function ExperienceFeature({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const accent = accentClasses[experience.accent]

  return (
    <article className="group lg:col-span-7">
      <div className="relative aspect-[3/4] overflow-hidden rounded-card">
        <span
          aria-hidden="true"
          className={cn('absolute inset-x-0 top-0 z-10 h-1', accent.bar)}
        />
        <img
          src={experience.image}
          alt={experience.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-deep-earth/80 via-deep-earth/15 to-transparent"
        />
        <span className="absolute left-4 top-4 rounded-full bg-deep-earth px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-warm-white">
          {experience.activity}
        </span>
        {experience.demo && (
          <span className="absolute right-4 top-4">
            <DemoBadge />
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-6 pb-8 sm:p-8">
          <p className="flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-warm-white/90">
            <span aria-hidden="true" className={cn('h-px w-8', accent.dash)} />
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-3 text-h2 text-warm-white">{experience.name}</h3>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-warm-white/85">
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

          <div className="mt-7">
            <Button href={experience.cta.href} className="group/cta">
              {experience.cta.label}
              <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

// Experiencia secundaria: composición compacta y ligera para que la fotografía
// y la jerarquía de la protagonista respiren (columna 5/12, apiladas).
function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const accent = accentClasses[experience.accent]

  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card sm:aspect-[16/10]">
        <span
          aria-hidden="true"
          className={cn('absolute inset-x-0 top-0 z-10 h-1', accent.bar)}
        />
        <img
          src={experience.image}
          alt={experience.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-deep-earth px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-warm-white">
          {experience.activity}
        </span>
        {experience.demo && (
          <span className="absolute right-4 top-4">
            <DemoBadge />
          </span>
        )}
      </div>

      <div className="pt-5">
        <p className="flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-ink">
          <span aria-hidden="true" className={cn('h-px w-8', accent.dash)} />
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-2 text-h3">{experience.name}</h3>

        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/70">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {experience.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4" aria-hidden="true" />
            Dificultad {experience.difficulty}
          </span>
        </p>

        <a
          href={experience.cta.href}
          className="group/link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-deep-earth focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {experience.cta.label}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </a>
      </div>
    </article>
  )
}
