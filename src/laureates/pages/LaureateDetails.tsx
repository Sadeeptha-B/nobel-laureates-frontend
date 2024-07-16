import { useParams } from "react-router-dom";
import { Laureate } from "../../models/Laureate";
import Card from "../../shared/components/UIElements/Card";

const DUMMY_DATA: Laureate[] = [
  {
    id: "1",
    knownName: "Wilhelm Conrad Röntgen",
    // fullName: "Wilhelm Conrad Röntgen",
    gender: "male",
    birth: {
      date: "1845-03-27",
      location: "Lennep, Prussia (now Remscheid, Germany)",
    },
    death: {
      date: "1923-02-10",
      location: "Munich, Germany",
    },
    wikipedia: "https://en.wikipedia.org/wiki/Wilhelm_Röntgen",
    wikidata: "https://www.wikidata.org/wiki/Q3097",
    nobelPrizes: [
      {
        awardYear: "1901",
        category: "Physics",
        categoryFullName: "The Nobel Prize in Physics",
        motivation:
          "in recognition of the extraordinary services he has rendered by the discovery of the remarkable rays subsequently named after him",
        dateAwarded: new Date("1901-11-12"),
        prizeStatus: "received",
        prizeAmount: 150782,
        affiliations: [
          {
            name: "Munich University",
            location: "Munich, Germany",
          },
        ],
      },
    ],
  },
];

const LaureateDetails = () => {
  const laureateId = useParams().laureateId;
  const laureateData = DUMMY_DATA.find(
    (laureate) => laureate.id === laureateId
  );

  if (!laureateData) {
    return <h2>Couldn't find Laureate</h2>;
  }

  const { knownName, birth, death, wikipedia, wikidata, nobelPrizes } =
    laureateData;
  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <h1>{knownName}</h1>
        <aside>
          <h2>Links</h2>
          <h2>{wikipedia}</h2>
          <h2>{wikidata}</h2>
        </aside>

      <section>
        <h3>{birth.date}</h3>
        <h3>{birth.location}</h3>
        <h3>{death.date}</h3>
        <h3>{death.location}</h3>
      </section>
      <section>
        {nobelPrizes.map((prize) => (
          <>
            <h3>{prize.awardYear}</h3>
            <h3>{prize.category}</h3>
            <h3>{prize.categoryFullName}</h3>
            <h3>{prize.motivation}</h3>
            <h3>{prize.prizeAmount}</h3>
            <h3>{prize.prizeStatus}</h3>
            <h3>{prize.dateAwarded.toDateString()}</h3>
          </>
        ))}
      </section>
    </div>
  );
};

export default LaureateDetails;
