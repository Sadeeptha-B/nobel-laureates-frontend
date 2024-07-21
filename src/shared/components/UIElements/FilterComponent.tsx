type Props = {
  category: string;
  options: [string, string][];
};

const FilterComponent = ({options, category}: Props) => {
  return (
    <form className="max-w-sm first-letter:mr-0 m-3">
      <select
        id="filter"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="FilterBy">{category}</option>
        {options.map(([value, display], i) => (
          <option key={i} value={value}>
            {display}
          </option>
        ))}
      </select>
    </form>
  );
};

export default FilterComponent;
