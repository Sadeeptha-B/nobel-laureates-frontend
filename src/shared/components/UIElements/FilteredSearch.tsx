import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Select from "./Select";

type Props = {
  category: [string, string];
  options: [string, string][];
  onChange: any;
};

// Timer to implement debouncing for search
let timer: NodeJS.Timeout | null = null;

const FilteredSearch = (props: Props) => {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [categoryKey, _] = props.category;

  const filterChangeHandler = useCallback((_: string, value: string) => {
    setSelectedFilter(value);
  }, []);

  const queryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // If there is an existing change pending, clear it.
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      setQuery(e.target.value);
    }, 1000);
  };

  useEffect(() => {
    // Reset query if selected filter is set to all or if search is empty
    if (selectedFilter == "all" || query == "") {
      props.onChange(categoryKey, {});
      return;
    }
    props.onChange(categoryKey, { [selectedFilter]: query });
  }, [query, selectedFilter]);

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
        {/* Input validation is not done for simplicity */}
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search"
          onChange={queryChangeHandler}
          required
        />
      </div>
    </div>
  );
};

export default FilteredSearch;
