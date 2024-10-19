import { TableCell, TableRow } from "@/components/ui/table";
import { abbreviateAddress } from "@/lib/utils";
import { MoveDownLeft, MoveUpRight } from "lucide-react";

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

export const customerData = [
	{
		name: "Alice Johnson",
		walletAddress: "0x1234567890123456789012345678901234567890",
		date: "2024-07-15",
		orders: 5,
		price: 250.5,
		backgroundColor: "#F0F4F8",
		color: "#1A365D",
		email: "alice.johnson@example.com",
	},
	{
		name: "Bob Smith",
		walletAddress: "0xABCDEF0123456789ABCDEF0123456789ABCDEF01",
		date: "2024-07-14",
		orders: 3,
		price: 150.75,
		backgroundColor: "#FEFCBF",
		color: "#744210",
		email: "bob.smith@example.com",
	},
	{
		name: "Charlie Brown",
		walletAddress: "0x9876543210987654321098765432109876543210",
		date: "2024-07-13",
		orders: 7,
		price: 350.25,
		backgroundColor: "#E6FFFA",
		color: "#234E52",
		email: "charlie.brown@example.com",
	},
	{
		name: "Diana Prince",
		walletAddress: "0xFEDCBA9876543210FEDCBA9876543210FEDCBA98",
		date: "2024-07-12",
		orders: 2,
		price: 100.0,
		backgroundColor: "#FFF5F5",
		color: "#63171B",
		email: "diana.prince@example.com",
	},
	{
		name: "Ethan Hunt",
		walletAddress: "0x0123456789ABCDEF0123456789ABCDEF01234567",
		date: "2024-07-11",
		orders: 4,
		price: 200.3,
		backgroundColor: "#EBF8FF",
		color: "#2A4365",
		email: "ethan.hunt@example.com",
	},
	{
		name: "Fiona Gallagher",
		walletAddress: "0x89ABCDEF0123456789ABCDEF0123456789ABCDEF",
		date: "2024-07-10",
		orders: 6,
		price: 300.6,
		backgroundColor: "#F0FFF4",
		color: "#22543D",
		email: "fiona.gallagher@example.com",
	},
	{
		name: "George Costanza",
		walletAddress: "0x3210987654321098765432109876543210987654",
		date: "2024-07-09",
		orders: 1,
		price: 50.25,
		backgroundColor: "#FAF5FF",
		color: "#44337A",
		email: "george.costanza@example.com",
	},
];

function RecentTransactionRow(props: RecentTransaction) {
	const spanBackground =
		props.type == "deposit" ? "bg-[#F0FFF4]" : "bg-[#FFF5F5]";
	return (
		<TableRow className='grid grid-cols-3  items-center h-[5rem]'>
			<TableCell className='flex gap-3 items-center'>
				<span
					className={`rounded-full h-10 w-10 ${spanBackground} flex justify-center items-center`}>
					{props.type == "deposit" ? (
						<MoveDownLeft
							strokeWidth={3}
							color='#22543D'
						/>
					) : (
						<MoveUpRight
							strokeWidth={3}
							color='#744210'
						/>
					)}
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
