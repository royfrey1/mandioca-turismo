import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Droplets, Home, Mountain, TreePine } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { explorarSection, misionesMap } from '../../../data/destinations'
import type { Destination, MapIcon } from '../../../data/destinations'

// ——— Recorte visual del asset en desktop ———
// El asset (mapa.jpg, 433×850) tiene mucho blanco arriba/abajo: la provincia ocupa
// y 219–736. En desktop se recorta visualmente ese blanco (contenedor más corto +
// imagen desplazada) para que la provincia sea protagonista, sin deformarla ni
// cambiar las coordenadas de los destinos. En mobile se conserva la composición original.
const ASSET_WIDTH = 433
const ASSET_HEIGHT = 850
const CROP_TOP = 180 // px del asset: borde superior visible (provincia empieza en 219)
const CROP_BOTTOM = 65 // px del asset: borde inferior visible (provincia termina en 736)
const VISIBLE_HEIGHT = ASSET_HEIGHT - CROP_TOP - CROP_BOTTOM // 605
// Margen de seguridad (%) alrededor del área interactiva para que las etiquetas de
// marcadores cercanos a los bordes (Andresito, San Pedro) no se recorten.
const H_INSET = 2.5
const V_INSET = 1.5

// Elementos cartográficos auxiliares del asset que no aportan al diseño editorial y se
// tapan con el fondo light-warm en desktop (coordenadas en px del asset): bloque naranja,
// textos sueltos, escala, brújula y leyenda.
const AUX_RECTS: { x0: number; y0: number; x1: number; y1: number }[] = [
  { x0: 96, y0: 384, x1: 168, y1: 490 }, // bloque naranja lateral
  { x0: 152, y0: 304, x1: 236, y1: 334 }, // texto auxiliar superior
  { x0: 30, y0: 464, x1: 90, y1: 542 }, // escala vertical
  { x0: 318, y0: 599, x1: 380, y1: 617 }, // brújula inferior-derecha
  { x0: 216, y0: 644, x1: 340, y1: 674 }, // leyenda (texto superior)
  { x0: 204, y0: 668, x1: 340, y1: 716 }, // leyenda (caja verde + texto)
]

function rectStyle(rect: (typeof AUX_RECTS)[number]) {
  return {
    left: `${(rect.x0 / ASSET_WIDTH) * 100}%`,
    top: `${((rect.y0 - CROP_TOP) / VISIBLE_HEIGHT) * 100}%`,
    width: `${((rect.x1 - rect.x0) / ASSET_WIDTH) * 100}%`,
    height: `${((rect.y1 - rect.y0) / VISIBLE_HEIGHT) * 100}%`,
  }
}

// El recorte y el área segura se aplican solo en desktop (≥1024px, mismo corte que lg:).
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(min-width: 1024px)').matches,
  )
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const handle = (event: MediaQueryListEvent) => setIsDesktop(event.matches)
    mql.addEventListener('change', handle)
    return () => mql.removeEventListener('change', handle)
  }, [])
  return isDesktop
}

// Icono de marcador según el destino (Lucide provisional; se puede reemplazar por
// la iconografía oficial de ICONOS/ cuando se confirme el mapeo archivo → actividad).
const mapIcons: Record<MapIcon, LucideIcon> = {
  home: Home,
  trees: TreePine,
  mountain: Mountain,
  droplets: Droplets,
}

// Coordenadas relativas (0-100) → punto del SVG de la ruta (viewBox 0 0 100 100).
type MapPoint = { x: number; y: number }

// ÚNICO punto de conmutación de posiciones de marcadores.
// El asset oficial está activo (misionesMap.source === 'asset') → devuelve el % calculado
// a partir de las coordenadas reales del destino en el sistema del asset:
//   sin recorte:  %x = (map.real.x / ASSET_WIDTH) * 100 ; %y = (map.real.y / ASSET_HEIGHT) * 100
//   desktop:      %y = ((map.real.y - CROP_TOP) / VISIBLE_HEIGHT) * 100 (recorte del blanco)
// En desktop los marcadores se expresan además dentro del área segura (inset) para que sus
// etiquetas no se recorten. Si `real` es null (fallback), usa map.x/map.y.
// marcadores y ruta siguen usando % → la interacción no cambia.
function toInset(containerPct: number, inset: number): number {
  return ((containerPct - inset) / (100 - 2 * inset)) * 100
}

