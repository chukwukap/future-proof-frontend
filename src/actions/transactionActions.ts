import { prisma } from "@/config/prisma";

export async function getUserTransactions(userId: string) {
  return prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}
