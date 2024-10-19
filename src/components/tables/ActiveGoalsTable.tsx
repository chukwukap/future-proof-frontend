import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import ActiveGoalsRow from "../rows/ActiveGoalsRow";

const activeGoals = [
	{
		image: "/images/goals/goal-1.svg",
		name: "Summer Vacation",
		targetAmount: 5000,
		date: "2024-07-15",
		currentAmount: 2500,
	},
	{
		image: "/images/goals/goal-2.svg",
		name: "New Car",
		targetAmount: 25000,
		date: "2025-03-01",
		currentAmount: 8000,
	},
	{
		image: "/images/goals/goal-3.svg",
		name: "Master's Degree",
		targetAmount: 30000,
		date: "2025-09-01",
		currentAmount: 12000,
	},
	{
		image: "/images/goals/goal-4.svg",
		name: "Down Payment for House",
		targetAmount: 50000,
		date: "2026-06-30",
		currentAmount: 15000,
	},
	{
		image: "/images/goals/goal-5.svg",
		name: "Start a Business",
		targetAmount: 20000,
		date: "2024-12-31",
		currentAmount: 5000,
	},
];

function ActiveGoalsTable() {
	return (
		<Table className='bg-app-secondary mt-14 [&_tr]:border-b-[#272727] border-2 border-[#272727] rounded-[.8rem]'>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow className='grid grid-cols-2 items-center p-0 [&>th]:flex [&>th]:items-center py-2 '>
					<TableHead>Goal</TableHead>
					<TableHead className=''>Progrss</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{activeGoals.map((item, index) => (
					<ActiveGoalsRow
						key={index}
						{...item}
					/>
				))}
			</TableBody>
		</Table>
	);
}
export default ActiveGoalsTable;
