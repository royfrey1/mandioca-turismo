// CONTENIDO DEMO — REEMPLAZAR CON INFORMACIÓN REAL DEL CLIENTE
// Los textos (nombres, descripciones, duraciones, dificultades, modalidades y
// textos de la sección) son FICTICIOS y de muestra. No presentar como
// información oficial de Mandioca.
// IMÁGENES [REAL]:
//   - Senderismo: `src/assets/EXPERIENCIAS/senderismo.jpg`
//   - Ciclismo:   `src/assets/EXPERIENCIAS/ciclismo.jpg`
//   - Flora y fauna: `src/assets/EXPERIENCIAS/avistaje.jpg`
//   Fotos reales del propietario (carpeta EXPERIENCIAS/). Ya no hay placeholders DEMO.
//   La experiencia protagonista se marca con `featured: true` (mismo patrón que destinos).
//   Registrado en INFO_REAL_OBSERVADA.md.txt (§8).
import imgSenderismo from '../assets/EXPERIENCIAS/senderismo.jpg'
import imgCiclismo from '../assets/EXPERIENCIAS/ciclismo.jpg'
import imgAvistaje from '../assets/EXPERIENCIAS/avistaje.jpg'

export type ActivityId =
  | 'senderismo'
  | 'kayakismo'
  | 'ciclismo'
  | 'gastronomia'
  | 'turismo-rural'
  | 'campamentos'
  | 'astroturismo'
  | 'flora-fauna'
  | 'wellness'
  | 'luna-llena'

export type Difficulty = 'Baja' | 'Media' | 'Alta'

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
    id: 'senderismo-selva',
    name: 'Senderismo por la selva',
    activity: 'Senderismo',
    activityId: 'senderismo',
    accent: 'nature',
    description:
      'Recorrido guiado por senderos de la selva para conocer la vegetación nativa y los sonidos del monte misionero.',
    duration: 'Medio día',
    difficulty: 'Media',
    modality: 'Con guía local',
    image: imgSenderismo,
    featured: true,
    cta: { label: 'Consultar', href: '#pre-reserva' },
  },
  {
    id: 'ciclismo-rural',
    name: 'Bicicleteada por caminos rurales',
    activity: 'Ciclismo',
    activityId: 'ciclismo',
    accent: 'water',
    description:
      'Salida en bicicleta por caminos rurales y senderos de la zona, ideal para conectar con la naturaleza.',
    duration: 'Día completo',
    difficulty: 'Media',
    modality: 'Grupos reducidos',
    image: imgCiclismo,
    cta: { label: 'Consultar', href: '#pre-reserva' },
  },
  {
    id: 'flora-fauna',
    name: 'Avistaje de flora y fauna nativa',
    activity: 'Flora y fauna',
    activityId: 'flora-fauna',
    accent: 'earth',
    description:
      'Excursión de observación guiada para reconocer especies de plantas y animales del entorno misionero.',
    duration: 'Medio día',
    difficulty: 'Baja',
    modality: 'Con guía local',
    image: imgAvistaje,
    cta: { label: 'Consultar', href: '#pre-reserva' },
  },
]
