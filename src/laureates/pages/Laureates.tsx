import { LaureateItemDetails } from "../../models/Laureate";
import LaureateList from "../components/LaureateList";

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

      <LaureateList items={DUMMY_DATA} />
    </>
  );
};

export default Laureates;
