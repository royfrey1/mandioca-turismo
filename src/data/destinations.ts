// CONTENIDO "EXPLORÁ MISIONES" — FUENTE DE VERDAD: "Copia de Actividades Mandioca para Ysyry.pdf"
// Destinos, actividades, modalidades y descripciones provienen EXCLUSIVAMENTE del PDF del propietario.
// NO inventar destinos, actividades, distancias, tiempos, precios ni duraciones que no figuren en el PDF.
//
// Distancias y tiempos desde Eldorado: el PDF no los documenta → se mantienen en `null` (TBD)
// hasta que el propietario confirme los valores. El panel muestra "A confirmar" mientras sea null.
//
// Mapa: asset REAL del propietario (src/assets/MAPA/mapa.jpg, 433×850). `misionesMap` activa el
// render de la imagen de fondo y `map.real` de cada destino posiciona los marcadores en el sistema
// del asset (píxeles). Las coordenadas se derivaron de la silueta de la provincia + geografía real
// de cada destino (PENDIENTE verificación visual del propietario). `map.x`/`map.y` se conservan
// como fallback conceptual si `real` es null. Ver INFO_REAL_OBSERVADA.md.txt.

import mapa from '../assets/MAPA/mapa.jpg'

export type DestinationAccent = 'default' | 'water' | 'nature' | 'earth'

export type MapIcon = 'home' | 'trees' | 'mountain' | 'droplets'

export type ActivityIcon =
  | 'kayak'
  | 'lancha'
  | 'safari'
  | 'route'
  | 'rural'
  | 'yerba'
  | 'senderismo'
  | 'parque'
  | 'salto'
  | 'agro'

export type DestinationActivity = {
  id: string
  name: string
  detail?: string
  icon?: ActivityIcon
}

export type Destination = {
  id: string
  name: string
  mapIcon: MapIcon
  accent: DestinationAccent
  summary: string
  modalidad?: string | null
  activities: DestinationActivity[]
  distanceFromEldoradoKm: number | null
  travelTimeFromEldoradoMin: number | null
  isBase?: boolean
  map: {
    // Posición CONCEPTUAL provisional (0-100, relativa al contenedor del mapa).
    // Fallback mientras `real` sea null.
    x: number
    y: number
    // Coordenada real sobre el asset oficial de Misiones (mapa.jpg), en píxeles del asset.
    // Derivada de la silueta de la provincia + geografía real de cada destino.
    // null solo mientras no se confirme la posición (muestra map.x/map.y).
    real: { x: number; y: number } | null
  }
}

export type SelfDriveContent = {
  eyebrow: string
  title: string
  intro: string
  advantages: { name: string; description: string }[]
  note: string
  vehicleNote: string
}

export type ExplorarSectionContent = {
  eyebrow: string
  title: string
  description: string
  baseLabel: string
  baseStatement: string
  destinoLabel: string
  distanceLabel: string
  travelLabel: string
  pendingValue: string
  activitiesLabel: string
  modalidadLabel: string
  ctaLabel: string
  selfDrive: SelfDriveContent
}

export const explorarSection: ExplorarSectionContent = {
  eyebrow: 'Explorá Misiones',
  title: 'Mandioca se mueve por distintos puntos de la provincia.',
  description:
    'Descubrí Misiones de una manera diferente, con experiencias de naturaleza, aventura y cultura local.',
  baseLabel: 'Base',
  baseStatement: 'Eldorado es la base de Mandioca.',
  destinoLabel: 'Destino',
  distanceLabel: 'Distancia desde Eldorado',
  travelLabel: 'Tiempo de viaje',
  pendingValue: 'A confirmar',
  activitiesLabel: 'Actividades',
  modalidadLabel: 'Modalidad',
  ctaLabel: 'Consultar',
  selfDrive: {
    eyebrow: 'Modalidad alternativa',
    title: 'Self Drive Safari',
    intro:
      '¿Tenés vehículo propio? El Self Drive Safari es una alternativa para conocer los destinos turísticos que ofrece Mandioca Turismo de Naturaleza con tu propio vehículo. Vos conducís tu vehículo junto a las personas que te acompañan y un Guía Especializado viaja con ustedes, acompañando y guiando toda la experiencia.',
    advantages: [
      {
        name: 'Comodidad',
        description: 'Te desplazás en tu propio vehículo junto a tus acompañantes.',
      },
      {
        name: 'Más económico',
        description: 'Solamente abonás los servicios de nuestro Guía Especializado.',
      },
    ],
    note:
      'Algunos de los caminos que recorremos son off road. Si tu vehículo no es SUV o camioneta, podrías encontrarte limitado para realizar determinadas actividades o acceder a algunos sectores del recorrido.',
    vehicleNote:
      'Antes de reservar, consultanos sobre el tipo de vehículo recomendado para cada experiencia.',
  },
}

export type MisionesMapAsset = {
  src: string
  width: number
  height: number
}

// Configuración centralizada del mapa de la sección "Explorá Misiones".
// - source: 'conceptual' = representación SVG decorativa de respaldo (TerritorySvg).
// - source: 'asset'      = mapa real de Misiones provisto por el propietario (mapa.jpg).
// El render de fondo y el posicionamiento de marcadores usan esta configuración:
// `map.real` de cada destino se expresa en píxeles del asset (sistema 0..width / 0..height).
export type MisionesMapConfig =
  | { source: 'conceptual' }
  | { source: 'asset'; asset: MisionesMapAsset }

export const misionesMap: MisionesMapConfig = {
  source: 'asset',
  asset: {
    src: mapa,
    width: 433,
    height: 850,
  },
}

