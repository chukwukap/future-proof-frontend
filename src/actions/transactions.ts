import { prisma } from "@/config/prisma";
import { generateObjectId } from "@/lib/utils";
import { createDeposit } from "./depositActions";
import { createWithdrawal } from "./withdrawalActions";
import { updateBalance } from "./balanceActions";
import { Token, Transaction } from "@prisma/client";

export async function deposit(
  userId: string,
  tokenAddress: string,
  amount: string
) {
  const token = await prisma.token.findUnique({
    where: { address: tokenAddress.toLowerCase() },
  });
  if (!token) throw new Error("Token not found");

  const txHash = `0x${generateObjectId()}`; // This is a placeholder. In a real app, this would be the actual transaction hash from the blockchain.

  await createDeposit(userId, token.id, amount, txHash);
  await updateBalance(userId, token.id, amount);

  return prisma.transaction.create({
    data: {
      id: generateObjectId(),
      txHash,
      type: "DEPOSIT",
      status: "COMPLETED",
      userId,
      tokenId: token.id,
      amount,
    },
  });
}

export async function withdraw(
  userId: string,
  tokenAddress: string,
  amount: string,
  proof: string[]
) {
  console.log(proof);
  const token = await prisma.token.findUnique({
    where: { address: tokenAddress.toLowerCase() },
  });
  if (!token) throw new Error("Token not found");

  // Here you would verify the proof. For simplicity, we're skipping this step.

  const txHash = `0x${generateObjectId()}`; // This is a placeholder. In a real app, this would be the actual transaction hash from the blockchain.

  await createWithdrawal(userId, token.id, amount, txHash);

  const currentBalance = await prisma.balance.findUnique({
    where: { userId_tokenId: { userId, tokenId: token.id } },
  });

  if (!currentBalance || BigInt(currentBalance.amount) < BigInt(amount)) {
    throw new Error("Insufficient balance");
  }

  const newBalance = (
    BigInt(currentBalance.amount) - BigInt(amount)
  ).toString();
  await updateBalance(userId, token.id, newBalance);

  return prisma.transaction.create({
    data: {
      id: generateObjectId(),
      txHash,
      type: "WITHDRAWAL",
      status: "COMPLETED",
      userId,
      tokenId: token.id,
      amount,
    },
  });
}

export type TransactionWithToken = Transaction & { token: Token };
// Add this function to the existing file
export async function getUserTransactions(
  userId: string
): Promise<TransactionWithToken[]> {
  return prisma.transaction.findMany({
    where: { userId },
    // include: { token: true },
    orderBy: { createdAt: "desc" },
    take: 10, // Limit to the 10 most recent transactions
  }) as Promise<TransactionWithToken[]>;
}
