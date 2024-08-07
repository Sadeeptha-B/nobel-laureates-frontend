import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useContext, useEffect, useState } from "react";
import { getAuthenticatedUserDetails } from "../../api/auth-api";
import { UserDetails } from "../../../models/UserData";

const UserDropdownMenu = () => {
  const auth = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState<UserDetails>();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getAuthenticatedUserDetails();
        setUserDetails(data as UserDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, [auth]);

  return (
    <>
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open user menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-black bg-white dark:text-white dark:bg-transparent"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>
      {/* <!-- Dropdown menu --> */}

      <div
        className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        id="user-dropdown"
      >
        {userDetails && auth.isLoggedIn && (
          <>
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {userDetails.name}
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                {userDetails.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="/auth"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={auth.logout}
                >
                  Log out
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default UserDropdownMenu;
