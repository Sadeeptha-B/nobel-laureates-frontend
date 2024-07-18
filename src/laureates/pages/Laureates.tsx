import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Laureate, LaureateItemDetails } from "../../models/Laureate";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LaureateList from "../components/LaureateList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const DUMMY_DATA: LaureateItemDetails[] = [
  {
    id: "1",
    knownName: "Wilhelm Conrad Röntgen",
    prizes: [
      {
        awardYear: "1901",
        category: "Physics",
        categoryFullName: "The Nobel Prize in Physics",
      },
    ],
  },
];

const Laureates = () => {
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [items, setItems] = useState<LaureateItemDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [page, setPage] = useState(0);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const data = await sendRequest(
  //         "https://api.nobelprize.org/2.0/laureates"
  //       );
  //       console.log(data);
  //     } catch (err) {}
  //   };
  //   fetchUsers();
  // }, [sendRequest]);

  const loader = (
    <div className="flex justify-center items-center">
      <LoadingSpinner asOverlay />
    </div>
  );

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.nobelprize.org/2.0/laureates?offset=${page}`
      );
      let data = await response.json();

      data = data.laureates
        .filter((item: any) => item.knownName.en != undefined)
        .map((item: any) => {
          return {
            id: item.id,
            knownName: item.knownName.en,
            prizes: item.nobelPrizes.map((p: any) => ({
              awardYear: p.awardYear,
              category: p.category.en,
              categoryFullName: p.categoryFullName.en,
            })),
          } as LaureateItemDetails;
        });

      console.log(data);

      setItems((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 25);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <form className="max-w-sm ml-auto first-letter:mr-0 m-5">
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="FilterBy">Filter By</option>
          <option value="US">Gender</option>
          <option value="CA">Birth Year</option>
          <option value="FR">Death Year</option>
          <option value="DE">Nobel Prize Category</option>
        </select>
      </form>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={true}
        loader={loader}
        endMessage={<p>No more data</p>}
      >
        <LaureateList items={items} />
      </InfiniteScroll>
    </>
  );
};

export default Laureates;
