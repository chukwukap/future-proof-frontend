// app/utils/batchManager.ts
import { ethers } from "ethers";
import { FutureproofAccount__factory } from "@/types/ethers-contracts/factories/FutureproofAccount__factory";

const FUTUREPROOF_ACCOUNT_ADDRESS = process.env.FUTUREPROOF_ACCOUNT_ADDRESS!;

export class BatchManager {
  private queue: any[] = [];
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  }

  queueTransaction(transaction: any) {
    this.queue.push(transaction);
  }

  async submitBatch() {
    if (this.queue.length === 0) return;

    const signer = this.provider.getSigner();
    const futureproofAccount = FutureproofAccount__factory.connect(
      FUTUREPROOF_ACCOUNT_ADDRESS,
      signer
    );

    try {
      const tx = await futureproofAccount.batchTransactions(this.queue);
      await tx.wait();
      this.queue = []; // Clear the queue after successful submission
      return tx.hash;
    } catch (error) {
      console.error("Batch submission failed:", error);
      throw error;
    }
  }
}
