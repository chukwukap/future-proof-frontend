import React from "react";
import Image from "next/image";

function MarketingHero() {
	return (
		<section className='relative min-h-screen flex items-center justify-center overflow-hidden hero__bg'>
			<div className='relative md:static bottom-[3rem]'>
				<h1 className=' text-[2rem] md:text-[5rem] text-white font-manrope text-center  font-semibold md:leading-[6rem]'>
					<Image
						width={60}
						height={60}
						src='/images/dashboard/forward-icon.svg'
						alt='icon'
						className='inline-block md:w-[60px] md:h-[60px] w-[1.4rem]'
					/>
					Futureproof your savings&nbsp;
					<br className='md:block hidden' />
					and grow <br className='md:hidden block' />{" "}
					<Image
						width={60}
						height={60}
						src='/images/dashboard/slant-rect.svg'
						alt='icon'
						className='inline-block md:w-[60px] md:h-[60px] w-[1.4rem]'
					/>
					&nbsp;your money
				</h1>
				<p className='text-center mt-4 md:mt-8 text-white md:text-[.9rem] text-[.7rem] w-[90%] mx-auto'>
					Save, invest, earn interest, and grow your wealth with
					Nigeria&apos;s first blockchain-powered savings and investment
					platform. <br className='md:block hidden' /> Securely store,
					multiply, and manage your finances through innovative digital
					banking solutions.
				</p>
				<button className='shadow-xl mt-[3rem] bg-slate-200 px-16 py-3 text-sm rounded-[1.5rem] text-slate-500 text-center mx-auto block'>
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
