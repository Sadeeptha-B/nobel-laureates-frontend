import { useEffect, useState } from "react";

type Props = {
  // The [string, string] values represent a key value arrangement
  // with the value being what's displayed to the user
  category: [string, string];
  options: [string, string][];
  onChange: any;
  nested?: boolean;
};

const Select = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState("all");
  const [categoryKey, categoryValue] = props.category;

  useEffect(() => {
    props.onChange(categoryKey, selectedValue);
  }, [selectedValue]);

  return (
    // Styling for nesting assumes that the other element would be on the right
    // This can be improved by specifying a nested direction. This is not done for simplicity.
    <div
      className={`max-w-sm first-letter:mr-0 ${
        props.nested ? "my-3 ml-3" : "m-3"
      }`}
    >
      <select
        id="filter"
        className={`bg-gray-50 border  border-gray-300 text-gray-900 text-sm ${
          !props.nested ? "rounded-lg" : "rounded-lg rounded-r-none"
        } focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
        }}
      >
        <option value="all">{categoryValue}</option>
        {props.options.map(([value, display], i) => (
          <option key={i} value={value}>
            {display}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
