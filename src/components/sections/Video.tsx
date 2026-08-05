import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { videoSection } from '../../data/video'

// Sección de video: embed de YouTube con reproducción automática (muteado),
// loop infinito y aspect ratio 16:9. Diseño editorial cinematográfico
// que continúa el storytelling visual de la Galería.
export function Video() {
  const reduceMotion = useReducedMotion()

  const src = `https://www.youtube.com/embed/${videoSection.videoId}?autoplay=1&mute=1&loop=1&playlist=${videoSection.videoId}&playsinline=1&rel=0&modestbranding=1`

  return (
    <Section id="experiencia" background="dark" size="md">
      <Container>
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-warm-white">
              <span aria-hidden="true" className="h-px w-10 bg-nature" />
              {videoSection.eyebrow}
            </p>
            <h2 className="mt-4 text-primary text-h3">{videoSection.title}</h2>
          </div>

          <div className="mt-3 aspect-video overflow-hidden rounded-card lg:mt-6">
            <iframe
              src={src}
              title={videoSection.iframeTitle}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
