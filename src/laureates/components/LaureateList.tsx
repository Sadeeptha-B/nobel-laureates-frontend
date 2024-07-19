import { LaureateItemDetails } from "../../models/Laureate";
import LaureateItem from "./LaureateItem";

const LaureateList = ({ items }: { items: LaureateItemDetails[] }) => {
  if (items.length === 0) {
    return (
      <div className="m-10 flex items-center justify-center">
        <h2>No Laureates found</h2>
      </div>
    );
  }

  return (
    <ul className="my-0 mx-auto p-0 flex justify-center items-center flex-col first-line:flex-wrap">
      {items.map((item, index) => (
        <LaureateItem
          key={index}
          id={item.id}
          knownName={item.knownName}
          prizes={item.prizes}
        />
      ))}
    </ul>
  );
};

export default LaureateList;
