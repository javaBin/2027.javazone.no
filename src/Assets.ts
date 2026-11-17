// Register images and icons here, with attribution and licensing info where required.
import jzEveningHarbour from '@/assets/journeyzone/evening-harbour.webp'
import jzHarbour from '@/assets/journeyzone/harbour.webp'
import jzHarbourBeer from '@/assets/journeyzone/harbour-beer.webp'
import jzHotTubs from '@/assets/journeyzone/hot-tubs.webp'
import jzLangoustines from '@/assets/journeyzone/langoustines.webp'
import jzLean from '@/assets/journeyzone/lean.webp'
import jzLighthouseLadder from '@/assets/journeyzone/lighthouse-ladder.webp'
import jzMap from '@/assets/journeyzone/map.svg'
import jzSailboat from '@/assets/journeyzone/sailboat.webp'
import jzSauna from '@/assets/journeyzone/sauna.webp'
import jzSunset from '@/assets/journeyzone/sunset.webp'
import jzSwim from '@/assets/journeyzone/swim.webp'
import jzWind from '@/assets/journeyzone/wind.webp'
import type { Photo } from '@/components'

const landscape = { width: 1600, height: 1200 }
const portrait = { width: 1200, height: 1600 }

// JourneyZone photos © Andreas Røe.
// Resized to WebP with all metadata (incl. GPS) stripped; full-size originals are kept out of git.
const journeyzone = {
  harbour: { src: jzHarbour, width: 2400, height: 1800, alt: 'Red boathouses and a small harbour among bare granite islands at dusk' },
  sailboat: { src: jzSailboat, ...landscape, alt: 'A sailboat moored at a stone quay between rocky islands' },
  swim: { src: jzSwim, ...portrait, alt: 'Someone swimming off a wooden jetty in calm, clear water' },
  sauna: { src: jzSauna, ...portrait, alt: 'View of the sea and islands from inside a wood-fired sauna' },
  langoustines: { src: jzLangoustines, ...portrait, alt: 'A large pile of freshly cooked langoustines on a table' },
  sunset: { src: jzSunset, ...portrait, alt: 'Sunset over smooth coastal rocks and the open sea' },
  hotTubs: { src: jzHotTubs, ...landscape, alt: 'Two wood-fired hot tubs on a deck overlooking the archipelago at moonrise' },
  eveningHarbour: { src: jzEveningHarbour, width: 2400, height: 1800, alt: 'Lit-up houses along the harbour in the blue hour' },
  lighthouseLadder: { src: jzLighthouseLadder, ...portrait, alt: 'A smiling climber on a steep wooden ladder inside the lighthouse' },
  wind: { src: jzWind, ...portrait, alt: 'A participant in a sailing jacket leaning into the wind on the rocks' },
  harbourBeer: { src: jzHarbourBeer, ...portrait, alt: 'A participant raising a glass on the harbour deck' },
  lean: { src: jzLean, ...portrait, alt: 'A participant leaning into the wind above the sea' },
} satisfies Record<string, Photo>

// Route map of the Skagerrak coast, drawn from OpenStreetMap coastline and Norway–Sweden border data.
// Data © OpenStreetMap contributors, ODbL — the credit must stay visible wherever the map is shown.
const journeyzoneMap = {
  src: jzMap,
  width: 800,
  height: 897,
  alt: 'Map of the Skagerrak coast with a dotted route from Väderöarna north to Ekenäs on Sydkoster, then fading out up the Oslofjord towards a question mark. Small sketches mark a sailboat on the way, a langoustine, diving goggles and a thermometer by Väderöarna, and a tipi and campfire by Koster',
} satisfies Photo

export const Assets = { journeyzone, journeyzoneMap }
