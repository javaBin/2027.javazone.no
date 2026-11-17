import { Assets } from '@/Assets'
import type { Topic } from '@/components'
import { Container, PageHeader, PhotoRows, TopicRows } from '@/components'
import pageMeta from '@/data/pageMeta.json'
import { useOpenGraph } from '@/hooks/useOpenGraph'

const aboutTrip: Topic[] = [
  {
    title: 'When',
    body: <p>Thursday evening 16 to Sunday 19 September 2027, right after the conference. We are back in Oslo on Sunday evening.</p>,
  },
  {
    title: 'Who can join',
    body: (
      <p>
        All speakers of JavaZone are invited to apply, but the number of spots is limited. Speakers of full presentations and workshops get priority;
        lightning talk speakers are welcome to apply. You need to be comfortable on a boat for a full day, in and on the water, and outdoors in
        September weather. No extraordinary physical ability is required, but parts of the trip are fast and bumpy. If you have a bad back, this is
        not the year for you. Let us know about any health conditions or allergies when you sign up.
      </p>
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
          You will sail, not just sit on board. No previous sailing experience is needed, only the willingness to take part and learn. The detailed
          program is a surprise and will depend on wind and weather.
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
