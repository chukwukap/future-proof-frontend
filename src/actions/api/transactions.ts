"use server";

import { prisma } from "@/config/prisma";
import { ethers } from "ethers";
import { getUser } from "./user";
import { getToken } from "./token";
import { FutureproofVault__factory } from "@/types/ethers-contracts";
import { generateMerkleProof } from "./merkleTree";

const FUTUREPROOF_VAULT_ADDRESS = process.env.FUTUREPROOF_VAULT_ADDRESS!;

async function getProvider() {
  return new ethers.JsonRpcProvider(process.env.RPC_URL);
}

export async function deposit(
  userAddress: string,
  tokenAddress: string,
  amount: string
) {
  const user = await getUser(userAddress);
  if (!user) throw new Error("User not found");

  const token = await getToken(tokenAddress);
  if (!token) throw new Error("Token not found");

  const provider = await getProvider();
  const signer = await provider.getSigner(userAddress);
  const futureproofVault = FutureproofVault__factory.connect(
    FUTUREPROOF_VAULT_ADDRESS,
    signer
  );

  try {
    const tx = await futureproofVault.deposit(
      tokenAddress,
      ethers.parseUnits(amount, token.decimals)
    );
    await tx.wait();

    const deposit = await prisma.deposit.create({
      data: {
        userId: user.id,
        tokenId: token.id,
        amount,
        txHash: tx.hash,
      },
    });

    await updateUserBalance(userAddress, tokenAddress);

    return { success: true, deposit, txHash: tx.hash };
  } catch (error) {
    console.error("Deposit failed:", error);
    return { success: false, error: "Deposit failed" };
  }
}

export async function withdraw(
  userAddress: string,
  tokenAddress: string,
  amount: string
) {
  const user = await getUser(userAddress);
  if (!user) throw new Error("User not found");

  const token = await getToken(tokenAddress);
  if (!token) throw new Error("Token not found");

  const provider = await getProvider();
  const signer = await provider.getSigner(userAddress);
  const futureproofVault = FutureproofVault__factory.connect(
    FUTUREPROOF_VAULT_ADDRESS,
    signer
  );

  try {
    const proof = await generateMerkleProof(userAddress, tokenAddress, amount);

    const tx = await futureproofVault.withdrawWithProof(
      tokenAddress,
      ethers.parseUnits(amount, token.decimals),
      proof
    );
    await tx.wait();

    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId: user.id,
        tokenId: token.id,
        amount,
        txHash: tx.hash,
      },
    });

    await updateUserBalance(userAddress, tokenAddress);

    return { success: true, withdrawal, txHash: tx.hash };
  } catch (error) {
    console.error("Withdrawal failed:", error);
    return { success: false, error: "Withdrawal failed" };
  }
}

async function updateUserBalance(userAddress: string, tokenAddress: string) {
  const provider = await getProvider();
  const futureproofVault = FutureproofVault__factory.connect(
    FUTUREPROOF_VAULT_ADDRESS,
    provider
  );

  const balance = await futureproofVault.getUserBalance(
    userAddress,
    tokenAddress
  );
  const formattedBalance = ethers.formatUnits(balance, 18);

  await prisma.balance.upsert({
    where: {
      userId_tokenId: {
        userId: userAddress,
        tokenId: tokenAddress,
      },
    },
    update: { amount: formattedBalance },
    create: {
      userId: userAddress,
      tokenId: tokenAddress,
      amount: formattedBalance,
    },
  });
}

export async function getTransactionHistory(userAddress: string) {
  const user = await getUser(userAddress);
  if (!user) return null;

  const deposits = await prisma.deposit.findMany({
    where: { userId: user.id },
    include: { token: true },
  });

  const withdrawals = await prisma.withdrawal.findMany({
    where: { userId: user.id },
    include: { token: true },
  });

  return [...deposits, ...withdrawals].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}
