// TESTIMONIOS — CONTENIDO DEMO / PENDIENTE DE REEMPLAZO
// No existen testimonios reales todavía (ver INFO_REAL_OBSERVADA.md.txt §5).
// Los nombres, lugares y frases de abajo son FICTICIOS y de muestra: NO presentar
// como opiniones reales de Mandioca. Estructura lista para incorporar testimonios
// reales del cliente cuando los provea (AGENTS.md §21). Registrado en
// INFO_REAL_OBSERVADA.md.txt (§8).
export type Testimonial = {
  id: string
  name: string
  service?: string
  quote: string
  location?: string
  rating?: number
  image?: string
  featured?: boolean
}

export type TestimonialsSectionContent = {
  eyebrow: string
  title: string
  description: string
  demoNote: string
}

export const testimonialsSection: TestimonialsSectionContent = {
  eyebrow: 'Testimonios',
  title: 'Misiones se siente en cada salida.',
  description:
    'Lo que cuentan quienes vivieron una experiencia acompañados por guías locales.',
  demoNote:
    'Los testimonios mostrados son de muestra (DEMO) y están pendientes de reemplazo por testimonios reales del cliente.',
}

export const testimonials: Testimonial[] = [
  {
    id: 't-kayak',
    name: 'María',
    service: 'Kayak al amanecer',
    location: 'Buenos Aires',
    rating: 5,
    quote:
      'Remar al amanecer entre la bruma de la selva fue lo más silencioso y lindo que viví en Misiones. El guía hizo que todo se sintiera simple y especial.',
    featured: true,
  },
  {
    id: 't-trekking',
    name: 'Juan',
    service: 'Senderismo por la selva',
    location: 'Corrientes',
    rating: 5,
    quote:
      'Caminamos por senderos de tierra colorada que no habría encontrado por mi cuenta. Se nota que conocen el territorio.',
  },
  {
    id: 't-fauna',
    name: 'Camila',
    service: 'Avistaje de flora y fauna',
    location: 'Rosario',
    rating: 5,
    quote:
      'Vi una parte de Misiones que no sale en las postales. Todo con calma y respeto por el lugar.',
  },
]
