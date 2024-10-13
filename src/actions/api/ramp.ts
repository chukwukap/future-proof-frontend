"use server";

import { ethers } from "ethers";
import { FutureproofVault__factory } from "@/types/ethers-contracts";
import { prisma } from "@/config/prisma";
import { getUser } from "./user";
import { getToken } from "./token";

const FUTUREPROOF_VAULT_ADDRESS = process.env.FUTUREPROOF_VAULT_ADDRESS!;

async function getProvider() {
  return new ethers.JsonRpcProvider(process.env.RPC_URL);
}

export async function initiateDeposit(
  userAddress: string,
  tokenAddress: string,
  amount: string
) {
  const user = await getUser(userAddress);
  if (!user) throw new Error("User not found");

  const token = await getToken(tokenAddress);
  if (!token) throw new Error("Token not found");

  // Here you would integrate with your fiat-to-crypto conversion service
  // For this example, we'll assume the conversion is successful and the tokens are available

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

    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Deposit failed:", error);
    return { success: false, error: "Deposit failed" };
  }
}

export async function initiateWithdrawal(
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
    // Generate Merkle proof
    const proof = await generateMerkleProof(userAddress, tokenAddress, amount);

    const tx = await futureproofVault.withdrawWithProof(
      tokenAddress,
      ethers.parseUnits(amount, token.decimals),
      proof
    );
    await tx.wait();

    // Here you would integrate with your crypto-to-fiat conversion service
    // For this example, we'll assume the conversion is successful and the fiat is sent to the user

    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Withdrawal failed:", error);
    return { success: false, error: "Withdrawal failed" };
  }
}

// This function should be implemented in your merkleTree.ts file
async function generateMerkleProof(
  userAddress: string,
  tokenAddress: string,
  amount: string
) {
  // Implementation for generating Merkle proof
  throw new Error("Not implemented");
}
