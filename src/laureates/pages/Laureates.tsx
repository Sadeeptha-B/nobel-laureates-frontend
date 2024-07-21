import { useCallback, useEffect, useRef, useState } from "react";

import { Laureate, LaureateItemDetails } from "../../models/Laureate";
import LaureateList from "../components/LaureateList";
import FilteredSearch from "../../shared/components/UIElements/FilteredSearch";
import Select from "../../shared/components/UIElements/Select";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  GENDERS,
  LAUREATES_FETCH_OFFSET,
  NOBEL_PRIZE_CATEGORIES,
  getLaureates,
} from "../../shared/api/nobel-api";

// Currently supported filters
const initialFilterState: FilterState = {
  gender: "all",
  nobelPrizeCategory: "all",
  year: {},
};

const Laureates = () => {
  const [offset, setOffset] = useState(0);
  const [filterState, setFilterState] = useState(initialFilterState);
  const [items, setItems] = useState<LaureateItemDetails[]>([]);
  const [itemsLeft, setItemsLeft] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Using Intersection Observer API to implement data fetch on reaching end of page
  const setObserver = (node: HTMLDivElement) => {
    // Data fetch already in progress
    if (isLoading) return;

    // Remove previous observer
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && itemsLeft) {
        setOffset((prev) => prev + LAUREATES_FETCH_OFFSET);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  };

  // Reset offset and items when filter changes
  useEffect(() => {
    setOffset(0);
    setItems([]);
  }, [filterState]);

  // When offset changes, trigger new api request
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getLaureates(
          offset,
          FilterState.convertToObj(filterState)
        );

        const items = data.laureates
          .filter((l: any) => l.knownName != undefined) // filter organizations
          .map((l: any) => Laureate.fromJson(l).toLaureateItemDetails());

        setItemsLeft(items.length > 0);
        setItems((prev) => [...prev, ...items]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [offset, filterState]);

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
      <LaureateList items={items} />

      {isLoading && (
        <div className="m-10 flex items-center justify-center">
          <LoadingSpinner asOverlay />
        </div>
      )}
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
class FilterState {
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
