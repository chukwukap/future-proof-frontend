import { prisma } from "@/config/prisma";
import { generateObjectId } from "@/lib/utils";

export async function getTokenIdByCurrency(currency: string) {
  const token = await prisma.token.findFirst({
    where: { symbol: currency },
  });

  if (!token) {
    throw new Error(`Token not found for currency: ${currency}`);
  }

  return token.id;
}

export async function createToken(
  address: string,
  symbol: string,
  decimals: number
) {
  return prisma.token.create({
    data: {
      id: generateObjectId(),
      address: address.toLowerCase(),
      symbol,
      decimals,
    },
  });
}

export async function getToken(address: string) {
  return prisma.token.findUnique({
    where: {
      address: address.toLowerCase(),
    },
  });
}

export async function updateToken(
  address: string,
  data: Partial<{ symbol: string; decimals: number }>
) {
  return prisma.token.update({
    where: { address: address.toLowerCase() },
    data,
  });
}

export async function deleteToken(address: string) {
  return prisma.token.delete({
    where: { address: address.toLowerCase() },
  });
}
