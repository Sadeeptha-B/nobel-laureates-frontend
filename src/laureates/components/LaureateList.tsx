import { LaureateItemDetails } from "../../models/Laureate";
import LaureateItem from "./LaureateItem";

const LaureateList = ({ items }: { items: LaureateItemDetails[] }) => {
  return (
    <ul className="my-0 mx-auto p-0 flex justify-center first-line:flex-wrap">
      {items.map((item) => (
        <LaureateItem
          key={item.id}
          id={item.id}
          knownName={item.knownName}
          prizes={item.prizes}
        />
      ))}
    </ul>
  );
};

export default LaureateList;
