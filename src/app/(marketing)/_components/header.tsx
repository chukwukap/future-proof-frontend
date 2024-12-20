"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ChevronRight } from "lucide-react";
// import { ChevronRight } from "lucide-react";

const MainHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setShowAuthFlow, user, handleLogOut } = useDynamicContext();
  console.log(user);

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
        isScrolled ? " backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" width={38} height={38} alt="" />
        <p>FutureProof</p>
      </div>
      <div className="flex justify-center items-center gap-12">
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

      <button
        onClick={user ? handleLogOut : () => setShowAuthFlow(true)}
        className="flex justify-center items-center border rounded-[1.6rem] text-[.8rem] gap-3 pl-5 border-[#e9e9e96f] backdrop-blur-md"
      >
        Get started
        <ChevronRight
          color="#c4c4c4f7"
          className="border border-[#e9e9e95e] rounded-full h-9 w-9 p-1 bg-[#c4c4c41d]"
        />
      </button>
    </nav>
  );
};

export default MainHeader;