function getMarkerPercent(destination: Destination, cropped: boolean): MapPoint {
  if (misionesMap.source === 'asset' && destination.map.real) {
    if (cropped) {
      return {
        x: toInset((destination.map.real.x / ASSET_WIDTH) * 100, H_INSET),
        y: toInset(((destination.map.real.y - CROP_TOP) / VISIBLE_HEIGHT) * 100, V_INSET),
      }
    }
    return {
      x: (destination.map.real.x / ASSET_WIDTH) * 100,
      y: (destination.map.real.y / ASSET_HEIGHT) * 100,
    }
  }
  return { x: destination.map.x, y: destination.map.y }
}

function buildRoutePath(base: MapPoint, target: MapPoint) {
  const dx = target.x - base.x
  const dy = target.y - base.y
  const length = Math.hypot(dx, dy) || 1
  const px = -dy / length
  const py = dx / length
  const bend = 12
  const mx = (base.x + target.x) / 2 + px * bend
  const my = (base.y + target.y) / 2 + py * bend
  return `M ${base.x} ${base.y} Q ${mx} ${my} ${target.x} ${target.y}`
}

// Fondo de respaldo cuando misionesMap.source === 'conceptual' (NO activo hoy): representación
// ABSTRACTA/CONCEPTUAL, NO un mapa geográfico exacto (AGENTS/DESING_SYSTEM: no inventar
// una silueta precisa). Contornos topográficos decorativos + línea de río. Se mantiene solo
// como fallback mientras el asset real (misionesMap.source === 'asset') esté configurado.
function TerritorySvg() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M 92 58 C 200 18, 330 36, 342 138 C 356 258, 330 356, 302 428 C 244 470, 122 452, 92 378 C 56 300, 40 178, 92 58 Z"
        fill="var(--color-deep-earth)"
        fillOpacity="0.03"
        stroke="var(--color-deep-earth)"
        strokeOpacity="0.14"
        strokeWidth="1.5"
      />
      <path
        d="M 120 108 C 196 80, 292 96, 302 170 C 312 250, 292 318, 266 382 C 220 408, 142 396, 118 340 C 92 286, 82 176, 120 108 Z"
        fill="none"
        stroke="var(--color-deep-earth)"
        strokeOpacity="0.08"
        strokeWidth="1.5"
      />
      <path
        d="M 148 158 C 202 138, 268 150, 276 206 C 284 264, 268 310, 248 356 C 216 374, 160 366, 144 326 C 126 286, 120 200, 148 158 Z"
        fill="none"
        stroke="var(--color-deep-earth)"
        strokeOpacity="0.06"
        strokeWidth="1.5"
      />
      <path
        d="M 78 30 C 66 118, 96 196, 80 282 C 70 342, 88 404, 98 460"
        fill="none"
        stroke="var(--color-water)"
        strokeOpacity="0.22"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 92 40 C 82 120, 108 192, 94 270 C 86 330, 102 392, 110 448"
        fill="none"
        stroke="var(--color-water)"
        strokeOpacity="0.1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="330" cy="110" r="2.5" fill="var(--color-deep-earth)" fillOpacity="0.12" />
      <circle cx="120" cy="230" r="2" fill="var(--color-deep-earth)" fillOpacity="0.12" />
      <circle cx="290" cy="300" r="2.5" fill="var(--color-deep-earth)" fillOpacity="0.12" />
      <circle cx="150" cy="400" r="2" fill="var(--color-deep-earth)" fillOpacity="0.12" />
    </svg>
  )
}

