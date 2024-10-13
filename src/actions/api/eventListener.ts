"use server";

import { ethers } from "ethers";
import { FutureproofVault__factory } from "@/types/ethers-contracts";
import { prisma } from "@/config/prisma";
import { updateUserBalance } from "./user";
import { recordInterestDistribution } from "./interest";
import { updateBalanceRoot } from "./merkleTree";

const FUTUREPROOF_VAULT_ADDRESS = process.env.FUTUREPROOF_VAULT_ADDRESS!;

async function getProvider() {
  return new ethers.JsonRpcProvider(process.env.RPC_URL);
}

export async function startEventListener() {
  const provider = await getProvider();
  const futureproofVault = FutureproofVault__factory.connect(
    FUTUREPROOF_VAULT_ADDRESS,
    provider
  );

  futureproofVault.on("Deposit", async (user, token, amount, event) => {
    await updateUserBalance(user, token, amount.toString());
    await prisma.deposit.create({
      data: {
        userId: user,
        tokenId: token,
        amount: amount.toString(),
        txHash: event.transactionHash,
      },
    });
  });

  futureproofVault.on("Withdrawal", async (user, token, amount, event) => {
    await updateUserBalance(user, token, amount.toString());
    await prisma.withdrawal.create({
      data: {
        userId: user,
        tokenId: token,
        amount: amount.toString(),
        txHash: event.transactionHash,
      },
    });
  });

  futureproofVault.on(
    "InterestDistributed",
    async (user, token, amount, event) => {
      await updateUserBalance(user, token, amount.toString());
      await recordInterestDistribution(token, amount.toString());
    }
  );

  futureproofVault.on("BalanceRootUpdated", async (newRoot, event) => {
    await prisma.merkleRoot.create({
      data: {
        root: newRoot,
      },
    });
  });

  futureproofVault.on("TokenAdded", async (token, aToken, event) => {
    await prisma.token.create({
      data: {
        address: token,
        aTokenAddress: aToken,
        // You might want to fetch additional token details here
      },
    });
  });

  futureproofVault.on("TokenRemoved", async (token, event) => {
    await prisma.token.delete({
      where: { address: token },
    });
  });

  console.log("Event listener started for FutureproofVault");
}

export async function stopEventListener() {
  const provider = await getProvider();
  const futureproofVault = FutureproofVault__factory.connect(
    FUTUREPROOF_VAULT_ADDRESS,
    provider
  );

  futureproofVault.removeAllListeners();
  console.log("Event listener stopped for FutureproofVault");
}
