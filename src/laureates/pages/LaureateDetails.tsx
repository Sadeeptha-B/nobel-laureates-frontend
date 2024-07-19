import { useParams } from "react-router-dom";
import { Laureate } from "../../models/Laureate";
import Card from "../../shared/components/UIElements/Card";

const DUMMY_DATA: Laureate[] = [
  {
    id: "745",
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
    return (
      <Card isFixedSize={true}>
        <h2>Couldn't find Laureate</h2>
      </Card>
    );
  }

  const { knownName, birth, death, wikipedia, wikidata, nobelPrizes } =
    laureateData;
  const dateData: [string, { date: string; location: string }][] = [
    ["Birth", birth],
    ["Death", death],
  ];

  const links: [string, string][] = [
    ["Wikipedia", wikipedia],
    ["Wikidata", wikidata],
  ];

  const prizeDetails = nobelPrizes.map((p) => [
    ["Award Year", p.awardYear],
    ["Category", p.category],
    ["Prize Amount", p.prizeAmount],
    ["Prize Status", p.prizeStatus],
    ["Date Awarded", p.dateAwarded.toDateString()],
  ]);

  return (
    <>
      <div className="md:grid md:grid-cols-2 ">
        <Card isFixedSize={false}>
          <section>
            <h1 className="font-semibold text-xl dark:text-white ml-5">
              {knownName}
            </h1>
            <hr className="h-px mt-8 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />
            {dateData.map((d) => (
              <>
                <h2 className="text-xl dark:text-white ml-5">{d[0]}</h2>
                <div className="m-5">
                  <p>
                    <span className="font-semibold">Date:</span> {d[1].date}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {d[1].location}
                  </p>
                </div>
              </>
            ))}
          </section>
        </Card>
        <Card isFixedSize={false}>
          <aside>
            <h2 className="text-xl dark:text-white ml-5">Links</h2>
            {links.map((l) => (
              <div className="mt-4">
                <h2 className="text-lg dark:text-white ml-5">{l[0]}</h2>
                <p className="ml-5 font-medium text-blue-600 dark:text-blue-500 hover:underline break-words">
                  {l[1]}
                </p>
              </div>
            ))}
          </aside>
        </Card>

        <section className="col-span-2">
          <h3 className="m-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
            {" "}
            Nobel Prizes won{" "}
          </h3>
          {nobelPrizes.map((prize, index) => (
            <Card isFixedSize={false}>
              <h1 className="font-semibold text-xl dark:text-white ml-5">
                {prize.categoryFullName}
              </h1>
              <hr className="h-px mt-8 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />
              <h2 className="text-xl dark:text-white ml-5">Prize Details</h2>
              <div className="m-5">
                {prizeDetails[index].map((p) => (
                  <p>
                    <span className="font-semibold">{p[0]}:</span> {p[1]}
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <h2 className="text-xl dark:text-white ml-5">Motivation</h2>
                <p className="m-5 first-letter:uppercase">{prize.motivation}</p>
              </div>
            </Card>
          ))}
        </section>
      </div>

      {/* Comment */}
      <h3 className="m-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
        Comments
      </h3>
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
