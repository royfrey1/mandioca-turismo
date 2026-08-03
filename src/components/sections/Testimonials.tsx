import { Quote, Star } from 'lucide-react'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { testimonials, testimonialsSection } from '../../data/testimonials'
import type { Testimonial } from '../../data/testimonials'

// Sección de testimonios con estética editorial (pull-quote + citas en columna),
// sin parecer cards de reviews genéricas. Contenido DEMO marcado en la UI.
function Stars({ rating }: { rating?: number }) {
  const count = rating ?? 5
  return (
    <span
      role="img"
      aria-label={`${count} de 5 estrellas`}
      className="inline-flex items-center gap-1"
    >
      {Array.from({ length: count }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className="h-4 w-4 fill-primary text-primary"
        />
      ))}
    </span>
  )
}

function Avatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep-earth text-sm font-semibold text-warm-white"
    >
      {name.charAt(0)}
    </span>
  )
}

export function Testimonials() {
  const featured = testimonials.find((testimonial) => testimonial.featured) ?? testimonials[0]
  const rest = testimonials.filter((testimonial) => testimonial !== featured)

  return (
    <Section id="testimonios" background="cream" size="md">
      <Container>
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
              <span aria-hidden="true" className="h-px w-10 bg-nature" />
              {testimonialsSection.eyebrow}
            </p>
            <span className="rounded-full bg-deep-earth/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-deep-earth/60">
              Contenido DEMO
            </span>
          </div>
          <h2 className="mt-4 text-h2">{testimonialsSection.title}</h2>
          <p className="mt-5 text-body-lg text-ink">
            {testimonialsSection.description}
          </p>
        </div>

        <div className="mt-14 lg:mt-20">
          <FeaturedTestimonial testimonial={featured} />

          <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
            {rest.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>

        <p className="mt-16 text-center text-xs text-ink/60 lg:mt-20">
          {testimonialsSection.demoNote}
        </p>
      </Container>
    </Section>
  )
}

// Cita protagonista: pull-quote editorial con autor en columna lateral.
function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="border-t border-deep-earth/10 pt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:pt-10">
      <div className="lg:col-span-8">
        <Quote aria-hidden="true" className="h-9 w-9 text-primary/40" />
        <p className="mt-6 text-h3 text-deep-earth">{testimonial.quote}</p>
      </div>
      <footer className="mt-8 flex items-center gap-4 lg:col-span-4 lg:mt-1 lg:border-l lg:border-deep-earth/10 lg:pl-8">
        <Avatar name={testimonial.name} />
        <div>
          <Stars rating={testimonial.rating} />
          <p className="mt-1.5 font-semibold text-deep-earth">
            {testimonial.name}
          </p>
          <p className="text-sm text-ink/75">
            {testimonial.service}
            {testimonial.location ? ` · ${testimonial.location}` : ''}
          </p>
        </div>
      </footer>
    </blockquote>
  )
}

// Cita secundaria: composición ligera y editorial.
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="border-t border-deep-earth/10 pt-6">
      <Stars rating={testimonial.rating} />
      <p className="mt-4 text-body-lg text-ink">{testimonial.quote}</p>
      <footer className="mt-6 flex items-center gap-3">
        <Avatar name={testimonial.name} />
        <div>
          <p className="font-semibold text-deep-earth">{testimonial.name}</p>
          <p className="text-sm text-ink/75">
            {testimonial.service}
            {testimonial.location ? ` · ${testimonial.location}` : ''}
          </p>
        </div>
      </footer>
    </blockquote>
  )
}
