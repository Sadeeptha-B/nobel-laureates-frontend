import { Link } from "react-router-dom";
import { LaureateItemDetails } from "../../models/Laureate";

const LaureateItem = ({ id, knownName, prizes }:LaureateItemDetails) => {
  return (
    <li>
      <div>
        <Link to={`/laureates/${id}`}>
            <h2>{knownName}</h2>
            {prizes.map((prize) => (
            <div>
                <h3>{prize.awardYear}</h3>
                <h3>{prize.category}</h3>
                <h3>{prize.categoryFullName}</h3>
            </div>
            ))}
        </Link>
      </div>
    </li>
  );
};

export default LaureateItem;
