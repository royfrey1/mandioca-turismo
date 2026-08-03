import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { gallery, gallerySection } from '../../data/gallery'
import type { GalleryAspect } from '../../data/gallery'

// Composición editorial tipo mosaico (masonry): las imágenes fluyen en columnas
// de altura variable (1 mobile / 2 tablet / 3 desktop) con separación mínima.
// Al hacer clic se abre una vista de pantalla completa (lightbox) que bloquea el
// scroll de la página de atrás. Entrada suave con Framer Motion al entrar en
// viewport, desactivada con prefers-reduced-motion.
const aspectClasses: Record<GalleryAspect, string> = {
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
}

export function Gallery() {
  const reduceMotion = useReducedMotion()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  const selected = selectedIndex !== null ? gallery[selectedIndex] : null
  const open = (index: number) => {
    openerRef.current = document.activeElement as HTMLElement | null
    setSelectedIndex(index)
  }
  const close = () => {
    setSelectedIndex(null)
    const opener = openerRef.current
    openerRef.current = null
    opener?.focus()
  }
  const next = () =>
    setSelectedIndex((current) =>
      current === null ? current : (current + 1) % gallery.length,
    )
  const prev = () =>
    setSelectedIndex((current) =>
      current === null ? current : (current - 1 + gallery.length) % gallery.length,
    )

  // Bloquear el scroll de la página mientras el lightbox está abierto.
  useEffect(() => {
    if (selectedIndex === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [selectedIndex])

  // Cerrar con Escape, navegar con flechas y enfocar el botón de cerrar.
  useEffect(() => {
    if (selectedIndex === null) return
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedIndex])

  return (
    <Section id="galeria" background="light" size="md">
      <Container>
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
            <span aria-hidden="true" className="h-px w-10 bg-nature" />
            {gallerySection.eyebrow}
          </p>
          <h2 className="mt-4 text-h2">{gallerySection.title}</h2>
          <p className="mt-5 text-body-lg text-ink">
            {gallerySection.description}
          </p>
        </div>

        <div className="mt-14 columns-1 gap-3 sm:columns-2 lg:mt-20 lg:columns-3 lg:gap-3">
          {gallery.map((item, index) => (
            <motion.figure
              key={item.id}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: reduceMotion ? 0 : index * 0.08,
              }}
              className="group mb-4 break-inside-avoid overflow-hidden rounded-card lg:mb-3"
            >
              <button
                type="button"
                onClick={() => open(index)}
                aria-label={`Ver ${item.caption ?? item.alt} en pantalla completa`}
                className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className={cn('relative overflow-hidden', aspectClasses[item.aspectRatio])}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-deep-earth/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      {item.category && (
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                          {item.category}
                        </p>
                      )}
                      {item.caption && (
                        <p className="mt-1 text-sm text-warm-white">{item.caption}</p>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </motion.figure>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Imagen ampliada: ${selected.caption ?? selected.alt}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-earth/95 p-4 sm:p-8"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) close()
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Cerrar imagen"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-warm-white/10 text-warm-white transition-colors duration-200 hover:bg-warm-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-warm-white/10 text-warm-white transition-colors duration-200 hover:bg-warm-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-warm-white/10 text-warm-white transition-colors duration-200 hover:bg-warm-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-4"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <img
              src={selected.image}
              alt={selected.alt}
              className="max-h-[85vh] max-w-full rounded-card object-contain"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-center sm:p-6">
              {selected.category && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {selected.category}
                </p>
              )}
              {selected.caption && (
                <p className="mt-1 text-sm text-warm-white">{selected.caption}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
