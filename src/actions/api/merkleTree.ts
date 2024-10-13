"use server";

import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import { prisma } from "@/config/prisma";
import { FutureproofVault__factory } from "@/types/ethers-contracts";

const FUTUREPROOF_VAULT_ADDRESS = process.env.FUTUREPROOF_VAULT_ADDRESS!;

async function getProvider() {
  return new ethers.JsonRpcProvider(process.env.RPC_URL);
}

export async function generateMerkleTree() {
  const balances = await prisma.balance.findMany({
    include: { user: true, token: true },
  });

  const leaves = balances.map((balance: any) =>
    ethers.solidityPackedKeccak256(
      ["address", "address", "uint256"],
      [
        balance.user.address,
        balance.token.address,
        ethers.parseUnits(balance.amount, 18),
      ]
    )
  );

  const tree = new MerkleTree(leaves, ethers.keccak256, { sortPairs: true });
  const root = tree.getHexRoot();

  await prisma.merkleRoot.create({
    data: { root },
  });

  return root;
}

export async function generateMerkleProof(
  userAddress: string,
  tokenAddress: string,
  amount: string
) {
  const balances = await prisma.balance.findMany({
    include: { user: true, token: true },
  });

  const leaves = balances.map((balance) =>
    ethers.solidityPackedKeccak256(
      ["address", "address", "uint256"],
      [
        balance.user.address,
        balance.token.address,
        ethers.parseUnits(balance.amount, 18),
      ]
    )
  );

  const tree = new MerkleTree(leaves, ethers.keccak256, { sortPairs: true });
  const leaf = ethers.solidityPackedKeccak256(
    ["address", "address", "uint256"],
    [userAddress, tokenAddress, ethers.parseUnits(amount, 18)]
  );

  return tree.getHexProof(leaf);
}

export async function updateBalanceRoot() {
  const root = await generateMerkleTree();
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const futureproofVault = FutureproofVault__factory.connect(
    FUTUREPROOF_VAULT_ADDRESS,
    signer
  );

  try {
    const tx = await futureproofVault.updateBalanceRoot(root);
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Failed to update balance root:", error);
    return { success: false, error: "Failed to update balance root" };
  }
}
