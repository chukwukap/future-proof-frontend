import { getUserGoals } from "@/actions/goalActions";
import SavingsPageClient from "./savingsPageClient";
import { sampleUserId } from "../page";

async function SavingsPage({}: { params: { baseName: string } }) {
  // const userId = params.baseName;
  const goals = await getUserGoals(sampleUserId);

  return <SavingsPageClient initialGoals={goals} />;
}

export default SavingsPage;
