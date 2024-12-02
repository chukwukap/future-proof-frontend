import { prisma } from "@/config/prisma";
import { generateObjectId } from "@/lib/utils";

export async function createOrUpdateUser(userData: {
  id: string;
  address: string;
  email: string;
  smartWalletAddress?: string | null;
}) {
  const { id, address, email, smartWalletAddress } = userData;
  return prisma.user.upsert({
    where: { address: address || address.toLowerCase() },
    update: {
      email,
      smartWalletAddress: smartWalletAddress?.toLowerCase(),
    },
    create: {
      id,
      address: address.toLowerCase(),
      email,
      smartWalletAddress: smartWalletAddress?.toLowerCase(),
    },
  });
}