// Fondo del mapa cuando misionesMap.source === 'asset' (activo): renderiza el mapa real de
// Misiones provisto por el propietario (mapa.jpg, 433×850). El contenedor usa el MISMO ratio
// de la imagen (o el recorte en desktop) para que no se deforme ni recorte mal y los
// marcadores/ruta en % queden alineados. En desktop la imagen se desplaza hacia arriba
// (recorte del blanco) y usa mix-blend-multiply para fundir su fondo blanco con el
// bg-light-warm de la tarjeta. Decorative/aria-hidden: la información se comunica mediante
// los marcadores y el panel.
function MapAsset({ cropped }: { cropped: boolean }) {
  if (misionesMap.source !== 'asset') return null
  if (cropped) {
    return (
      <img
        src={misionesMap.asset.src}
        width={misionesMap.asset.width}
        height={misionesMap.asset.height}
        alt=""
        aria-hidden="true"
        className="absolute left-0 w-full mix-blend-multiply"
        style={{
          width: '100%',
          height: 'auto',
          top: `${(-CROP_TOP / VISIBLE_HEIGHT) * 100}%`,
        }}
      />
    )
  }
  return (
    <img
      src={misionesMap.asset.src}
      width={misionesMap.asset.width}
      height={misionesMap.asset.height}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}

type MisionesMapProps = {
  destinations: Destination[]
  activeId: string
  onSelect: (id: string) => void
}

export function MisionesMap({ destinations, activeId, onSelect }: MisionesMapProps) {
  const reduceMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const cropped = isDesktop && misionesMap.source === 'asset'
  const base = destinations.find((destination) => destination.isBase) ?? destinations[0]
  const active = destinations.find((destination) => destination.id === activeId) ?? base
  const hasRoute = active.id !== base.id
  const basePoint = getMarkerPercent(base, cropped)
  const activePoint = getMarkerPercent(active, cropped)

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-card border border-deep-earth/10 bg-light-warm',
        cropped ? 'aspect-[433/605]' : 'aspect-[433/850]',
      )}
    >
      {misionesMap.source === 'asset' ? <MapAsset cropped={cropped} /> : <TerritorySvg />}

      {cropped &&
        AUX_RECTS.map((rect, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="pointer-events-none absolute bg-light-warm"
            style={rectStyle(rect)}
          />
        ))}

      <div
        className="absolute inset-0"
        style={
          cropped
            ? { top: '1.5%', right: '2.5%', bottom: '1.5%', left: '2.5%' }
            : undefined
        }
      >
      {hasRoute && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            key={active.id}
            d={buildRoutePath(basePoint, activePoint)}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="0.5"
            strokeDasharray="1.2 1.6"
            strokeLinecap="round"
            initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </svg>
      )}

      {destinations.map((destination) => {
        const isBase = !!destination.isBase
        const isActive = destination.id === activeId
        const Icon = mapIcons[destination.mapIcon]
        const point = getMarkerPercent(destination, cropped)
        return (
          <button
            key={destination.id}
            type="button"
            aria-pressed={isActive}
            aria-label={`${destination.name}${isBase ? `, ${explorarSection.baseLabel} de Mandioca` : ''}`}
            onClick={() => onSelect(destination.id)}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <span className="flex flex-col-reverse items-center gap-1">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border shadow-soft transition-colors duration-200',
                  isBase
                    ? 'border-deep-earth/20 bg-deep-earth text-warm-white'
                    : isActive
                      ? 'motion-safe:scale-110 border-transparent bg-primary text-deep-earth ring-3 ring-primary/20'
                      : 'border-deep-earth/15 bg-warm-white text-deep-earth hover:border-earth hover:bg-earth/10',
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span
                className={cn(
                  'whitespace-nowrap rounded-full bg-warm-white/95 px-2 py-0.5 text-[10px] font-semibold shadow-soft',
                  isActive ? 'text-deep-earth' : 'text-ink/80',
                )}
              >
                {destination.name}
                {isBase ? ` · ${explorarSection.baseLabel}` : ''}
              </span>
            </span>
          </button>
        )
      })}

      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-warm-white/90 px-3 py-1.5 text-xs font-semibold text-deep-earth shadow-soft">
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
        {explorarSection.baseLabel}: {base.name}
      </div>
    </div>
  )
}
