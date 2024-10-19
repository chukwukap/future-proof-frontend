import { prisma } from "@/config/prisma";
import { generateObjectId } from "@/lib/utils";

export async function createUser(address: string, smartWalletAddress?: string) {
  return prisma.user.create({
    data: {
      id: generateObjectId(),
      address: address.toLowerCase(),
      smartWalletAddress: smartWalletAddress?.toLowerCase(),
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

export async function updateUser(
  address: string,
  data: Partial<{ smartWalletAddress: string }>
) {
  return prisma.user.update({
    where: { address: address.toLowerCase() },
    data,
  });
}

export async function deleteUser(address: string) {
  return prisma.user.delete({
    where: { address: address.toLowerCase() },
  });
}
