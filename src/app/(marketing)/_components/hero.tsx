import React from "react";
import Image from "next/image";
import Link from "next/link";

function MarketingHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/bgs/future-proof-hero-bg.png"
          alt="Hero background"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          quality={90}
        />
      </div>

      {/* Blurred Gradient Overlays */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Left blue circle */}
        <div className="absolute -left-1/4 top-1/2 w-1/2 aspect-square rounded-full bg-[#0330CF] opacity-50 blur-[100px] sm:blur-[150px] md:blur-[100px] lg:blur-[250px]"></div>

        {/* Top-right blue circle */}
        <div className="absolute -right-1/4 -top-1/4 w-1/2 aspect-square rounded-full bg-[#0330CF] opacity-50 blur-[100px] sm:blur-[150px] md:blur-[100px]"></div>

        {/* Center gradient shape */}
        <div className="absolute -left-1/4 -top-3/4 w-3/2 aspect-[0.85] bg-gradient-to-br from-[#0330CF] to-[#000824] opacity-80 blur-[100px] sm:blur-[150px] md:blur-[100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Futureproof Your Savings with
          <br className="hidden sm:inline" />
          <span className="block sm:inline">Blockchain-Powered Security</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
          Save, earn interest, and grow your money with Nigeria&apos;s first
          blockchain-powered savings platform.
        </p>
        <Link
          href="/get-started"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base sm:text-lg font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors duration-300"
        >
          Get Started
          <svg
            className="ml-2 -mr-1 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Dashboard Preview */}
      <div className="absolute -bottom-60 sm:-bottom-60 md:-bottom-60 lg:-bottom-72 left-1/2 transform -translate-x-1/2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <Image
          src="/images/marketing/hero-dashboard.png"
          alt="Dashboard preview"
          width={1024}
          height={576}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

export default MarketingHero;
