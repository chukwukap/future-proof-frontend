import { AreaGradient } from "@/components/ui/AreaGradient";
import { Eye, Plus } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import RecentTransactionTable from "@/components/tables/RecentTransaactionTable";
import ActiveGoalsTable from "@/components/tables/ActiveGoalsTable";

export function SelectDemo() {
	return (
		<Select defaultValue='naira'>
			<SelectTrigger className='w-fit bg-transparent border-none p-0'>
				<SelectValue
					className='text-sm text-gray-400'
					placeholder='Select a currency'
				/>
			</SelectTrigger>
			<SelectContent className='bg-app-borderColor'>
				<SelectGroup>
					<SelectLabel>Currencies</SelectLabel>
					<SelectItem value='naira'>Naira</SelectItem>
					<SelectItem value='usd'>USD</SelectItem>
					<SelectItem value='euro'>Euro</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
function DashboardPage() {
	return (
		<div className='w-[80%] mx-auto '>
			<div className='flex justify-between  gap-6 mt-14 w-[80%] mx-auto'>
				<div className='w-full bg-app-secondary p-6 rounded-[.8rem] border border-app-borderColor'>
					<div className='flex items-center justify-between '>
						<div className='flex items-center gap-2 mb-2'>
							<SelectDemo />
							<Eye
								color='grey'
								className='w-5'
							/>
						</div>
						<p className='text-neutral-400 text-sm'>Total Revenue</p>
					</div>
					<h1 className='text-3xl font-bold'>$72,000</h1>
					<AreaGradient />
				</div>
				<div className='w-[40%]'>
					<p className=' mt-6 text-gray-500'>Make a deposit</p>
					<div className='flex flex-wrap gap-4 mt-4'>
						<p className='text-sm text-gray-400 px-4 rounded-[1rem] bg-[#1e1e1e] font-semibold py-1'>
							$20
						</p>
						<p className='text-sm text-gray-400 px-4 rounded-[1rem] bg-[#1e1e1e] font-semibold py-1'>
							$20
						</p>
						<p className='text-sm text-gray-400 px-4 rounded-[1rem] bg-[#1e1e1e] font-semibold py-1'>
							$20
						</p>
						<p className='text-sm text-gray-400 px-4 rounded-[1rem] bg-[#1e1e1e] font-semibold py-1'>
							$20
						</p>
						<p className='text-sm text-gray-400 px-4 rounded-[1rem] bg-[#1e1e1e] font-semibold py-1'>
							$20
						</p>
						<p className='text-sm text-gray-400 px-4 rounded-[1rem] bg-[#1e1e1e] font-semibold py-1'>
							$20
						</p>
						<p className='text-sm text-gray-400 px-4 rounded-[1rem] bg-[#1e1e1e] font-semibold py-1'>
							$20
						</p>
						<p className='text-sm text-gray-400 px-4 rounded-[1rem] bg-[#1e1e1e] font-semibold py-1'>
							$20
						</p>
						<p className='text-sm text-gray-400 px-4 rounded-[1rem] bg-[#1e1e1e] font-semibold py-1'>
							<Plus className='w-5' />
						</p>
					</div>
				</div>
			</div>
			<div>
				<div className='grid grid-cols-2 gap-12'>
					<RecentTransactionTable />
					<ActiveGoalsTable />
				</div>
			</div>
		</div>
	);
}
export default DashboardPage;
