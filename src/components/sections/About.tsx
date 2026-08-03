import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { aboutSection } from '../../data/about'
import aboutImage from '../../assets/NOSOTROS/Misiones-a-puro-trekking.webp'

export function About() {
  return (
    <Section id="nosotros" background="dark" size="md">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-16 lg:gap-y-14">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/90">
              <span aria-hidden="true" className="h-px w-10 bg-nature" />
              {aboutSection.eyebrow}
            </p>
            <h2 className="mt-4 text-h2 text-warm-white">{aboutSection.title}</h2>
          </div>

          <div className="group lg:order-3 lg:col-span-5">
            <div className="overflow-hidden rounded-card">
              <img
                src={aboutImage}
                alt="Tres personas caminando por la selva misionera en una experiencia de trekking con Mandioca"
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
          </div>

          <div className="lg:order-2 lg:col-span-7">
            <p className="text-body-lg text-warm-white/90 lg:mt-0">
              {aboutSection.intro}
            </p>
            <div className="mt-6 space-y-4 text-body text-warm-white/80">
              {aboutSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-y-3 border-t border-warm-white/15 pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-warm-white/75">
              {aboutSection.highlights.map((highlight, index) => (
                <li key={highlight} className="flex items-center">
                  {index > 0 && (
                    <span aria-hidden="true" className="mx-3 text-warm-white/30">
                      ·
                    </span>
                  )}
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href={aboutSection.cta.href} size="lg" fullWidth className="lg:w-auto">
                {aboutSection.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
