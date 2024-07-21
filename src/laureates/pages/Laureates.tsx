import { useEffect, useRef, useState } from "react";

import { Laureate, LaureateItemDetails } from "../../models/Laureate";
import LaureateList from "../components/LaureateList";
import SearchComponent from "../../shared/components/UIElements/SearchComponent";
import { getLaureates } from "../../shared/api/nobel-api";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import FilterComponent from "../../shared/components/UIElements/FilterComponent";
import {
  GENDERS,
  LAUREATES_FETCH_OFFSET,
  NOBEL_PRIZE_CATEGORIES,
} from "../../constants";

const Laureates = () => {
  const [items, setItems] = useState<LaureateItemDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getLaureates(offset);

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
  }, [offset]);

  if (!items) {
    return (
      <div className="m-10 flex items-center justify-center">
        {!isLoading && (
          <>
            <Card isFixedSize={true}>
              <h2>Couldn't retrieve Laureates</h2>
            </Card>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <FilterComponent category="Prize Categories" options={NOBEL_PRIZE_CATEGORIES} />
        <FilterComponent category="Gender" options={GENDERS} />
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
