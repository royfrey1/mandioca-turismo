import { useCallback, useEffect, useRef, useState } from 'react'

type UseHeroCarouselOptions = {
  slideCount: number
  intervalMs?: number
  reducedMotion?: boolean
}

export function useHeroCarousel({
  slideCount,
  intervalMs = 6000,
  reducedMotion = false,
}: UseHeroCarouselOptions) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const indexRef = useRef(0)
  indexRef.current = index

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slideCount) + slideCount) % slideCount)
      clearTimer()
    },
    [slideCount, clearTimer],
  )

  const next = useCallback(() => {
    goTo(indexRef.current + 1)
  }, [goTo])

  const previous = useCallback(() => {
    goTo(indexRef.current - 1)
  }, [goTo])

  const pause = useCallback(() => setPaused(true), [])
  const play = useCallback(() => setPaused(false), [])

  useEffect(() => {
    if (paused || reducedMotion) return
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slideCount)
    }, intervalMs)
    return clearTimer
  }, [paused, reducedMotion, intervalMs, slideCount, index, clearTimer])

  useEffect(() => clearTimer, [clearTimer])

  return { index, paused, goTo, next, previous, pause, play }
}