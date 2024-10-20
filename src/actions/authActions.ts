import { prisma } from "@/config/prisma";
import { generateObjectId } from "@/lib/utils";

export async function createOrUpdateUser(userData: {
  address: string;
  email: string;
  smartWalletAddress?: string;
}) {
  const { address, email, smartWalletAddress } = userData;

  return prisma.user.upsert({
    where: { address: address.toLowerCase() },
    update: {
      email,
      smartWalletAddress: smartWalletAddress?.toLowerCase(),
    },
    create: {
      id: generateObjectId(),
      address: address.toLowerCase(),
      email,
      smartWalletAddress: smartWalletAddress?.toLowerCase(),
    },
  });
}
