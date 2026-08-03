// CONTENIDO DEMO — REEMPLAZAR CON INFORMACIÓN REAL DEL CLIENTE
// Nombres, descripciones y textos de esta sección son FICTICIOS y de muestra;
// no presentar como información oficial de Mandioca.
// Las imágenes reutilizan la serie `HERO/` hasta que el cliente provea
// fotografías reales de cada destino.
import imgSelva from '../assets/HERO/hero2.jpg'
import imgSaltos from '../assets/NOSOTROS/cascada.jpg'
import imgCaminoRural from '../assets/NOSOTROS/caminorural.jpg'

export type DestinationAccent = 'default' | 'water'

export type Destination = {
  id: string
  name: string
  description: string
  image: string
  featured?: boolean
  accent?: DestinationAccent
  cta: {
    label: string
    href: string
  }
}

export type DestinationsSectionContent = {
  eyebrow: string
  title: string
  description: string
}

export const destinationsSection: DestinationsSectionContent = {
  eyebrow: 'Destinos',
  title: 'Lugares que merecen ser descubiertos.',
  description:
    'Desde la selva profunda hasta los saltos de agua y los caminos rurales, descubrí algunos de los paisajes que hacen única a Misiones.',
}

export const destinations: Destination[] = [
  {
    id: 'la-selva',
    name: 'La Selva',
    description:
      'Senderos entre la vegetación nativa y la calma del monte, un punto de partida ideal para recorrer Misiones.',
    image: imgSelva,
    featured: true,
    cta: { label: 'Descubrir', href: '#pre-reserva' },
  },
  {
    id: 'los-saltos',
    name: 'Los Saltos',
    description:
      'Cascadas y cursos de agua para contemplar desde los senderos cercanos, en pleno contacto con la naturaleza.',
    image: imgSaltos,
    accent: 'water',
    cta: { label: 'Descubrir', href: '#pre-reserva' },
  },
  {
    id: 'el-camino-rural',
    name: 'El Camino Rural',
    description:
      'Caminos de tierra que atraviesan paisajes rurales, ideales para paseos tranquilos y cercanos a la vida local.',
    image: imgCaminoRural,
    cta: { label: 'Descubrir', href: '#pre-reserva' },
  },
]
