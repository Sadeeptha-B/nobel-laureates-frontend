import { useCallback, useEffect, useRef, useState } from "react";

import { Laureate, LaureateItemDetails } from "../../models/Laureate";
import LaureateList from "../components/LaureateList";
import SearchComponent from "../../shared/components/UIElements/SearchComponent";
import { getLaureates } from "../../shared/api/nobel-api";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import SelectComponent from "../../shared/components/UIElements/SelectComponent";
import {
  GENDERS,
  LAUREATES_FETCH_OFFSET,
  NOBEL_PRIZE_CATEGORIES,
} from "../../constants";

// Currently supported filters
const initialFilterState = {
  gender: "all",
  nobelPrizeCategories: "all",
  birthDate: "all",
  deathDate: "all",
};

const Laureates = () => {
  const [offset, setOffset] = useState(0);
  const [filterState, setFilterState] = useState(initialFilterState);
  const [items, setItems] = useState<LaureateItemDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Using Intersection Observer API to implement data fetch on reaching end of page
  const setObserver = (node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setOffset((prev) => prev + LAUREATES_FETCH_OFFSET);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  };

  // Reset offset and items when 
  useEffect(() => {
    setOffset(0)
    setItems([]);
  }, [filterState]);

  // When filter state changes, trigger new api request
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getLaureates(offset, filterState);
        console.log(data);

        const items = data.laureates
          .filter((l: any) => l.knownName != undefined)
          .map((l: any) => Laureate.fromJson(l).toLaureateItemDetails());

        setItems((prev) => [...prev, ...items]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [offset, filterState]);

  const selectChangeHandler = useCallback((category: string, value: string) => {
    setFilterState((prev) => ({
      ...prev,
      [category]: value,
    }));
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <SelectComponent
          category={["nobelPrizeCategory", "Prize Categories"]}
          options={NOBEL_PRIZE_CATEGORIES}
          onChange={selectChangeHandler}
        />
        <SelectComponent
          category={["gender", "Gender"]}
          options={GENDERS}
          onChange={selectChangeHandler}
        />
        <SearchComponent options={["Birth Year", "Death Year"]} />
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
