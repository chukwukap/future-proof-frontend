import { getUserBalances } from "@/actions/balanceActions";
import { getUserGoals } from "@/actions/goalActions";
import { getUserTransactions } from "@/actions/transactions";
import OverviewPageClient from "./overviewPageClient";
import { sampleUserId } from "@/lib/constants";


async function OverviewPage({ params }: { params: { baseName: string } }) {
  // const userId = params.baseName;

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
