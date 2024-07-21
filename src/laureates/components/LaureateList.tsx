import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Laureate, LaureateItemDetails } from "../../models/Laureate";
import Card from "../../shared/components/UIElements/Card";
import LaureateItem from "./LaureateItem";
import { FilterState } from "../pages/Laureates";
import {
  LAUREATES_FETCH_OFFSET,
  getLaureates,
} from "../../shared/api/nobel-api";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

export type LaureateListHandle = {
  updateOffset: () => void;
};

type LaureateListProps = {
  filterState: FilterState;
};

export const LaureateList = forwardRef<LaureateListHandle, LaureateListProps>(
  ({ filterState }, ref) => {
    const [offset, setOffset] = useState(0);
    const [items, setItems] = useState<LaureateItemDetails[]>([]);
    const [itemsLeft, setItemsLeft] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useImperativeHandle(ref, () => ({
      updateOffset: () => {
        // Data fetch already in progress/ Items fully fetched
        if (isLoading || !itemsLeft) return;

        setOffset((prev) => prev + LAUREATES_FETCH_OFFSET);
      },
    }));

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

    if (items.length === 0) {
      return (
        <div className="m-10 flex items-center justify-center">
          {isLoading ? (
            <LoadingSpinner asOverlay />
          ) : (
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
      <div>
        <ul className="my-0 mx-auto p-0 flex justify-center items-center flex-col first-line:flex-wrap">
          {items.map((item, index) => (
            <LaureateItem
              key={index}
              id={item.id}
              knownName={item.knownName}
              prizes={item.prizes}
              birthYear={item.birthYear}
              deathYear={item.deathYear}
            />
          ))}
        </ul>
        {isLoading && (
          <div className="m-10 flex items-center justify-center">
            <LoadingSpinner asOverlay />
          </div>
        )}
      </div>
    );
  }
);