export const destinations: Destination[] = [
  {
    id: 'eldorado',
    name: 'Eldorado',
    mapIcon: 'home',
    accent: 'water',
    summary:
      'Una experiencia para disfrutar del agua, la selva y los paisajes de la zona desde una perspectiva diferente.',
    modalidad: null,
    activities: [
      {
        id: 'kayak-lancha-piray-guazu',
        name: 'Kayak o lancha por el Arroyo Piray Guazú y el río Paraná',
        detail: 'Kayak: cupo máximo 4 personas · Lancha: cupo máximo 6 personas',
        icon: 'kayak',
      },
    ],
    distanceFromEldoradoKm: null,
    travelTimeFromEldoradoMin: null,
    isBase: true,
    map: {
      x: 42,
      y: 60,
      real: { x: 260, y: 380 },
    },
  },
  {
    id: 'andresito',
    name: 'Andresito',
    mapIcon: 'trees',
    accent: 'earth',
    summary:
      'Un destino donde la selva, los caminos de tierra colorada, los ríos, la producción yerbatera y la cultura local se encuentran.',
    modalidad: 'Full Day o 2 días / 1 noche',
    activities: [
      {
        id: 'safari-off-road',
        name: 'Safari Off Road',
        icon: 'safari',
      },
      {
        id: 'ruta-nacional-101',
        name: 'Ruta Nacional 101 y entorno del Parque Nacional Iguazú',
        icon: 'route',
      },
      {
        id: 'turismo-rural-rincon',
        name: 'Turismo Rural — El Rincón de los Recuerdos',
        icon: 'rural',
      },
      {
        id: 'cooperativa-yerbatera',
        name: 'Cooperativa Yerbatera Andresito',
        detail: 'Proceso productivo de la Yerba Mate',
        icon: 'yerba',
      },
      {
        id: 'kayakismo-san-antonio-iguazu',
        name: 'Kayakismo en río San Antonio y río Iguazú',
        icon: 'kayak',
      },
      {
        id: 'senderismo-andresito',
        name: 'Senderismo',
        detail:
          'Reserva Cabure-í · Reserva El Puente Verde · Parque Provincial Urugua-í',
        icon: 'senderismo',
      },
    ],
    distanceFromEldoradoKm: null,
    travelTimeFromEldoradoMin: null,
    map: {
      x: 72,
      y: 18,
      real: { x: 375, y: 240 },
    },
  },
  {
    id: 'san-pedro',
    name: 'San Pedro',
    mapIcon: 'mountain',
    accent: 'nature',
    summary:
      'Una experiencia de senderismo en algunos de los sectores naturales mejor conservados de la Selva Misionera.',
    modalidad: 'Full Day',
    activities: [
      {
        id: 'parque-cruce-caballero',
        name: 'Parque Provincial Cruce Caballero',
        icon: 'parque',
      },
      {
        id: 'parque-pinalito',
        name: 'Parque Provincial Piñalito',
        icon: 'parque',
      },
    ],
    distanceFromEldoradoKm: null,
    travelTimeFromEldoradoMin: null,
    map: {
      x: 74,
      y: 52,
      real: { x: 370, y: 420 },
    },
  },
  {
    id: 'saltos-cascadas',
    name: 'Saltos y Cascadas',
    mapIcon: 'droplets',
    accent: 'water',
    summary:
      'Un recorrido para descubrir algunos de los paisajes de agua más atractivos de Misiones.',
    modalidad: 'Full Day',
    activities: [
      {
        id: 'parque-salto-encantado',
        name: 'Parque Provincial Salto Encantado',
        icon: 'salto',
      },
      {
        id: 'agroturismo-piedras-blancas',
        name: 'Agroturismo Piedras Blancas',
        icon: 'agro',
      },
      {
        id: 'salto-orquidea',
        name: 'Salto Orquídea',
        icon: 'salto',
      },
    ],
    distanceFromEldoradoKm: null,
    travelTimeFromEldoradoMin: null,
    map: {
      x: 38,
      y: 84,
      real: { x: 215, y: 540 },
    },
  },
  {
    id: 'puerto-iguazu',
    name: 'Puerto Iguazú',
    mapIcon: 'droplets',
    accent: 'water',
    summary:
      'Un recorrido para descubrir las Cataratas del Iguazú y los atractivos naturales y turísticos de la zona.',
    modalidad: null,
    activities: [
      {
        id: 'cataratas-iguazu',
        name: 'Visitar las Cataratas del Iguazú',
        icon: 'salto',
      },
      {
        id: 'la-aripuca',
        name: 'La Aripuca',
        icon: 'parque',
      },
      {
        id: 'salto-el-turista',
        name: 'Salto El Turista',
        icon: 'salto',
      },
    ],
    distanceFromEldoradoKm: null,
    travelTimeFromEldoradoMin: null,
    map: {
      x: 0,
      y: 0,
      real: { x: 275, y: 230 },
    },
  },
  {
    id: 'el-soberbio',
    name: 'El Soberbio',
    mapIcon: 'droplets',
    accent: 'water',
    summary:
      'Una experiencia para descubrir los Saltos del Moconá, uno de los fenómenos naturales más singulares de la Selva Misionera.',
    modalidad: null,
    activities: [
      {
        id: 'saltos-del-mocona',
        name: 'Saltos del Moconá',
        icon: 'salto',
      },
    ],
    distanceFromEldoradoKm: null,
    travelTimeFromEldoradoMin: null,
    map: {
      x: 0,
      y: 0,
      real: { x: 330, y: 540 },
    },
  },
]
