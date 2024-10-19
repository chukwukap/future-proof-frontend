import { prisma } from "@/config/prisma";
import { generateObjectId } from "@/lib/utils";

export async function createDeposit(
  userId: string,
  tokenId: string,
  amount: string,
  txHash: string,
  goalId?: string
) {
  return prisma.deposit.create({
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

export async function getDeposit(id: string) {
  return prisma.deposit.findUnique({
    where: { id },
  });
}

export async function getUserDeposits(userId: string) {
  return prisma.deposit.findMany({
    where: { userId },
    include: { token: true, goal: true },
  });
}

export async function deleteDeposit(id: string) {
  return prisma.deposit.delete({
    where: { id },
  });
}
