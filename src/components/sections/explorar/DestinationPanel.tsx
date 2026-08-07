import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Anchor,
  ArrowRight,
  Car,
  Clock,
  Droplets,
  Footprints,
  Home,
  Leaf,
  MapPin,
  Route as RouteIcon,
  Sprout,
  TreePine,
  Waves,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { Button } from '../../ui/Button'
import { explorarSection } from '../../../data/destinations'
import type { ActivityIcon, Destination, DestinationAccent } from '../../../data/destinations'
import { trackEvent } from '../../../lib/analytics'

// Iconografía de actividades (Lucide provisional; se reemplaza por la iconografía
// oficial de ICONOS/ cuando se confirme el mapeo archivo → actividad).
const activityIcons: Record<ActivityIcon, LucideIcon> = {
  kayak: Waves,
  lancha: Anchor,
  safari: Car,
  route: RouteIcon,
  rural: Home,
  yerba: Leaf,
  senderismo: Footprints,
  parque: TreePine,
  salto: Droplets,
  agro: Sprout,
}

const accentBar: Record<DestinationAccent, string> = {
  default: 'bg-deep-earth/30',
  water: 'bg-water',
  nature: 'bg-nature',
  earth: 'bg-earth',
}

function formatKm(value: number | null) {
  return value === null ? explorarSection.pendingValue : `${value} km`
}

function formatMin(value: number | null) {
  return value === null ? explorarSection.pendingValue : `${value} min`
}

type DestinationPanelProps = {
  destination: Destination
}

export function DestinationPanel({ destination }: DestinationPanelProps) {
  const reduceMotion = useReducedMotion()
  const isBase = !!destination.isBase

  return (
    <div
      className="rounded-card border border-deep-earth/10 bg-light-warm p-6 shadow-soft lg:p-8"
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={destination.id}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
            <span aria-hidden="true" className={cn('h-px w-8', accentBar[destination.accent])} />
            {explorarSection.destinoLabel}
          </p>

          <h3 className="mt-3 text-h2 lg:text-h3">{destination.name}</h3>

          {isBase ? (
            <p className="mt-3 text-sm font-semibold text-deep-earth">
              {explorarSection.baseStatement}
            </p>
          ) : null}

          <p className="mt-3 text-body text-ink/80">{destination.summary}</p>

          {destination.modalidad ? (
            <div className="mt-5 flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-deep-earth/60" aria-hidden="true" />
              <p className="text-sm text-ink/80">
                <span className="font-semibold text-deep-earth">
                  {explorarSection.modalidadLabel}:
                </span>{' '}
                {destination.modalidad}
              </p>
            </div>
          ) : null}

          {!isBase ? (
            <dl className="mt-5 space-y-2.5 border-t border-deep-earth/10 pt-5">
              <div className="flex items-start justify-between gap-4">
                <dt className="flex items-center gap-2 text-sm text-ink/70">
                  <MapPin className="h-4 w-4 shrink-0 text-deep-earth/60" aria-hidden="true" />
                  {explorarSection.distanceLabel}
                </dt>
                <dd className="shrink-0 text-sm font-semibold text-deep-earth">
                  {formatKm(destination.distanceFromEldoradoKm)}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="flex items-center gap-2 text-sm text-ink/70">
                  <Clock className="h-4 w-4 shrink-0 text-deep-earth/60" aria-hidden="true" />
                  {explorarSection.travelLabel}
                </dt>
                <dd className="shrink-0 text-sm font-semibold text-deep-earth">
                  {formatMin(destination.travelTimeFromEldoradoMin)}
                </dd>
              </div>
            </dl>
          ) : null}

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/60">
              {explorarSection.activitiesLabel}
            </p>
            <ul className="mt-3 space-y-3.5">
              {destination.activities.map((activity) => {
                const Icon = activity.icon ? activityIcons[activity.icon] : null
                return (
                  <li key={activity.id} className="flex items-start gap-3">
                    {Icon ? (
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warm-white text-deep-earth ring-1 ring-deep-earth/10">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    ) : null}
                    <div>
                      <p className="text-sm font-semibold text-deep-earth">{activity.name}</p>
                      {activity.detail ? (
                        <p className="mt-0.5 text-sm text-ink/70">{activity.detail}</p>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-7">
            <Button
              href="#pre-reserva"
              className="group/cta"
              onClick={() =>
                trackEvent('click_pre_reservar', { link_location: 'section' })
              }
            >
              {explorarSection.ctaLabel}
              <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
