import { useCallback, useRef, useState } from "react";

import { LaureateList, LaureateListHandle } from "../components/LaureateList";
import FilteredSearch from "../../shared/components/UIElements/FilteredSearch";
import Select from "../../shared/components/UIElements/Select";
import { GENDERS, NOBEL_PRIZE_CATEGORIES } from "../../shared/api/nobel-api";

// Currently supported filters
const initialFilterState: FilterState = {
  gender: "all",
  nobelPrizeCategory: "all",
  year: {},
};

const Laureates = () => {
  const [filterState, setFilterState] = useState(initialFilterState);
  const observer = useRef<IntersectionObserver | null>(null);
  const childRef = useRef<LaureateListHandle>(null);

  // Using Intersection Observer API to implement data fetch on reaching end of page
  const setObserver = (node: HTMLDivElement) => {
    // Remove previous observer
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && childRef.current) {
        childRef.current.updateOffset();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  };

  // Handle selection change
  const selectChangeHandler = useCallback((category: string, value: string) => {
    setFilterState((prev) => ({
      ...prev,
      [category]: value,
    }));
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <Select
          category={[FilterCategory.NOBEL_PRIZE_CATEGORY, "Prize Categories"]}
          options={NOBEL_PRIZE_CATEGORIES}
          onChange={selectChangeHandler}
        />
        <Select
          category={[FilterCategory.GENDER, "Gender"]}
          options={GENDERS}
          onChange={selectChangeHandler}
        />
        <FilteredSearch
          category={[FilterCategory.YEAR, "Year"]}
          options={[
            ["birthDate", "Birth Year"],
            ["deathDate", "Death Year"],
          ]}
          onChange={selectChangeHandler}
        />
      </div>
      <LaureateList ref={childRef} filterState={filterState} />
      <div ref={setObserver}></div>
    </>
  );
};

export default Laureates;

enum FilterCategory {
  GENDER = "gender",
  NOBEL_PRIZE_CATEGORY = "nobelPrizeCategory",
  YEAR = "year",
}

// State type definitions
export class FilterState {
  static convertToObj(state: FilterState) {
    return {
      gender: state.gender,
      nobelPrizeCategory: state.nobelPrizeCategory,
      ...state.year,
    };
  }

  static compareYearState(current: DateFilter, newVal: DateFilter) {
    return JSON.stringify(current) === JSON.stringify(newVal);
  }

  constructor(
    public gender: string,
    public nobelPrizeCategory: string,
    public year: DateFilter
  ) {}
}

// Only one of these filters can exist at a time
type DateFilter =
  | {
      birthYear: string;
    }
  | { deathYear: string }
  | {};
