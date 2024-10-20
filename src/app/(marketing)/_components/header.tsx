"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LoginButton from "@/components/onchainKit/LoginButton";
import { ChevronRight } from "lucide-react";

const MainHeader: React.FC = () => {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
			className={`fixed px-4 md:px-8  top-0 left-0 right-0 z-50 transition-all  border-b-[#dcdcdc3d] duration-300 flex items-center justify-between h-[10vh] ${
				isScrolled ? " backdrop-blur-md border-b" : "bg-transparent"
			}`}>
			<div className='flex items-center gap-1 md:gap-2'>
				<Image
					src='/logo.svg'
					width={38}
					height={38}
					alt=''
					className='md:w-[38px] md:h-[38px] w-6'
				/>
				<p>FutureProof</p>
			</div>
			<div className=' justify-center items-center gap-12 md:flex hidden'>
				<a
					className='text-sm'
					href='#'>
					Home
				</a>
				<a
					className='text-sm'
					href='#'>
					Features
				</a>
				<a
					className='text-sm'
					href='#'>
					Team
				</a>
			</div>
			<button className='flex justify-center items-center border rounded-[1.6rem] md:text-[.8rem] text-[.7rem] gap-3 pl-3 md:pl-5  border-[#e9e9e96f] backdrop-blur-md '>
				Get started
				<ChevronRight
					color='#c4c4c4f7'
					className='border border-[#e9e9e95e] rounded-full w-6 h-6 md:h-9 md:w-9  md:p-1 bg-[#c4c4c41d]'
				/>
			</button>
		</nav>
	);
};

export default MainHeader;
