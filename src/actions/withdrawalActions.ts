import { prisma } from "@/config/prisma";
import { generateObjectId } from "@/lib/utils";

export async function createWithdrawal(
  userId: string,
  tokenId: string,
  amount: string,
  txHash: string,
  goalId?: string
) {
  return prisma.withdrawal.create({
    data: {
      id: generateObjectId(),
      userId,
      tokenId,
      amount,
      txHash,
      goalId,
    },
  });
}

export async function getWithdrawal(id: string) {
  return prisma.withdrawal.findUnique({
    where: { id },
  });
}

export async function getUserWithdrawals(userId: string) {
  return prisma.withdrawal.findMany({
    where: { userId },
    include: { token: true, goal: true },
  });
}

export async function deleteWithdrawal(id: string) {
  return prisma.withdrawal.delete({
    where: { id },
  });
}
