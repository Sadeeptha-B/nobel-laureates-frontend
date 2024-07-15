import { LaureateItemDetails } from "../../models/Laureate";
import LaureateItem from "./LaureateItem";

const LaureateList = ({ items }: { items: LaureateItemDetails[] }) => {
  return (
    <ul>
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
