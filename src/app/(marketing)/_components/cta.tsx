import React from "react";
import Link from "next/link";

const CTA = () => {
  return (
    <section>
      <div className="bg-gray-900  text-white py-16 px-4 sm:px-6 lg:px-8 rounded-lg mx-auto max-w-3xl my-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Saving with Futureproof Today!
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of Nigerians securing their financial future with
            effortless savings and blockchain-powered security.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-gray-900 bg-white hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            Get Started
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
