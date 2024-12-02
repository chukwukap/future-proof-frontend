import { getUserGoals } from "@/actions/goalActions";
import GoalsPageClient from "./goalsPageClient";


async function GoalsPage({}: { params: { baseName: string } }) {
  // const goals = await getUserGoals(sampleUserId);

  return <GoalsPageClient />;
}

export default GoalsPage;
