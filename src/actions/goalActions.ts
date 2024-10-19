import { prisma } from "@/config/prisma";
import { generateObjectId } from "@/lib/utils";

export async function createGoal(
  userId: string,
  tokenId: string,
  name: string,
  targetAmount: string,
  deadline?: Date
) {
  return prisma.goal.create({
    data: {
      id: generateObjectId(),
      userId,
      tokenId,
      name,
      targetAmount,
      currentAmount: "0",
      deadline,
    },
  });
}

export async function getGoal(id: string) {
  return prisma.goal.findUnique({
    where: { id },
    include: {
      token: true,
      deposits: true,
      user: true,
      withdrawals: true,
      _count: true,
    },
  });
}

export async function getUserGoals(userId: string) {
  return prisma.goal.findMany({
    where: { userId },
    include: { token: true },
  });
}

export async function updateGoal(
  id: string,
  data: Partial<{
    name: string;
    targetAmount: string;
    currentAmount: string;
    deadline: Date | null;
  }>
) {
  return prisma.goal.update({
    where: { id },
    data,
  });
}

export async function deleteGoal(id: string) {
  return prisma.goal.delete({
    where: { id },
  });
}
