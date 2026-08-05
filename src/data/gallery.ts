// GALERÍA — CONTENIDO REAL [REAL]
// Todas las imágenes son fotos reales del propietario, ubicadas en `src/assets/GALERIA/`.
// Las primeras 6 son las que se muestran en el preview inicial; el resto se monta
// bajo demanda con el botón "Ver más". Los captions/categorías son descriptivos de
// tema, no fichas comerciales. Registrado en INFO_REAL_OBSERVADA.md.txt (§8).
import imgSelva from '../assets/GALERIA/selva.jpg'
import imgRutas from '../assets/GALERIA/rutasrurales.jpg'
import imgCascada from '../assets/GALERIA/cascada.jpg'
import imgKayak2 from '../assets/GALERIA/kayak2.jpg'
import imgCamino from '../assets/GALERIA/caminomisionero.jpg'
import imgFauna from '../assets/GALERIA/florayfauna.jpg'
import imgCabana from '../assets/GALERIA/cabaña.jpg'
import imgCabana2 from '../assets/GALERIA/cabaña2.jpg'
import imgCabana3 from '../assets/GALERIA/cabaña3.jpg'
import imgCabana4 from '../assets/GALERIA/cabaña4.jpg'
import imgCabana5 from '../assets/GALERIA/cabaña5.jpg'
import imgCasaLago from '../assets/GALERIA/casaenlago.jpg'
import imgFogata from '../assets/GALERIA/fogata.jpg'
import imgHuella from '../assets/GALERIA/huella.jpg'
import imgKayak3 from '../assets/GALERIA/kayak3.jpg'
import imgRio2 from '../assets/GALERIA/rio2.jpg'
import imgRios from '../assets/GALERIA/rios.jpg'
import imgRios2 from '../assets/GALERIA/rios2.jpg'
import imgTurismoNoc from '../assets/GALERIA/turismonoc.jpg'
import imgArroyo from '../assets/GALERIA/arroyo.jpg'
import imgFoto from '../assets/GALERIA/foto.jpg'
import imgCascada2 from '../assets/GALERIA/cascada2.jpg'
import imgExp from '../assets/GALERIA/exp.jpg'

export type GalleryAspect = 'landscape' | 'portrait' | 'square'

export type GalleryItem = {
  id: string
  image: string
  alt: string
  category?: string
  aspectRatio: GalleryAspect
  caption?: string
}

export type GallerySectionContent = {
  eyebrow: string
  title: string
  description: string
}

export const gallerySection: GallerySectionContent = {
  eyebrow: 'Galería',
  title: 'Misiones para vivir, no solo para ver.',
  description:
    'Selva, agua y personas en movimiento: un vistazo a las experiencias que se viven en cada salida.',
}

