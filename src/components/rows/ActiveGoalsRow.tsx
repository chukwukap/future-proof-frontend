import { TableCell, TableRow } from "@/components/ui/table";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";

export type ActiveGoalsProps = {
	image: string;
	name: string;
	targetAmount: number;
	date: string;
	currentAmount: number;
};

function ActiveGoalsRow(props: ActiveGoalsProps) {
	return (
		<TableRow className='grid grid-cols-2  items-center h-[5rem]'>
			<TableCell className='flex gap-3 items-center'>
				<Image
					width={50}
					height={50}
					src={props.image}
					alt={props.image}
				/>
				<p className='text-gray-400'>{props.name}</p>
			</TableCell>
			<TableCell className='flex items-center gap-1 md:gap-2'>
				<Progress value={33} />
			</TableCell>
		</TableRow>
	);
}

export default ActiveGoalsRow;
