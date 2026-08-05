import { motion, useReducedMotion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Container } from '../layout/Container'
import { testimonials, testimonialsSection } from '../../data/testimonials'
import type { Testimonial } from '../../data/testimonials'
import rioBackground from '../../assets/GALERIA/nosotros.png'

// Testimonios sobre fotografía real de Mandioca (rio2.jpg, río panorámico).
// Composición editorial SIN carrusel: las 5 reseñas reales se muestran a la vez.
// Columna izquierda fija (etiqueta, título, descripción, rating Google + CTA) y
// columnas editoriales de reseñas a la derecha (fila de 2 + fila de 3 en desktop).

// ── Ilustración botánica de línea (line-art SVG), extremo izquierdo, decorativa.
function Botanical() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="pointer-events-none absolute -left-14 bottom-8 w-[38vw] max-w-[420px] shrink-0 text-warm-white opacity-[0.14] lg:bottom-16"
    >
      {/* Tallo principal */}
      <path d="M28 320 C32 260 40 200 56 140 C70 90 88 46 96 6" strokeWidth="1.6" />
      {/* Hojas pendientes hacia la izquierda */}
      <path d="M52 176 C26 168 12 150 10 128 C12 112 30 112 34 130" />
      <path d="M58 140 C34 118 30 92 44 72 C58 56 72 66 68 88" />
      <path d="M66 108 C50 74 60 42 82 30 C98 22 108 40 94 62" />
      <path d="M74 80 C66 48 78 24 100 14 C116 6 122 28 106 44" />
      {/* Hojas hacia la derecha */}
      <path d="M34 220 C10 214 0 196 4 180 C10 166 28 172 36 192" />
      <path d="M44 272 C18 270 8 252 14 236 C20 220 40 224 48 246" />
      <path d="M54 308 C30 306 22 290 28 276" />
      {/* Zarcillos */}
      <path d="M88 52 C98 40 96 26 84 22" />
      <path d="M62 160 C50 152 48 142 56 136" />
    </svg>
  )
}

// ── Ícono "G" de Google (decorativo, multicolor oficioso).
function GoogleG({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M21.6 12.2c0-.7-.06-1.4-.18-2.05H12v3.88h5.38a4.87 4.87 0 0 1-2.12 3.2v2.66h3.43c2.01-1.85 3.16-4.58 3.16-7.7Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.9 0 5.33-.95 7.1-2.59l-3.43-2.65c-.95.64-2.17 1.02-3.67 1.02-2.82 0-5.2-1.9-6.06-4.46H2.43v2.74A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M5.94 13.32a6.08 6.08 0 0 1 0-3.86V6.72H2.43a10 10 0 0 0 0 9l3.5-2.4Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.77c1.57 0 2.99.54 4.1 1.6l3.07-3A10 10 0 0 0 2.44 6.72l3.5 2.74C6.8 7.66 9.18 5.77 12 5.77Z"
      />
    </svg>
  )
}

function Stars() {
  return (
    <span
      role="img"
      aria-label={`${testimonialsSection.ratingValue} estrellas de 5`}
      className="inline-flex items-center gap-1"
    >
      {Array.from({ length: testimonialsSection.ratingStars }).map((_, index) => (
        <Star key={index} aria-hidden="true" className="h-4 w-4 fill-primary text-primary" />
      ))}
    </span>
  )
}

function GoogleBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-warm-white/70">
      <GoogleG />
      <span className="text-[13px]">Google</span>
    </span>
  )
}

// ── Reseña editorial: sin fondo, comillas grandes, texto completo, estrellas
// debajo del texto, autor y fuente Google al pie.
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex h-full flex-col">
      <Quote aria-hidden="true" className="h-8 w-8 text-primary/70" />
      <blockquote className="mt-5 flex-1">
        <p className="text-[15px] leading-relaxed text-warm-white/90">
          {testimonial.quote}
        </p>
      </blockquote>
      <footer className="mt-7 border-t border-warm-white/10 pt-5">
        <Stars />
        <p className="mt-2.5 font-semibold text-warm-white">{testimonial.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-warm-white/60">
          Reseña de Google
          <GoogleG className="h-3.5 w-3.5" />
        </p>
      </footer>
    </article>
  )
}