export const gallery: GalleryItem[] = [
  {
    id: 'g-selva',
    image: imgSelva,
    alt: 'Selva misionera',
    category: 'Naturaleza',
    aspectRatio: 'landscape',
    caption: 'Selva misionera',
  },
  {
    id: 'g-trekking',
    image: imgRutas,
    alt: 'Trekking por la selva misionera',
    category: 'Aventura',
    aspectRatio: 'portrait',
    caption: 'Trekking por la selva',
  },
  {
    id: 'g-saltos',
    image: imgCascada,
    alt: 'Saltos y cascadas de Misiones',
    category: 'Agua',
    aspectRatio: 'landscape',
    caption: 'Saltos y cascadas',
  },
  {
    id: 'g-kayak',
    image: imgKayak2,
    alt: 'Experiencia de kayak en ríos de Misiones',
    category: 'Agua',
    aspectRatio: 'portrait',
    caption: 'Kayak en los ríos',
  },
  {
    id: 'g-camino',
    image: imgCamino,
    alt: 'Camino rural misionero',
    category: 'Aventura',
    aspectRatio: 'square',
    caption: 'Caminos rurales',
  },
  {
    id: 'g-fauna',
    image: imgFauna,
    alt: 'Flora y fauna de Misiones',
    category: 'Naturaleza',
    aspectRatio: 'landscape',
    caption: 'Flora y fauna',
  },
  {
    id: 'g-cabana',
    image: imgCabana,
    alt: 'Cabaña en el entorno natural',
    category: 'Rural',
    aspectRatio: 'portrait',
    caption: 'Cabañas',
  },
  {
    id: 'g-cabana2',
    image: imgCabana2,
    alt: 'Cabaña en el entorno natural',
    category: 'Rural',
    aspectRatio: 'portrait',
    caption: 'Cabañas',
  },
  {
    id: 'g-cabana3',
    image: imgCabana3,
    alt: 'Cabaña en el entorno natural',
    category: 'Rural',
    aspectRatio: 'square',
    caption: 'Cabañas',
  },
  {
    id: 'g-cabana4',
    image: imgCabana4,
    alt: 'Cabaña en el entorno natural',
    category: 'Rural',
    aspectRatio: 'portrait',
    caption: 'Cabañas',
  },
  {
    id: 'g-cabana5',
    image: imgCabana5,
    alt: 'Cabaña en el entorno natural',
    category: 'Rural',
    aspectRatio: 'square',
    caption: 'Cabañas',
  },
  {
    id: 'g-casa-lago',
    image: imgCasaLago,
    alt: 'Casa junto al lago',
    category: 'Rural',
    aspectRatio: 'landscape',
    caption: 'Casa junto al lago',
  },
  {
    id: 'g-fogata',
    image: imgFogata,
    alt: 'Fogata en la noche',
    category: 'Nocturno',
    aspectRatio: 'landscape',
    caption: 'Fogata',
  },
  {
    id: 'g-huella',
    image: imgHuella,
    alt: 'Huella de fauna en la naturaleza',
    category: 'Fauna',
    aspectRatio: 'square',
    caption: 'Huellas de fauna',
  },
  {
    id: 'g-kayak3',
    image: imgKayak3,
    alt: 'Experiencia de kayak en ríos de Misiones',
    category: 'Agua',
    aspectRatio: 'portrait',
    caption: 'Kayak en los ríos',
  },
  {
    id: 'g-rio2',
    image: imgRio2,
    alt: 'Río de Misiones',
    category: 'Agua',
    aspectRatio: 'landscape',
    caption: 'Ríos',
  },
  {
    id: 'g-rios',
    image: imgRios,
    alt: 'Ríos de Misiones',
    category: 'Agua',
    aspectRatio: 'landscape',
    caption: 'Ríos',
  },
  {
    id: 'g-rios2',
    image: imgRios2,
    alt: 'Ríos de Misiones',
    category: 'Agua',
    aspectRatio: 'square',
    caption: 'Ríos',
  },
  {
    id: 'g-turismo-noc',
    image: imgTurismoNoc,
    alt: 'Turismo de naturaleza de noche',
    category: 'Nocturno',
    aspectRatio: 'portrait',
    caption: 'Turismo nocturno',
  },
  {
    id: 'g-arroyo',
    image: imgArroyo,
    alt: 'Arroyo de Misiones',
    category: 'Agua',
    aspectRatio: 'portrait',
    caption: 'Arroyos',
  },
  {
    id: 'g-foto',
    image: imgFoto,
    alt: 'Paisaje de Misiones',
    category: 'Naturaleza',
    aspectRatio: 'landscape',
    caption: 'Paisajes',
  },
  {
    id: 'g-cascada2',
    image: imgCascada2,
    alt: 'Cascada de Misiones',
    category: 'Agua',
    aspectRatio: 'landscape',
    caption: 'Cascadas',
  },
  {
    id: 'g-exp',
    image: imgExp,
    alt: 'Experiencia de naturaleza en Misiones',
    category: 'Aventura',
    aspectRatio: 'portrait',
    caption: 'Experiencias',
  },
]
