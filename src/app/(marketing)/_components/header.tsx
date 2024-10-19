"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import SignUpButton from "@/components/onchainKit/SignupButton";

const MainHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed px-8  top-0 left-0 right-0 z-50 transition-all  border-b-[#dcdcdc3d] duration-300 flex items-center justify-between h-[10vh] ${
        isScrolled
          ? "bg-black bg-opacity-80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" width={38} height={38} alt="" />
        <p>FutureProof</p>
      </div>
      <div className="flex justify-center items-center gap-6">
        <a className="text-sm" href="#">
          Home
        </a>
        <a className="text-sm" href="#">
          Features
        </a>
        <a className="text-sm" href="#">
          Team
        </a>
      </div>
      <SignUpButton />
    </nav>
  );
};

export default MainHeader;
