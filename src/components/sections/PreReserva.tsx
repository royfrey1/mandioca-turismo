import { ArrowRight } from 'lucide-react'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { preReservaSection } from '../../data/preReserva'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import preReservaImage from '../../assets/NOSOTROS/pre.jpg'

// CTA de cierre. El enlace se construye desde `businessConfig.whatsapp` (ver
// `src/lib/whatsapp.ts`): cuando el número esté cargado abre WhatsApp con el
// mensaje precompletado (sin tocar el componente); mientras tanto apunta a esta
// misma sección (placeholder, sin inventar datos de contacto).
function buildCtaHref(): string {
  return buildWhatsAppLink(preReservaSection.whatsappMessage) ?? '#pre-reserva'
}

export function PreReserva() {
  return (
    <Section id="pre-reserva" background="dark" size="lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="max-w-2xl lg:col-span-7">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/90">
              <span aria-hidden="true" className="h-px w-10 bg-primary" />
              {preReservaSection.eyebrow}
            </p>
            <h2 className="mt-4 text-h2 text-warm-white">
              {preReservaSection.title}
            </h2>
            <p className="mt-5 max-w-xl text-body-lg text-warm-white/90">
              {preReservaSection.intro}
            </p>

            <div className="mt-10">
              <Button href={buildCtaHref()} size="lg" className="w-full sm:w-auto group/cta">
                {preReservaSection.ctaLabel}
                <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Button>
              <p className="mt-4 text-sm text-warm-white/70">
                {preReservaSection.supportText}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="group relative aspect-square overflow-hidden rounded-card lg:aspect-[3/4]">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-1 bg-nature"
              />
              <img
                src={preReservaImage}
                alt="Camino rural misionero"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
