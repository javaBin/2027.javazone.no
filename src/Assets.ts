// Register images and icons here, with attribution and licensing info where required.
import jzEveningHarbour from '@/assets/journeyzone/evening-harbour.webp'
import jzHarbour from '@/assets/journeyzone/harbour.webp'
import jzHarbourBeer from '@/assets/journeyzone/harbour-beer.webp'
import jzHotTubs from '@/assets/journeyzone/hot-tubs.webp'
import khBarBokeh from '@/assets/journeyzone/klapphagen/bar-bokeh.webp'
import khBarLights from '@/assets/journeyzone/klapphagen/bar-lights.webp'
import khBoneMarrow from '@/assets/journeyzone/klapphagen/bone-marrow.webp'
import khCandles from '@/assets/journeyzone/klapphagen/candles.webp'
import khCrabGrill from '@/assets/journeyzone/klapphagen/crab-grill.webp'
import khEmbersSkewer from '@/assets/journeyzone/klapphagen/embers-skewer.webp'
import khEspressoMartini from '@/assets/journeyzone/klapphagen/espresso-martini.webp'
import khFireGrill from '@/assets/journeyzone/klapphagen/fire-grill.webp'
import khFiresideTable from '@/assets/journeyzone/klapphagen/fireside-table.webp'
import khFishStone from '@/assets/journeyzone/klapphagen/fish-stone.webp'
import khFlatfish from '@/assets/journeyzone/klapphagen/flatfish.webp'
import khGrateFire from '@/assets/journeyzone/klapphagen/grate-fire.webp'
import khGreenChairs from '@/assets/journeyzone/klapphagen/green-chairs.webp'
import khLobsterFire from '@/assets/journeyzone/klapphagen/lobster-fire.webp'
import khLobsterPlate from '@/assets/journeyzone/klapphagen/lobster-plate.webp'
import khMusselsFire from '@/assets/journeyzone/klapphagen/mussels-fire.webp'
import khRestaurant from '@/assets/journeyzone/klapphagen/restaurant.webp'
import khSuite from '@/assets/journeyzone/klapphagen/suite.webp'
import khWaiter from '@/assets/journeyzone/klapphagen/waiter.webp'
import khWineService from '@/assets/journeyzone/klapphagen/wine-service.webp'
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

const klapphagenLandscape = { width: 1600, height: 1067 }

// Kläpphagen photos © Kläpphagen Koster (klapphagen.se), used with permission for the JourneyZone page.
// Taken from their website, resized to WebP with metadata stripped; never upscaled past the source size.
const klapphagen = {
  lobsterPlate: { src: khLobsterPlate, width: 1067, height: 1600, alt: 'Grilled lobster with herbs on a dark plate, an open fire behind it' },
  crabGrill: { src: khCrabGrill, ...klapphagenLandscape, alt: 'A whole crab roasting on a grill over glowing embers' },
  boneMarrow: {
    src: khBoneMarrow,
    width: 1600,
    height: 1068,
    alt: 'A chef seasoning bone marrow and grilled vegetables in front of the kitchen fire',
  },
  musselsFire: { src: khMusselsFire, ...klapphagenLandscape, alt: 'Pans of gratinated mussels pulled out of a roaring wood fire' },
  fireGrill: { src: khFireGrill, ...klapphagenLandscape, alt: 'Flames under an open grill in the restaurant kitchen' },
  grateFire: { src: khGrateFire, width: 1440, height: 1800, alt: 'Food cooking on a hanging grate over open flames' },
  embersSkewer: { src: khEmbersSkewer, width: 853, height: 1280, alt: 'Langoustines on a skewer above red-hot embers' },
  lobsterFire: { src: khLobsterFire, width: 1440, height: 1800, alt: 'A whole lobster on a wooden table in front of a fire' },
  firesideTable: {
    src: khFiresideTable,
    width: 1600,
    height: 739,
    alt: 'A table laid with crayfish and white wine, the kitchen fire burning in the background',
  },
  flatfish: { src: khFlatfish, width: 1280, height: 854, alt: 'A cook holding a whole flatfish up to his face in front of the fire' },
  fishStone: { src: khFishStone, width: 1600, height: 1068, alt: 'A whole grilled fish laid on a hot stone slab, the fire glowing behind the cook' },
  barBokeh: { src: khBarBokeh, width: 1280, height: 853, alt: 'Bottles and glasses glowing on the shelves behind the bar at night' },
  candles: { src: khCandles, width: 1067, height: 1600, alt: 'Lit candles on a windowsill on a dark evening' },
  barLights: { src: khBarLights, width: 896, height: 896, alt: 'A ring of warm lights over the bar, guests and staff in soft focus' },
  waiter: { src: khWaiter, ...klapphagenLandscape, alt: 'A waiter in a leather apron carrying a plate through the dim restaurant' },
  greenChairs: { src: khGreenChairs, ...klapphagenLandscape, alt: 'Two green velvet armchairs by a stove in front of dark floral wallpaper' },
  espressoMartini: { src: khEspressoMartini, width: 1280, height: 854, alt: 'An espresso martini with fire glowing out of focus behind it' },
  wineService: { src: khWineService, ...klapphagenLandscape, alt: 'A waiter pouring wine for two guests in a room lined with firewood' },
  suite: { src: khSuite, width: 1440, height: 959, alt: 'A suite with a blue-panelled wall, floral wallpaper and a crystal chandelier' },
  restaurant: { src: khRestaurant, width: 1440, height: 960, alt: 'The restaurant at night, warm light along the long bar' },
} satisfies Record<string, Photo>

// Route map of the Skagerrak coast, drawn from OpenStreetMap coastline and Norway–Sweden border data.
// Data © OpenStreetMap contributors, ODbL — the credit must stay visible wherever the map is shown.
const journeyzoneMap = {
  src: jzMap,
  width: 800,
  height: 897,
  alt: 'Map of the Skagerrak coast with a dotted route from Väderöarna north to Ekenäs on Sydkoster, then fading out up the Oslofjord towards a question mark. Small sketches mark a langoustine, diving goggles and a thermometer by Väderöarna, and a tipi and campfire by Koster',
} satisfies Photo

export const Assets = { journeyzone, klapphagen, journeyzoneMap }
