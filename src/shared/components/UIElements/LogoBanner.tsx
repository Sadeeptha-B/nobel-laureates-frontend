import React from "react";
import { Link } from "react-router-dom";

const LogoBanner = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      {/* Todo - Change icon */}
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8"
        alt="Flowbite Logo"
      />

      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Nobel Laureates
      </span>
    </Link>
  );
};

export default LogoBanner;
