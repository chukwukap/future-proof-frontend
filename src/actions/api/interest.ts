"use server";

import { prisma } from "@/lib/prisma";
import { ethers } from "ethers";
import {
  FutureproofVault__factory,
  InterestGenerator__factory,
} from "@/types/ethers-contracts";
import { getUser } from "./user";
import { getToken } from "./token";

const FUTUREPROOF_VAULT_ADDRESS = process.env.FUTUREPROOF_VAULT_ADDRESS!;
const INTEREST_GENERATOR_ADDRESS = process.env.INTEREST_GENERATOR_ADDRESS!;

async function getProvider() {
  return new ethers.JsonRpcProvider(process.env.RPC_URL);
}

export async function calculateAndDistributeInterest() {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const interestGenerator = InterestGenerator__factory.connect(
    INTEREST_GENERATOR_ADDRESS,
    signer
  );

  try {
    const tx = await interestGenerator.calculateAndDistributeInterest();
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Interest calculation and distribution failed:", error);
    return {
      success: false,
      error: "Interest calculation and distribution failed",
    };
  }
}

export async function getGeneratedInterest(tokenAddress: string) {
  const provider = await getProvider();
  const interestGenerator = InterestGenerator__factory.connect(
    INTEREST_GENERATOR_ADDRESS,
    provider
  );

  try {
    const interest = await interestGenerator.getGeneratedInterest(tokenAddress);
    return { success: true, interest: ethers.formatUnits(interest, 18) };
  } catch (error) {
    console.error("Failed to get generated interest:", error);
    return { success: false, error: "Failed to get generated interest" };
  }
}

export async function getUserInterest(
  userAddress: string,
  tokenAddress: string
) {
  const provider = await getProvider();
  const interestGenerator = InterestGenerator__factory.connect(
    INTEREST_GENERATOR_ADDRESS,
    provider
  );

  try {
    const interest = await interestGenerator.getUserInterest(
      userAddress,
      tokenAddress
    );
    return { success: true, interest: ethers.formatUnits(interest, 18) };
  } catch (error) {
    console.error("Failed to get user interest:", error);
    return { success: false, error: "Failed to get user interest" };
  }
}

export async function recordInterestDistribution(
  tokenAddress: string,
  totalAmount: string
) {
  const token = await getToken(tokenAddress);
  if (!token) throw new Error("Token not found");

  return prisma.interestDistribution.create({
    data: {
      tokenId: token.id,
      totalAmount,
    },
  });
}

export async function getInterestDistributionHistory(tokenAddress: string) {
  const token = await getToken(tokenAddress);
  if (!token) throw new Error("Token not found");

  return prisma.interestDistribution.findMany({
    where: { tokenId: token.id },
    orderBy: { distributedAt: "desc" },
  });
}
