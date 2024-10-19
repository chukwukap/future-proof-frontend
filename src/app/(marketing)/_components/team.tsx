import Image from "next/image";
import TopText from "./top-text";

interface TeamCardProps {
	src: string;
	name: string;
	role: string;
	twitter: string;
}

const TeamCard: React.FC<TeamCardProps> = (props) => {
	return (
		<div className='bg-[#263141] bg-opacity-90  p-10 shadow-lg h-[24rem] w-[21rem] rounded-[1rem] relative '>
			<Image
				fill
				src={props.src}
				alt='team member'
				className='mb-6 object-cover rounded-[1rem] brightness-90'
			/>
			<div className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 w-[90%] rounded-[1.7rem] flex justify-between items-center px-4 py-2 pl-5 shadow-bg'>
				<div>
					<h3 className='text-[.9rem]  font-manrope text-gray-300 font-bold'>
						{props.name}
					</h3>
					<p className='text-gray-500 text-[.8rem] relative bottom-[.1rem] '>
						{props.role}
					</p>
				</div>
				<a
					href={props.twitter}
					className='text-blue-500 hover:text-blue-400 bg-white rounded-[1rem] p-2 w-[35px] h-[35px] flex justify-center items-center'>
					<Image
						src='/icons/x-icon.svg'
						width={25}
						height={25}
						alt='twitter'
						className='invert  object-contain'
					/>
				</a>
			</div>
		</div>
	);
};

const Team: React.FC = () => {
	return (
		<section className='relative p-4 pt-[4rem] bg-gray-900'>
			<TopText title='Team' />
			<h1 className='text-[2.7rem]  font-manrope text-center  font-semibold text-slate-300 '>
				Meet the Builders
			</h1>
			<div className='flex justify-center items-center gap-8 mt-8'>
				<TeamCard
					name='Chukwuba Promise'
					role='Blockchain Developer'
					twitter='/sss'
					src='/images/nft-1.jpeg'
				/>
				<TeamCard
					name='Anioke Sebastian'
					role='Frontend Engineer'
					twitter='/sss'
					src='/images/nft-2.jpeg'
				/>
				<TeamCard
					name='Ejiofor Celestine'
					role='Backend Engineer'
					twitter='/sss'
					src='/images/nft-3.jpeg'
				/>
			</div>
		</section>
	);
};
export default Team;
