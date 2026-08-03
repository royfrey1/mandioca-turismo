import { activityTicker } from '../../data/activities'

function TickerGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {Array.from({ length: 2 }).flatMap((_, repetition) =>
        activityTicker.map((activity) => (
          <li key={`${repetition}-${activity}`} className="flex items-center">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.28em] text-warm-white/85">
              {activity}
            </span>
            <span
              aria-hidden="true"
              className="mx-6 block h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/90"
            />
          </li>
        )),
      )}
    </ul>
  )
}

export function ActivityTicker() {
  return (
    <div className="overflow-hidden border-b border-warm-white/10 bg-deep-earth py-4">
      <p className="sr-only">{activityTicker.join(', ')}</p>
      <div
        aria-hidden="true"
        className="flex w-max animate-marquee motion-reduce:animate-none"
      >
        <TickerGroup />
        <TickerGroup hidden />
      </div>
    </div>
  )
}
