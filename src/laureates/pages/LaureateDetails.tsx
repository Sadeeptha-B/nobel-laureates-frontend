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
    <>
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

      {/* Comment */}
      <h3 className="text-xl dark:text-white ml-5">Comments</h3>
      <div className="m-10">
        <div className="flex items-start gap-2.5 shadow-md rounded-lg">
          <img
            className="w-8 h-8 rounded-full"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="Jese image"
          />
          <div className="flex flex-col w-full  leading-1.5">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                11:46
              </span>
            </div>
            <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">
              {" "}
              That's awesome. I think our users will really appreciate the
              improvements.
            </p>
          </div>
        </div>
      </div>

      {/* Comment Box */}
      {/* <form>
        <div className="w-full max-w-md	 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="4"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
          </div>
        </div>
      </form> */}
    </>
  );
};

export default LaureateDetails;
