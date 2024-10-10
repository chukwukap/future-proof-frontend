"use client";
import React, { useRef } from "react";
import Xarrow from "react-xarrows";

const Feature = ({
  title,
  description,
  className,
  id,
}: {
  title: string;
  description: string;
  className: string;
  id: string;
}) => (
  <div
    id={id}
    className={`absolute bg-white bg-opacity-90 rounded-lg p-6 shadow-lg md:w-[400px] w-[300px] ${className}`}
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#C8CFD1] flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-7xl aspect-[16/9]">
        <Feature
          id="feature1"
          title="Multi-Currency Savings"
          description="Save and manage your funds in both Naira and leading cryptocurrencies like USDC, EURC, and Bitcoin (cbBTC), giving you flexibility and protection against inflation."
          className="feature top-0 left-0 md:text-base text-sm"
        />
        <Feature
          id="feature2"
          title="Goal-Based Savings"
          description="Set personalized financial goals, automate your savings, and track your progress with ease. Futureproof helps you stay on top of your goals, whether it's for a new car, vacation, or emergency fund."
          className="feature top-0 right-0 md:text-base text-sm"
        />
        <Feature
          id="feature3"
          title="Earn Competitive Interest"
          description="Grow your savings with high interest rates through DeFi protocols. Watch your savings grow in real-time with transparent earnings breakdowns."
          className="feature bottom-0 left-0 md:text-base text-sm"
        />
        <Feature
          id="feature4"
          title="Blockchain-Powered Security"
          description="Your funds are secured using blockchain technology, offering transparency, fast transactions, and strong protection against fraud, so you can trust your savings are safe and easily accessible."
          className="feature bottom-0 right-0 md:text-base text-sm"
        />
        <div
          id="centerCircle"
          className="center-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
            <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
              <div className="text-xl md:text-2xl font-bold">Key Features</div>
            </div>
          </div>
        </div>

        {["feature1", "feature2", "feature3", "feature4"].map((id) => (
          <Xarrow
            key={id}
            start={id}
            end="centerCircle"
            color="rgba(255,255,255,0.6)"
            strokeWidth={2}
            path="smooth"
            curveness={0.3}
            startAnchor="middle"
            endAnchor="middle"
          />
        ))}
      </div>
    </div>
  );
}
