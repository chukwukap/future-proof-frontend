import { prisma } from "@/config/prisma";

export async function addToken(
  address: string,
  symbol: string,
  decimals: number
) {
  return prisma.token.create({
    data: {
      address: address.toLowerCase(),
      symbol,
      decimals,
    },
  });
}

export async function getSupportedTokens() {
  return prisma.token.findMany();
}
