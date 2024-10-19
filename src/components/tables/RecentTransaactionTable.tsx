import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import RecentTransactionRow from "../rows/RecentTransactionRow";

import { RecentTransaction } from "../rows/RecentTransactionRow"; // Assuming the types are defined in a separate file

const recentTransactions: RecentTransaction[] = [
	{
		type: "deposit",
		from: "John Doe",
		method: {
			type: "wallet",
			account: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
		},
		date: "2023-10-15T10:30:00Z",
		amount: 500.0,
	},
	{
		type: "withdrawal",
		from: "Alice Smith",
		method: {
			type: "card",
			account: "4111111111111111",
		},
		date: "2023-10-14T14:45:00Z",
		amount: 250.5,
	},
	{
		type: "deposit",
		from: "Bob Johnson",
		method: {
			type: "wallet",
			account: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
		},
		date: "2023-10-13T09:15:00Z",
		amount: 1000.0,
	},
	{
		type: "withdrawal",
		from: "Emma Brown",
		method: {
			type: "card",
			account: "5555555555554444",
		},
		date: "2023-10-12T16:20:00Z",
		amount: 75.25,
	},
	{
		type: "deposit",
		from: "Charlie Wilson",
		method: {
			type: "wallet",
			account: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
		},
		date: "2023-10-11T11:00:00Z",
		amount: 300.75,
	},
];

function RecentTransactionTable() {
	return (
		<Table className='bg-app-secondary mt-14 [&_tr]:border-b-[#272727] border-2 border-[#272727] rounded-xl '>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow className='grid grid-cols-3 items-center p-0 [&>th]:flex [&>th]:items-center py-2 '>
					<TableHead>Transaction</TableHead>
					<TableHead>Account</TableHead>
					<TableHead className='text-right'>Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{recentTransactions.map((item, index) => (
					<RecentTransactionRow
						key={index}
						{...item}
					/>
				))}
			</TableBody>
		</Table>
	);
}
export default RecentTransactionTable;
