import { Assets } from '@/Assets'
import type { Topic } from '@/components'
import { Container, PageHeader, PhotoRows, TopicRows } from '@/components'
import RouteMap from '@/components/journeyzone/RouteMap'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const aboutTrip: Topic[] = [
  {
    title: 'When',
    body: <p>Thursday evening 16 to Sunday 19 September 2027, right after the conference. We are back in Oslo on Sunday evening.</p>,
  },
  {
    title: 'Where',
    body: <RouteMap />,
  },
  {
    title: 'Who can join',
    body: (
      <>
        <p>
          All speakers of JavaZone are invited to apply, but the number of spots is limited. Speakers of full presentations and workshops get
          priority; lightning talk speakers are welcome to apply. You need to be comfortable on a boat for a full day, in and on the water, and
          outdoors in September weather. No extraordinary physical ability is required, but parts of the trip are fast and bumpy. If you have a bad
          back, this is not the year for you. Let us know about any health conditions or allergies when you sign up.
        </p>
        <p>
          You must bring a valid passport and be allowed to legally enter Sweden and the Schengen area. If you need a visa, it is your responsibility
          to have it in place before the trip.
        </p>
      </>
    ),
  },
  {
    title: 'Cost',
    body: <p>JavaZone covers almost all expenses, but we require that all attendees pay NOK 1500.</p>,
  },
]

const packing: Topic[] = [
  {
    title: 'What to bring',
    body: (
      <p>
        Warm layers, a windproof and waterproof outer layer, shoes that can get wet, swimwear and a towel. Luggage is transported for you, but this
        year a duffel bag or similar soft bag is required. Suitcases do not fit on a boat and will not come with us. A detailed packing list will be
        sent closer to the event.
      </p>
    ),
  },
  {
    title: 'What not to bring',
    body: (
      <ul>
        <li>A suitcase. It will stay in Oslo, and so might you.</li>
        <li>Your best shoes. Salt water wins every time.</li>
        <li>A drone. The seabirds and the lighthouse keeper both have opinions.</li>
        <li>Seasickness. Leave it at home; if it insists on coming, bring the tablets.</li>
      </ul>
    ),
  },
]

const kh = Assets.klapphagen

const food: Topic[] = [
  {
    title: 'Food over fire',
    body: (
      <>
        <p>
          On Koster we stay at Kläpphagen, a farm from 1861 that is now a small island hotel with its own restaurant, bar and brewery. Every morning
          they light the fire in the kitchen, and almost everything that leaves it has been close to the flames. Typical of the kitchen are whole
          lobster and langoustines from the Koster sea, crab roasted on the embers, mussels pulled straight out of the fire, bone marrow, or an ox rib
          glazed with honey from North Koster.
        </p>
        <p>
          The menu follows the season and the catch, so what ends up on the plate when we are there is up to the kitchen. We can promise it is worth
          getting wet for.
        </p>
      </>
    ),
  },
]

const foodGallery = [
  [kh.firesideTable],
  [kh.lobsterPlate, kh.crabGrill, kh.embersSkewer],
  [kh.boneMarrow, kh.musselsFire],
  [kh.lobsterFire, kh.fireGrill, kh.grateFire],
  [kh.flatfish, kh.fishStone],
]

const stay: Topic[] = [
  {
    title: 'Evenings',
    body: (
      <p>
        When the kitchen fire burns down, the bar takes over: candles in the windows, a stove in the corner and a beer from their own brewery. Bed is
        a few steps away, in suites with floral wallpaper and chandeliers or in canvas tents in the garden.
      </p>
    ),
  },
]

const stayGallery = [
  [kh.barBokeh, kh.candles, kh.barLights],
  [kh.restaurant, kh.wineService, kh.waiter],
  [kh.suite, kh.greenChairs, kh.espressoMartini],
]

const photos = Assets.journeyzone

const gallery = [
  [photos.sailboat, photos.swim],
  [photos.sauna, photos.langoustines, photos.sunset],
  [photos.hotTubs, photos.harbour, photos.lighthouseLadder],
  [photos.wind, photos.harbourBeer, photos.lean],
]

const JourneyZonePage = () => {
  useOpenGraph(pageMeta.journeyzone)

  return (
    <>
      <PageHeader eyebrow="Speakers" title="JourneyZone 2027 – Back to the sea">
        <p>
          JourneyZone is our annual trip exclusively for speakers, right after the JavaZone conference. Every year we take you out of the city and
          into the Norwegian outdoors. This year we return to the sea. We leave from Norway, head out through the archipelago and sail between some of
          the finest islands on the Skagerrak coast: bare granite, a lighthouse station at the outer edge, a national park you can only reach by boat,
          and small harbours where the day ends with a sauna and a swim. These islands are not Norway today, but they once were, and for a weekend we
          are taking them back.
        </p>
        <p>
          This is not a cruise. You will haul ropes and trim sails, dive into cold, clear water, and fish your own dinner out of the open sea. No
          experience is needed, only the willingness to get wet, get your hands dirty and learn. The program is a surprise, and wind and weather have
          the final say.
        </p>
      </PageHeader>
      <Container>
        <img
          src={photos.eveningHarbour.src}
          alt={photos.eveningHarbour.alt}
          width={photos.eveningHarbour.width}
          height={photos.eveningHarbour.height}
          fetchPriority="high"
          className="block w-full h-auto aspect-[4/3] object-cover object-[50%_45%] rounded-surface bg-surface md:aspect-[2/1]"
        />
      </Container>
      <Container className="pt-16 pb-24 md:pt-20 lg:pt-28 lg:pb-32">
        <TopicRows topics={aboutTrip} />
        <div className="mt-24 lg:mt-32">
          <TopicRows topics={food} />
          <div className="mt-10 md:mt-12">
            <PhotoRows rows={foodGallery} />
          </div>
        </div>
        <div className="mt-24 lg:mt-32">
          <TopicRows topics={stay} />
          <div className="mt-10 md:mt-12">
            <PhotoRows rows={stayGallery} />
          </div>
          <p className="m-0 mt-3 text-sm text-subtle">
            Photos © <a href="https://www.klapphagen.se/en/">Kläpphagen Koster</a>
          </p>
        </div>
        <h2 className="m-0 mt-24 mb-6 eyebrow lg:mt-32">On the islands</h2>
        <PhotoRows rows={gallery} />
        <div className="mt-24 lg:mt-32">
          <TopicRows topics={packing} />
        </div>
      </Container>
    </>
  )
}

export default JourneyZonePage
