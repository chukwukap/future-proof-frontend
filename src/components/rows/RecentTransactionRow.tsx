import { TableCell, TableRow } from "@/components/ui/table";
import { abbreviateAddress } from "@/lib/utils";
import { MoveDownLeft } from "lucide-react";

type PaymentMethod = {
	type: "wallet" | "card";
	account: string;
};

export type RecentTransaction = {
	type: "deposit" | "withdrawal";
	from: string;
	method: PaymentMethod;
	date: string;
	amount: number;
};

function RecentTransactionRow(props: RecentTransaction) {
	return (
		<TableRow className='grid grid-cols-3  items-center h-[5rem]'>
			<TableCell className='flex gap-3 items-center'>
				<span className='rounded-full h-12 w-12 bg-blue-300 flex justify-center items-center'>
					<MoveDownLeft
						strokeWidth={3}
						color='cyan'
					/>
				</span>
				<p className='font-bold'>
					{abbreviateAddress(props.method.account)}
				</p>
			</TableCell>
			<TableCell className='flex items-center gap-1 md:gap-2'>
				{props.amount.toFixed(2)} USDC
			</TableCell>
			<TableCell className='hidden md:block'>Apr 18, 10:30AM</TableCell>
		</TableRow>
	);
}

export default RecentTransactionRow;