export function Testimonials() {
  const reducedMotion = useReducedMotion()

  // Composición 2 + 3: las dos primeras reseñas (fila superior) y las tres
  // restantes (fila inferior). El sexto testimonio (Luciana Fleita) se renderiza
  // únicamente en la columna izquierda, debajo del bloque editorial, por lo que
  // la columna derecha excluye el último elemento para evitar duplicados.
  const topRow = testimonials.slice(0, 2)
  const bottomRow = testimonials.slice(2, -1)
  const featuredSixth = testimonials[testimonials.length - 1]

  return (
    <section
      id="testimonios"
      className="relative overflow-hidden bg-deep-earth py-24 text-warm-white lg:py-36"
    >
      {/* Fotografía de fondo panorámica (background-size: cover conserva la
          proporción original, recorta solo lo necesario y nunca deforma). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${rioBackground})`,
          backgroundPosition: 'center 40%',
          backgroundSize: 'cover',
        }}
      />
      {/* Overlay: más intenso a la izquierda para lectura, imagen visible a la derecha */}
      <div aria-hidden="true" className="absolute inset-0 bg-deep-earth/70" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-deep-earth/80 via-deep-earth/30 to-deep-earth/0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-deep-earth/70 to-transparent"
      />

      <Botanical />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ── COLUMNA IZQUIERDA ─────────────────────────── */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/70">
              <span aria-hidden="true" className="h-px w-10 bg-primary" />
              {testimonialsSection.eyebrow}
            </p>

            <h2 className="mt-5 text-primary text-h2 leading-tight">
              {testimonialsSection.titleLine1}
              <br />
              {testimonialsSection.titleLine2}
            </h2>

            <p className="mt-5 max-w-md text-body-lg text-warm-white/85">
              {testimonialsSection.description}
            </p>

            {/* Detalle ornamental vegetal */}
            <div aria-hidden="true" className="mt-8 flex items-center gap-4">
              <span className="h-px w-14 bg-warm-white/25" />
              <span className="text-primary">❧</span>
              <span className="h-px w-14 bg-warm-white/25" />
            </div>

            {/* Rating general */}
            <div className="mt-8 flex items-center gap-4">
              <span className="font-display text-5xl leading-none text-warm-white">
                {testimonialsSection.ratingValue}
              </span>
              <div>
                <Stars />
                <p className="mt-1.5 text-sm text-warm-white/70">
                  {testimonialsSection.ratingLabel}
                </p>
                <p className="mt-1">
                  <GoogleBadge />
                </p>
              </div>
            </div>

            <a
              href={testimonialsSection.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-warm-white/30 px-7 py-3.5 text-sm font-semibold text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-deep-earth focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {testimonialsSection.cta}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Sexta reseña (Luciana Fleita): ocupa el espacio vacío inferior izquierdo */}
            <div className="mt-12 border-t border-warm-white/10 pt-8">
              <TestimonialCard testimonial={featuredSixth} />
            </div>
          </motion.div>

          {/* ── COLUMNA DERECHA: 5 reseñas visibles ───────── */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-7"
          >
            {/* Fila superior: 2 reseñas */}
            <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
              {topRow.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>

            {/* Fila inferior: 3 reseñas */}
            <div className="mt-12 grid gap-x-10 gap-y-12 border-t border-warm-white/10 pt-12 md:grid-cols-2 lg:grid-cols-3">
              {bottomRow.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Borde inferior orgánico (conecta con PreReserva, fondo deep-earth) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-10 w-full text-deep-earth lg:h-14"
      >
        <path
          fill="currentColor"
          d="M0,32 C240,64 480,6 720,24 C960,42 1200,64 1440,36 L1440,60 L0,60 Z"
        />
      </svg>
    </section>
  )
}