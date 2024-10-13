// app/utils/eventListener.ts
import { ethers } from "ethers";
import { FutureproofAccount__factory } from "@/types/ethers-contracts/factories/FutureproofAccount__factory";
import { prisma } from "@/config/prisma";

const FUTUREPROOF_ACCOUNT_ADDRESS = process.env.FUTUREPROOF_ACCOUNT_ADDRESS!;

export class EventListener {
  private provider: ethers.providers.JsonRpcProvider;
  private futureproofAccount: ethers.Contract;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    this.futureproofAccount = FutureproofAccount__factory.connect(
      FUTUREPROOF_ACCOUNT_ADDRESS,
      this.provider
    );
  }

  async startListening() {
    this.futureproofAccount.on("Deposit", this.handleDeposit);
    this.futureproofAccount.on("Withdrawal", this.handleWithdrawal);
    this.futureproofAccount.on(
      "InterestGenerated",
      this.handleInterestGenerated
    );
  }

  private handleDeposit = async (
    user: string,
    token: string,
    amount: ethers.BigNumber,
    event: ethers.Event
  ) => {
    await prisma.balance.upsert({
      where: { userId_tokenId: { userId: user, tokenId: token } },
      update: { amount: { increment: amount.toString() } },
      create: { userId: user, tokenId: token, amount: amount.toString() },
    });
    console.log(
      `Deposit: ${user} deposited ${ethers.utils.formatUnits(
        amount,
        18
      )} of token ${token}`
    );
  };

  private handleWithdrawal = async (
    user: string,
    token: string,
    amount: ethers.BigNumber,
    event: ethers.Event
  ) => {
    await prisma.balance.update({
      where: { userId_tokenId: { userId: user, tokenId: token } },
      data: { amount: { decrement: amount.toString() } },
    });
    console.log(
      `Withdrawal: ${user} withdrew ${ethers.utils.formatUnits(
        amount,
        18
      )} of token ${token}`
    );
  };

  private handleInterestGenerated = async (
    token: string,
    amount: ethers.BigNumber,
    event: ethers.Event
  ) => {
    await prisma.interestGenerated.create({
      data: {
        tokenId: token,
        amount: amount.toString(),
      },
    });
    console.log(
      `Interest Generated: ${ethers.utils.formatUnits(
        amount,
        18
      )} for token ${token}`
    );
  };
}
