import { NavLink } from "react-router-dom";

type Props = {};

const NavLinks = (props: Props) => {
  const routes = [
    ["/", "All Laureates"],
    ["/about", "About"],
  ];

  return (
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {routes.map((route, index) => (
        <li key={index}>
          <NavLink
            to={route[0]}
            end
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            }
          >
            {route[1]}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
