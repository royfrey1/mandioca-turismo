import { lazy, Suspense } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { WhatsAppButton } from './components/layout/WhatsAppButton'
import { Hero } from './components/sections/Hero'
import { ActivityTicker } from './components/sections/ActivityTicker'
import { Experiences } from './components/sections/Experiences'
import { Destinations } from './components/sections/Destinations'
import { About } from './components/sections/About'
import { Testimonials } from './components/sections/Testimonials'
import { PreReserva } from './components/sections/PreReserva'
import { Section } from './components/layout/Section'
import { Container } from './components/layout/Container'
import { cn } from './lib/cn'

const Gallery = lazy(() =>
  import('./components/sections/Gallery').then(({ Gallery }) => ({ default: Gallery })),
)

const fallbackAspects = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-square', 'aspect-square', 'aspect-[4/3]']

function GalleryFallback() {
  return (
    <Section id="galeria" background="light" size="md" aria-hidden="true">
      <Container>
        <div className="max-w-2xl">
          <div className="h-3 w-24 bg-ink/10" />
          <div className="mt-4 h-8 w-full max-w-xl rounded bg-ink/10" />
          <div className="mt-5 h-5 w-full max-w-md rounded bg-ink/10" />
        </div>
        <div className="mt-14 columns-1 gap-2 sm:columns-2 lg:mt-20 lg:columns-3 lg:gap-3">
          {fallbackAspects.map((aspect, index) => (
            <div
              key={index}
              className={cn(
                'mb-2 break-inside-avoid overflow-hidden rounded-card bg-ink/10 lg:mb-3',
                aspect,
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-warm-white font-sans text-ink">
        <Hero />
        <ActivityTicker />
        <Experiences />
        <Destinations />
        <About />
        <Suspense fallback={<GalleryFallback />}>
          <Gallery />
        </Suspense>
        <Testimonials />
        <PreReserva />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
