import { useEffect, useRef } from 'react'

import { routePath } from '@/components/journeyzone/routePath'

// Cumulative distance along the route, so progress moves the boat at an even speed.
const distances = routePath.reduce<number[]>((acc, [x, y], i) => {
  if (i === 0) return [0]
  const [px, py] = routePath[i - 1]
  return [...acc, acc[i - 1] + Math.hypot(x - px, y - py)]
}, [])
const totalLength = distances[distances.length - 1]

function pointAt(progress: number): [number, number] {
  const target = progress * totalLength
  const i = Math.max(
    1,
    distances.findIndex((d) => d >= target),
  )
  const [ax, ay] = routePath[i - 1]
  const [bx, by] = routePath[i]
  const t = (target - distances[i - 1]) / (distances[i] - distances[i - 1] || 1)
  return [ax + (bx - ax) * t, ay + (by - ay) * t]
}

// The boat icon is drawn in a 48×48 box; this point (mid-hull) sits on the route.
const BOAT_SCALE = 52 / 48
const STATIC_PROGRESS = 0.3
// Stop short of the end so the boat never covers the "?" in the Oslofjord.
const MAX_PROGRESS = 0.88

function boatTransform(progress: number, tilt = 0) {
  const [x, y] = pointAt(progress * MAX_PROGRESS)
  return `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${tilt.toFixed(2)}) scale(${BOAT_SCALE}) translate(-24 -35)`
}

interface SailingBoatProps {
  /** The element the map is drawn in; the boat sails as this scrolls through the viewport. */
  track: React.RefObject<HTMLElement | null>
}

// The boat sails while the map's centre scrolls from 65% to 25% down the viewport, i.e. it waits
// at Väderöarna until the map is well in view and reaches the Oslofjord as the map moves up.
const SAIL_FROM = 0.65
const SAIL_TO = 0.25

// A sailboat that follows the dotted route as the map scrolls past.
// Moves via a single transform per animation frame; stays put for prefers-reduced-motion.
const SailingBoat = ({ track }: SailingBoatProps) => {
  const boatRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const boat = boatRef.current
    const el = track.current
    if (!boat || !el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      if (reducedMotion.matches) {
        boat.setAttribute('transform', boatTransform(STATIC_PROGRESS))
        return
      }
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const vh = window.innerHeight
      const progress = Math.min(1, Math.max(0, (vh * SAIL_FROM - center) / (vh * (SAIL_FROM - SAIL_TO))))
      // A gentle rock from side to side while sailing.
      boat.setAttribute('transform', boatTransform(progress, Math.sin(progress * 40) * 4))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reducedMotion.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reducedMotion.removeEventListener('change', schedule)
    }
  }, [track])

  return (
    <svg viewBox="0 0 800 897" aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none">
      <g
        ref={boatRef}
        transform={boatTransform(0)}
        fill="var(--color-canvas)"
        stroke="var(--color-ink)"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 31V5" />
        <path d="M25.5 7C31 13 35 21 37.5 28.5H25.5Z" />
        <path d="M22.5 10L11 28.5H22.5Z" />
        <path d="M5.5 31.5H42.5L37 38.5H11.5Z" />
        <path d="M3 43.5c3-2 5-2 8 0s5 2 8 0 5-2 8 0 5 2 8 0 5-2 8 0" fill="none" />
      </g>
    </svg>
  )
}

export default SailingBoat
