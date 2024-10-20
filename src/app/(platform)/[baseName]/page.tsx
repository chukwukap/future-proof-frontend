import { getUserBalances } from "@/actions/balanceActions";
import { getUserGoals } from "@/actions/goalActions";
import { getUserTransactions } from "@/actions/transactions";
import OverviewPageClient from "./overviewPageClient";

export const sampleUserId = "60a5e4b0e7b7a2001f3c8855";

async function OverviewPage({ params }: { params: { baseName: string } }) {
  console.log(params.baseName);

  try {
    const [balances, goals, transactions] = await Promise.all([
      getUserBalances(sampleUserId),
      getUserGoals(sampleUserId),
      getUserTransactions(sampleUserId),
    ]);

    return (
      <OverviewPageClient
        balances={balances}
        goals={goals}
        transactions={transactions}
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}

export default OverviewPage;
