"use client";
import React, { useRef } from "react";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  id: string;
  src: string;
}

const Feature: React.FC<FeatureCardProps> = (props) => (
  <div
    id={props.id}
    className={`  bg-opacity-90 rounded-lg p-10 shadow-lg bg-[#263141]`}
  >
    <Image src={props.src} width={90} height={90} alt="icon" className="mb-6" />
    <h3 className="text-xl font-bold mb-4 font-manrope text-gray-300">
      {props.title}
    </h3>
    <p className="text-gray-500 ">{props.description}</p>
  </div>
);

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative p-4 pt-[4rem] bg-gray-900">
      <h1 className="text-[3rem] font-semibold text-center font-manrope flex items-start justify-center text-slate-300 ">
        <Image
          src="/images/dashboard/competitive-shape.svg"
          width={50}
          height={50}
          alt="icon"
          className="mb-6 inline-block rotating-element"
        />
        ur Features{" "}
      </h1>
      <div className="grid grid-cols-3 gap-[2rem] mt-12 justify-center items-center w-[80%] mx-auto">
        <Feature
          id="feature2"
          src="/images/dashboard/goal-shape.svg"
          title="Goal-Based Savings"
          description="Set financial goals, automate savings, and track progress effortlessly."
        />
        <Feature
          id="feature1"
          src="/images/dashboard/multiple-shape.svg"
          title="Multi-Currency Savings"
          description="Save in Naira and popular cryptocurrencies like USDC, EURC, and Bitcoin."
        />
        <Feature
          id="feature4"
          src="/images/dashboard/blockchain-shape.svg"
          title="Blockchain-Powered Security"
          description="Secure funds with blockchain, ensuring transparency and protection against fraud."
        />
      </div>
    </div>
  );
}
