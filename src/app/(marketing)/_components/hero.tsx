import React from "react";
import Image from "next/image";
import Link from "next/link";

function MarketingHero() {
	return (
		<section className='relative min-h-screen flex items-center justify-center overflow-hidden hero__bg'>
			<div>
				<h1 className='text-[5rem] text-white font-manrope text-center  font-semibold leading-[6rem]'>
					<Image
						width={60}
						height={60}
						src='/images/dashboard/forward-icon.svg'
						alt='icon'
						className='inline-block'
					/>
					Futureproof your savings
					<br />
					and grow{" "}
					<Image
						width={60}
						height={60}
						src='/images/dashboard/slant-rect.svg'
						alt='icon'
						className='inline-block'
					/>
					your money
				</h1>
				<p className='text-center mt-8'>
					Save, invest, earn interest, and grow your wealth with
					Nigeria&apos;s first blockchain-powered savings and investment
					platform. <br /> Securely store, multiply, and manage your
					finances through innovative digital banking solutions.
				</p>
				<button className='mt-[3rem] bg-slate-300 px-12 py-3 text-sm rounded-[1.5rem] text-black text-center mx-auto block'>
					Get started
				</button>
			</div>
			<Image
				width={400}
				height={400}
				src='/images/dashboard/net-shape.svg'
				alt='icon'
				className='absolute -bottom-20 -right-20 opacity-30 '
			/>
		</section>
	);
}

export default MarketingHero;
