// EXPERIENCIAS — Las 3 experiencias principales de Mandioca.
// IMÁGENES [REAL] (carpeta `src/assets/EXPERIENCIAS/`):
//   - Senderismo:             `senderismo.jpg`
//   - Saltos y cascadas:      `saltos.jpg`
//   - Kayak:                  `kayak.jpg`
// Duración, dificultad y modalidad: NO confirmadas por el cliente → "A coordinar"
// (no se inventan datos comerciales). Registrar manualmente cuando se confirmen.
import imgSenderismo from '../assets/EXPERIENCIAS/senderismo.jpg'
import imgSaltos from '../assets/EXPERIENCIAS/saltos.jpg'
import imgKayak from '../assets/EXPERIENCIAS/kayak.jpg'

export type ActivityId =
  | 'senderismo'
  | 'kayakismo'
  | 'saltos-cascadas'
  | 'cicloturismo'
  | 'gastronomia'
  | 'turismo-rural'
  | 'campamentos'
  | 'astroturismo'
  | 'flora-fauna'
  | 'wellness'
  | 'luna-llena'

export type Difficulty = 'Baja' | 'Media' | 'Alta' | 'A coordinar'

export type ExperienceAccent = 'nature' | 'water' | 'earth'

export type Experience = {
  id: string
  name: string
  description: string
  activity: string
  activityId: ActivityId
  accent: ExperienceAccent
  duration: string
  difficulty: Difficulty
  modality: string
  image: string
  cta: {
    label: string
    href: string
  }
  featured?: boolean
  demo?: boolean
}

export type ExperiencesSectionContent = {
  eyebrow: string
  title: string
  description: string
}

export const experiencesSection: ExperiencesSectionContent = {
  eyebrow: 'Experiencias',
  title: 'Descubrí la naturaleza de Misiones',
  description:
    'Una muestra de experiencias de naturaleza y aventura acompañadas por guías locales, para descubrir la selva y los paisajes de Misiones.',
}

export const experiences: Experience[] = [
  {
    id: 'senderismo',
    name: 'Senderismo',
    activity: 'Senderismo',
    activityId: 'senderismo',
    accent: 'nature',
    description:
      'Excursiones guiadas por senderos de la selva para conectar con la vegetación nativa y los sonidos del monte misionero.',
    duration: 'A coordinar',
    difficulty: 'A coordinar',
    modality: 'Con guía local',
    image: imgSenderismo,
    featured: true,
    cta: { label: 'Consultar', href: '#pre-reserva' },
  },
  {
    id: 'saltos-cascadas',
    name: 'Saltos y cascadas de Misiones',
    activity: 'Saltos y cascadas',
    activityId: 'saltos-cascadas',
    accent: 'water',
    description:
      'Recorridos para descubrir saltos y cascadas en los entornos naturales de la provincia.',
    duration: 'A coordinar',
    difficulty: 'A coordinar',
    modality: 'Con guía local',
    image: imgSaltos,
    cta: { label: 'Consultar', href: '#pre-reserva' },
  },
  {
    id: 'kayak',
    name: 'Kayak',
    activity: 'Kayak',
    activityId: 'kayakismo',
    accent: 'water',
    description:
      'Salidas de kayak por ríos y arroyos para explorar los paisajes de Misiones desde el agua.',
    duration: 'A coordinar',
    difficulty: 'A coordinar',
    modality: 'Con guía local',
    image: imgKayak,
    cta: { label: 'Consultar', href: '#pre-reserva' },
  },
]
