import React from "react";
import Link from "next/link";
import { XMarkIcon, LinkIcon, InboxIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="relative mt-16">
      <svg
        className="absolute top-0 w-full h-16 -mt-5 sm:-mt-10 sm:h-24 text-gray-900"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex flex-col items-center justify-between pt-5 pb-10 sm:flex-row">
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <Link
              href="https://twitter.com"
              className="text-gray-500 transition-colors duration-300 hover:text-gray-400"
            >
              <XMarkIcon className="w-6 h-6" />
            </Link>
            <Link
              href="https://instagram.com"
              className="text-gray-500 transition-colors duration-300 hover:text-gray-400"
            >
              <LinkIcon className="w-6 h-6" />
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-gray-500 transition-colors duration-300 hover:text-gray-400"
            >
              <InboxIcon className="w-6 h-6" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
