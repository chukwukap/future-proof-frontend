"use server";

import { ethers } from "ethers";
import { FutureproofVault__factory } from "@/types/ethers-contracts";
import { getProvider } from "@/config/providers";

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_FUTUREPROOF_VAULT_ADDRESS!;

export async function deposit(tokenAddress: string, amount: string) {
  const provider = getProvider();
  const signer = provider.getSigner();
  const vault = FutureproofVault__factory.connect(VAULT_ADDRESS, signer);

  try {
    const tx = await vault.deposit(
      tokenAddress,
      ethers.utils.parseEther(amount)
    );
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Deposit failed:", error);
    return { success: false, error: "Deposit failed" };
  }
}

export async function withdraw(
  tokenAddress: string,
  amount: string,
  proof: string[]
) {
  const provider = getProvider();
  const signer = provider.getSigner();
  const vault = FutureproofVault__factory.connect(VAULT_ADDRESS, signer);

  try {
    const tx = await vault.withdrawWithProof(
      tokenAddress,
      ethers.utils.parseEther(amount),
      proof
    );
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Withdrawal failed:", error);
    return { success: false, error: "Withdrawal failed" };
  }
}

export async function getUserBalance(
  userAddress: string,
  tokenAddress: string
) {
  const provider = getProvider();
  const vault = FutureproofVault__factory.connect(VAULT_ADDRESS, provider);

  try {
    const balance = await vault.getUserBalance(userAddress, tokenAddress);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("Failed to get user balance:", error);
    return "0";
  }
}
