import { prisma } from "@/config/prisma";
import { generateObjectId } from "@/lib/utils";

export async function createReferral(
  referrerId: string,
  referredAddress: string
) {
  return prisma.referral.create({
    data: {
      id: generateObjectId(),
      referrerId,
      referredAddress,
      status: "PENDING",
    },
  });
}

export async function getReferral(id: string) {
  return prisma.referral.findUnique({
    where: { id },
  });
}

export async function getUserReferrals(referrerId: string) {
  return prisma.referral.findMany({
    where: { referrerId },
  });
}

export async function updateReferralStatus(
  id: string,
  status: "PENDING" | "COMPLETED" | "REWARDED"
) {
  return prisma.referral.update({
    where: { id },
    data: { status },
  });
}

export async function deleteReferral(id: string) {
  return prisma.referral.delete({
    where: { id },
  });
}
