import { ChangeEvent, useCallback, useState } from "react";
import Select from "./Select";

type Props = {
  category: [string, string];
  options: [string, string][];
  onChange: any;
};

// Timer to implement debouncing for search
let timer: NodeJS.Timeout | null = null;

const FilteredSearch = (props: Props) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterChangeHandler = useCallback((_: string, value: string) => {
    console.log(value);
    setSelectedFilter(value);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // If there is an existing change in progress, clear it.
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      props.onChange(selectedFilter, e.target.value);
    }, 1000);
  };

  return (
    <div className="flex">
      <label
        htmlFor="search-dropdown"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      ></label>
      <Select
        category={props.category}
        options={props.options}
        onChange={filterChangeHandler}
        nested={true}
      />
      <div className="relative w-full my-3">
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search"
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default FilteredSearch;
