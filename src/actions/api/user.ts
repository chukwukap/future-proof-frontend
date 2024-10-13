import { prisma } from "@/config/prisma";
import { ethers } from "ethers";

export async function createUser(address: string) {
  return prisma.user.create({
    data: {
      address: address.toLowerCase(),
    },
  });
}

export async function getUser(address: string) {
  return prisma.user.findUnique({
    where: {
      address: address.toLowerCase(),
    },
  });
}

export async function getUserBalances(address: string) {
  const user = await getUser(address);
  if (!user) return null;

  return prisma.balance.findMany({
    where: {
      userId: user.id,
    },
    include: {
      token: true,
    },
  });
}

export async function updateUserBalance(
  address: string,
  tokenAddress: string,
  amount: string
) {
  const user = await getUser(address);
  if (!user) throw new Error("User not found");

  const token = await prisma.token.findUnique({
    where: { address: tokenAddress.toLowerCase() },
  });
  if (!token) throw new Error("Token not found");

  return prisma.balance.upsert({
    where: {
      userId_tokenId: {
        userId: user.id,
        tokenId: token.id,
      },
    },
    update: {
      amount,
    },
    create: {
      userId: user.id,
      tokenId: token.id,
      amount,
    },
  });
}

export async function syncOnChainBalance(
  address: string,
  tokenAddress: string
) {
  const onChainBalance = await getOnChainBalance(address, tokenAddress);
  return updateUserBalance(address, tokenAddress, onChainBalance);
}

async function getOnChainBalance(userAddress: string, tokenAddress: string) {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const futureproofVault = new ethers.Contract(
    process.env.FUTUREPROOF_VAULT_ADDRESS!,
    [
      "function getUserBalance(address user, address token) view returns (uint256)",
    ],
    provider
  );

  const balance = await futureproofVault.getUserBalance(
    userAddress,
    tokenAddress
  );
  return ethers.formatUnits(balance, 18);
}
