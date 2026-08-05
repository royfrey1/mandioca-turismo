import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { aboutSection } from '../../data/about'
import marcioImage from '../../assets/NOSOTROS/Marcio.png'
import rastroActivo from '../../assets/NOSOTROS/sello-rastro-1-300x249.png'

export function About() {
  const { mandioca, marcio, cta } = aboutSection

  return (
    <Section id="nosotros" background="dark" size="md">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch">
          {/* ── MANDIOCA ─────────────────────────────────── */}
          <div className="flex flex-col">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/90">
              <span aria-hidden="true" className="h-px w-10 bg-nature" />
              {mandioca.eyebrow}
            </p>
            <h2 className="mt-4 text-h2 leading-tight text-warm-white">
              {mandioca.title}
            </h2>

            <p className="mt-6 text-body-lg leading-relaxed text-warm-white/90">
              {mandioca.description}
            </p>

            <ul className="mt-8 space-y-3">
              {mandioca.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 text-sm text-warm-white/80"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-nature"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button
                href={cta.href}
                variant="outlineLight"
                size="lg"
                fullWidth
                className="lg:w-auto"
              >
                {cta.label}
              </Button>
            </div>

            <div className="mt-12 border-t border-warm-white/10 pt-22">
              <div className="flex items-start gap-8">
                <img
                  src={rastroActivo}
                  alt="Rastro Activo — Prestador Registrado"
                  loading="lazy"
                  decoding="async"
                  className="h-[120px] w-auto shrink-0"
                />
                <div className="min-w-0">
                  <p className="pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-warm-white/90">
                    Prestador Rastro Activo
                    <br />
                    Registrado
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-warm-white/55">
                    Una acreditación vinculada a la actividad de turismo
                    activo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── MARCIO ───────────────────────────────────── */}
          <div className="flex flex-col">
            <div className="group overflow-hidden rounded-card">
              <img
                src={marcioImage}
                alt={` retrato de ${marcio.name}, ${marcio.role} de Mandioca`}
                loading="lazy"
                decoding="async"
                className="aspect-square lg:aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-h3 text-warm-white">{marcio.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {marcio.role}
              </p>
            </div>

            <p className="mt-4 text-body-md leading-relaxed text-warm-white/85">
              {marcio.bio}
            </p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {marcio.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-full border border-warm-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-warm-white/70"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
