"use client";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
// import TestimonialCardShape from "./TestimonialCardShape";

const testimonials = [
  {
    text: "FutureProof has completely transformed the way I save and invest. The multi-currency options and competitive interest rates have helped me grow my savings faster than I ever thought possible.",
    author: "Chidi Anagonye",
    role: "Software Engineer",
  },
  {
    text: "As a small business owner, FutureProof has been a game-changer. The ability to save in both Naira and cryptocurrencies has protected my earnings from inflation and currency fluctuations.",
    author: "Amina Zubair",
    role: "Entrepreneur",
  },
  {
    text: "The goal-based savings feature in FutureProof has helped me stay disciplined with my finances. I've already achieved two major savings goals this year!",
    author: "Oluwaseun Adeleke",
    role: "Marketing Manager",
  },
  {
    text: "I was skeptical about crypto, but FutureProof made it easy and secure. The educational resources they provide helped me understand the benefits of diversifying my savings.",
    author: "Ngozi Okafor",
    role: "Teacher",
  },
  {
    text: "The transparency and security of blockchain technology in FutureProof give me peace of mind. I can track my savings growth in real-time and know my funds are safe.",
    author: "Emmanuel Nwosu",
    role: "Financial Analyst",
  },
  {
    text: "As a freelancer with irregular income, FutureProof's flexible savings options have been invaluable. I can easily adjust my savings strategy based on my cash flow.",
    author: "Yewande Adeyemi",
    role: "Graphic Designer",
  },
  {
    text: "The customer support at FutureProof is exceptional. They've been incredibly helpful in answering my questions and guiding me through the platform.",
    author: "Taiwo Ogunleye",
    role: "Student",
  },
];

const TestimonialCard = ({
  text,
  author,
  role,
}: {
  text: string;
  author: string;
  role: string;
}) => (
  <div className="relative w-full max-w-4xl h-auto md:h-[231px]">
    <TestimonialCardShape className="absolute inset-0 text-white" />
    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 py-8 md:py-0">
      <p className="text-sm md:text-lg mb-4 text-white">{text}</p>
      <div>
        <p className="font-bold text-white">{author}</p>
        <p className="text-xs md:text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      {/* Starry background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/stars.png')] opacity-50"></div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 relative z-10">
        Testimonials
      </h2>

      <div className="relative w-full max-w-4xl">
        <TestimonialCard {...testimonials[currentIndex]} />

        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 md:-translate-x-12 bg-black bg-opacity-50 rounded-full p-1 md:p-2 text-white"
        >
          <ChevronLeftIcon className="h-4 w-4 md:h-6 md:w-6" />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 md:translate-x-12 bg-black bg-opacity-50 rounded-full p-1 md:p-2 text-white"
        >
          <ChevronRightIcon className="h-4 w-4 md:h-6 md:w-6" />
        </button>
      </div>
    </div>
  );
}

const TestimonialCardShape: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 840 231"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_b_14_10)">
      <path
        d="M0 20.9558C0 9.1752 10.2137 -0.0435617 21.9457 1.02587C329.127 29.0274 510.817 30.1645 817.977 1.1134C829.736 0.00126278 840 9.22951 840 21.0407V210.34C840 222.013 829.961 231.197 818.323 230.292C511.722 206.446 329.999 206.287 21.6805 230.289C10.0418 231.195 0 222.012 0 210.338V20.9558Z"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M0.5 20.9558C0.5 9.47283 10.4576 0.480744 21.9003 1.52381C329.11 29.5279 510.832 30.6654 818.025 1.61118C829.494 0.526443 839.5 9.52797 839.5 21.0407V210.34C839.5 221.718 829.713 230.676 818.362 229.793C511.735 205.945 329.986 205.786 21.6417 229.791C10.2899 230.675 0.5 221.717 0.5 210.338V20.9558Z"
        stroke="currentColor"
        strokeOpacity="0.1"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_14_10"
        x="-20"
        y="-19.0586"
        width="880"
        height="269.412"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_14_10"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_14_10"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
