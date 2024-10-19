import React from "react";
import SignupButton from "@/components/onchainKit/SignupButton";
import Image from "next/image";

const CTA = () => {
	return (
		<section className='w-[70%] my-12 mx-auto flex justify-between bg-blue-950 p-12 rounded-[1rem] overflow-hidden relative'>
			<Image
				width={300}
				height={300}
				src='/images/dashboard/net-shape.svg'
				alt='icon'
				className='absolute bottom-[50%] right-0 opacity-20 '
			/>
			<div className=''>
				<div className='flex items-center gap-2'>
					<Image
						src='/logo.svg'
						width={32}
						height={32}
						alt=''
					/>
					<p className='font-semibold font-manrope text-[1rem]'>
						FutureProof
					</p>
				</div>
				<h2 className='text-[2.4rem] font-manrope font-semibold mt-[2rem] mb-[1.5rem]'>
					Start Saving and earning <br />
					with Futureproof!
				</h2>

				<SignupButton />
				<p className='text-s mt-[5rem]'>copyright © 2024. Futureproof </p>
			</div>
			<footer className='flex items-center gap-5'>
				<a
					href=''
					className='p-2 flex justify-center items-center w-[40px] h-[40px] rounded-full border border-[#fff]'>
					<Image
						src='/icons/x-icon.svg'
						width={35}
						height={35}
						alt='twitter'
						className=' object-contain '
					/>
				</a>
				<a
					href=''
					className='p-2 flex justify-center items-center w-[40px] h-[40px] rounded-full border border-[#fff]'>
					<Image
						src='/icons/instagram.svg'
						width={35}
						height={35}
						alt='twitter'
						className=' object-contain '
					/>
				</a>
				<a
					href=''
					className='p-2 flex justify-center items-center w-[40px] h-[40px] rounded-full border border-[#fff]'>
					<Image
						src='/icons/facebook.svg'
						width={35}
						height={35}
						alt='twitter'
						className=' object-contain '
					/>
				</a>
			</footer>
		</section>
	);
};

export default CTA;
