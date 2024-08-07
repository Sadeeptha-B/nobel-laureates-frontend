import { Link } from "react-router-dom";
import { LaureateItemDetails } from "../../models/Laureate";
import Card from "../../shared/components/UIElements/Card";

const LaureateItem = ({
  id,
  knownName,
  prizes,
  birthYear,
  deathYear,
}: LaureateItemDetails) => {
  return (
    <li key={id}>
      <Card isFixedSize={true}>
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {knownName}
        </h5>
        <div className="flex justify-between mt-3">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            Birth Year: {birthYear || "-"}
          </p>
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            Death Year: {deathYear || "-"}
          </p>
        </div>
        {prizes.map((prize, index) => (
          <div className="flex items-center m-6 gap-10" key={index}>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {prize.categoryFullName}
              </p>
              <p className="text-sm text-wrap text-gray-500 truncate dark:text-gray-400">
                {prize.category}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {prize.awardYear}
            </div>
          </div>
        ))}

        <Link
          to={`/laureates/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </Card>
    </li>
  );
};

export default LaureateItem;
