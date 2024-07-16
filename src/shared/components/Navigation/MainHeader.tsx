import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import LogoBanner from "../UIElements/LogoBanner";
import DropdownMenu from "../UIElements/DropdownMenu";
import { ReactSVG } from "react-svg";

interface Props {}

const MainHeader = (props: Props) => {
  return (
    <>
      <div className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <LogoBanner />

          <nav className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <NavLinks />
          </nav>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <DropdownMenu />

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <ReactSVG src="/public/hamburger.svg" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;