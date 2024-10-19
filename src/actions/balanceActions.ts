import { prisma } from "@/config/prisma";
import { generateObjectId } from "@/lib/utils";

export async function updateBalance(
  userId: string,
  tokenId: string,
  amount: string
) {
  return prisma.balance.upsert({
    where: {
      userId_tokenId: {
        userId,
        tokenId,
      },
    },
    update: { amount },
    create: {
      id: generateObjectId(),
      userId,
      tokenId,
      amount,
    },
  });
}

export async function getBalance(userId: string, tokenId: string) {
  return prisma.balance.findUnique({
    where: {
      userId_tokenId: {
        userId,
        tokenId,
      },
    },
  });
}

export async function getUserBalances(userId: string) {
  return prisma.balance.findMany({
    where: { userId },
    include: { token: true },
  });
}
