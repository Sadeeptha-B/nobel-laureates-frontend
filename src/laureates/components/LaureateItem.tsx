import { LaureateItemDetails } from "../../models/Laureate";

const LaureateItem = ({ knownName, prizes }: LaureateItemDetails) => {
  return (
    <li>
      <div>
        <h2>{knownName}</h2>
        {prizes.map((prize) => (
          <div>
            <h3>{prize.awardYear}</h3>
            <h3>{prize.category}</h3>
            <h3>{prize.categoryFullName}</h3>
          </div>
        ))}
      </div>
    </li>
  );
};

export default LaureateItem;
