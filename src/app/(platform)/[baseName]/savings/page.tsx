import { getUserGoals } from "@/actions/goalActions";
import SavingsPageClient from "./savingsPageClient";


async function SavingsPage({}: { params: { baseName: string } }) {
  // const userId = params.baseName;
  // const goals = await getUserGoals(sampleUserId);

  return <SavingsPageClient  />;
}

export default SavingsPage;
