import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

function NavBar() {
	return (
		<nav className='  h-[10vh]  px-8 bg-app-secondary border-b border-b-app-borderColor'>
			<div className='w-[90%] mx-auto flex justify-between items-center h-full relative'>
				<div className='flex items-center gap-3'>
					<Image
						src='/logo.svg'
						alt='logo'
						width={30}
						height={30}
						className=''
					/>
					<p className='text-white text-sm font-semibold'>FutureProof</p>
				</div>
				<div className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 flex justify-center items-center'>
					<Link
						className='text-sm'
						href='/dashboard'>
						Overview
					</Link>
					<Link
						className='text-sm'
						href='/dashboard/save'>
						Save
					</Link>
					<Link
						className='text-sm'
						href='/dashboard/payment'>
						Contact
					</Link>
				</div>
				<Button
					className='text-sm bg-white text-app-borderColor'
					variant='ghost'>
					Connect Wallet
				</Button>
			</div>
		</nav>
	);
}
export default NavBar;
