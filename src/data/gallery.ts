// GALERÍA — CONTENIDO REAL [REAL]
// Todas las imágenes son fotos reales del propietario, ubicadas en `src/assets/GALERIA/`
// (carpeta provista para la galería). Cada item usa la foto dedicada de su categoría:
//   - `selvamisionera.jpg`    → selva
//   - `trekkingselva.jpg`     → trekking / aventura
//   - `saltosycascadas.jpg`   → saltos y cascadas / agua
//   - `kayak.jpg`             → kayak / agua
//   - `caminomisionero.jpg`   → caminos rurales
//   - `florayfauna.jpg`       → flora y fauna
// No quedan placeholders DEMO en la galería.
// Registrado en INFO_REAL_OBSERVADA.md.txt (§8).
import imgSelva from '../assets/GALERIA/selvamisionera.jpg'
import imgTrekking from '../assets/GALERIA/trekkingselva.jpg'
import imgSaltos from '../assets/GALERIA/saltosycascadas.jpg'
import imgKayak from '../assets/GALERIA/kayak.jpg'
import imgCamino from '../assets/GALERIA/caminomisionero.jpg'
import imgFauna from '../assets/GALERIA/florayfauna.jpg'

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
    image: imgTrekking,
    alt: 'Trekking por la selva misionera',
    category: 'Aventura',
    aspectRatio: 'portrait',
    caption: 'Trekking por la selva',
  },
  {
    id: 'g-saltos',
    image: imgSaltos,
    alt: 'Saltos y cascadas de Misiones',
    category: 'Agua',
    aspectRatio: 'landscape',
    caption: 'Saltos y cascadas',
  },
  {
    id: 'g-kayak',
    image: imgKayak,
    alt: 'Experiencia de kayak en ríos de Misiones',
    category: 'Agua',
    aspectRatio: 'square',
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
]
