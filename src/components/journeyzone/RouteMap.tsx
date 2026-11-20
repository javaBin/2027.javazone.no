import { useRef } from 'react'

import { Assets } from '@/Assets'
import SailingBoat from '@/components/journeyzone/SailingBoat'

const map = Assets.journeyzoneMap

// Label positions in % of the map image, computed from the same projection that drew the SVG.
// Stop labels sit to the west of their dot (in open sea); x is where the label ends.
const stops = [
  { name: 'Väderöarna', x: 51.05, y: 79.62 },
  { name: 'Ekenäs', x: 47.63, y: 50.97 },
]

// Where the tapering route fades out in the Oslofjord, at Hollenderbåen.
const destination = { x: 30.32, y: 26.6 }

const regions = [
  { name: 'Norway', x: 68.42, y: 13.82 },
  { name: 'Sweden', x: 86.84, y: 63.99 },
]

// Stylised line map with no background: coastlines, border and route dots are in the SVG;
// labels are HTML on top so they use the site font and stay sharp at any size.
const RouteMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)

  return (
    <figure className="m-0">
      <div ref={mapRef} className="relative">
        <img src={map.src} alt={map.alt} width={map.width} height={map.height} loading="lazy" decoding="async" className="block w-full h-auto" />
        <SailingBoat track={mapRef} />
        {regions.map((region) => (
          <span
            key={region.name}
            aria-hidden="true"
            className="absolute text-[0.625rem] font-semibold tracking-[0.2em] uppercase -translate-x-1/2 -translate-y-1/2 text-muted md:text-xs"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
          >
            {region.name}
          </span>
        ))}
        {stops.map((stop) => (
          <span
            key={stop.name}
            aria-hidden="true"
            className="absolute text-xs font-semibold -translate-x-full -translate-y-1/2 text-ink md:text-base"
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
          >
            {stop.name}
          </span>
        ))}
        <span
          aria-hidden="true"
          className="absolute text-2xl font-bold leading-none -translate-x-1/2 -translate-y-1/2 text-ink md:text-4xl"
          style={{ left: `${destination.x}%`, top: `${destination.y}%` }}
        >
          ?
        </span>
      </div>
      <figcaption className="mt-3 text-sm text-subtle">
        Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>
      </figcaption>
    </figure>
  )
}

export default RouteMap
