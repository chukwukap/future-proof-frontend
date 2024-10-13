import React from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-8 w-8 text-gray-300" />
              <span className="text-sm font-medium text-gray-300">
                chukwuka.base.eth
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
