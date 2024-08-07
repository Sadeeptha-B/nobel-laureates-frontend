import { useParams } from "react-router-dom";
import { Laureate } from "../../models/Laureate";
import Card from "../../shared/components/UIElements/Card";
import { useEffect, useState } from "react";
import { getLaureateDataById } from "../../shared/api/nobel-api";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import CommentSection from "../components/CommentSection";

type DetailState = {
  laureateProfile: Laureate;
  dateData: [string, Laureate["birth"]][];
  links: [string, string][];
  prizeDetails: [string, string | number][][];
};

const prepareState = (laureateProfile: Laureate) => {
  const dateData = [["Birth", laureateProfile.birth]];

  if (laureateProfile.death.date) {
    dateData.push(["Death", laureateProfile.death]);
  }

  const laureateDetails: DetailState = {
    laureateProfile: laureateProfile,
    dateData: dateData as [string, Laureate["birth"]][],
    links: [
      ["Wikipedia", laureateProfile.wikipedia],
      ["Wikidata", laureateProfile.wikidata],
    ],
    prizeDetails: laureateProfile.nobelPrizes.map((p) => [
      ["Award Year", p.awardYear],
      ["Category", p.category],
      ["Prize Amount", p.prizeAmount],
      ["Prize Status", p.prizeStatus],
      ["Date Awarded", p.dateAwarded],
    ]),
  };

  return laureateDetails;
};

const LaureateDetails = () => {
  const laureateId = useParams().laureateId;
  const [isLoading, setIsLoading] = useState(true);
  const [laureateDetails, setLaureateDetails] = useState<DetailState>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!laureateId) {
        console.log("No laureate id");
        return;
      }
      try {
        const data = await getLaureateDataById(laureateId);
        const laureateProfile = Laureate.fromJson(data[0]);

        const laureateDetails: DetailState = prepareState(laureateProfile);
        setLaureateDetails(laureateDetails);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getLaureateDataById, laureateId]);

  if (!laureateDetails) {
    return (
      <div className="m-10 flex items-center justify-center">
        {isLoading ? (
          <LoadingSpinner asOverlay />
        ) : (
          <>
            <Card isFixedSize={true}>
              <h2>Couldn't retrieve Laureate Data</h2>
            </Card>
            <CommentSection laureateId={laureateId} />
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="md:grid md:grid-cols-2 ">
        <Card isFixedSize={false}>
          <section>
            <h1 className="font-semibold text-xl dark:text-white ml-5">
              {laureateDetails.laureateProfile.knownName}
            </h1>
            <p className="mx-5 mt-2">
              <span className="font-semibold">Gender :</span>{" "}
              <span className="inline-block first-letter:uppercase">
                {laureateDetails.laureateProfile.gender}
              </span>
            </p>
            <hr className="h-px mt-8 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />
            {laureateDetails.dateData.map((d, i) => (
              <div key={i}>
                <h2 className="text-xl dark:text-white ml-5">{d[0]}</h2>
                <div className="m-5">
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {d[1].date || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {d[1].location || "-"}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </Card>
        <Card isFixedSize={false}>
          <aside>
            <h2 className="text-xl dark:text-white ml-5">Links</h2>
            {laureateDetails.links.map((l, i) => (
              <div className="mt-4" key={i}>
                <h2 className="text-lg dark:text-white ml-5">{l[0]}</h2>
                <p className="ml-5 font-medium text-blue-600 dark:text-blue-500 break-words">
                  {l[1] || "-"}
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
          {laureateDetails.laureateProfile.nobelPrizes.map((prize, index) => (
            <div key={index}>
              <Card isFixedSize={false}>
                <h1 className="font-semibold text-xl dark:text-white ml-5">
                  {prize.categoryFullName}
                </h1>
                <hr className="h-px mt-8 mb-5 bg-gray-200 border-0 dark:bg-gray-700" />
                <h2 className="text-xl dark:text-white ml-5">Prize Details</h2>
                <div className="m-5">
                  {laureateDetails.prizeDetails[index].map((p, i) => (
                    <p key={i}>
                      <span className="font-semibold">{p[0]}:</span> {p[1]}
                    </p>
                  ))}
                </div>
                <div className="mt-6">
                  <h2 className="text-xl dark:text-white ml-5">Motivation</h2>
                  <p className="m-5 first-letter:uppercase">
                    {prize.motivation}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </section>
      </div>
      <CommentSection laureateId={laureateId} />
  
    </>
  );
};

export default LaureateDetails;
