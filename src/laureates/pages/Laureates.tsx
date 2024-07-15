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
  return <LaureateList items={DUMMY_DATA} />;
};

export default Laureates;
