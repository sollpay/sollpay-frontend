import { PublicKey } from '@solana/web3.js';
import { u64 } from '@solana/spl-token';

export interface ISubscriptionPlanRecord {
  isInitialized: boolean;
  owner: PublicKey;
  tokenMint: PublicKey;
  subscriptionTimeframe: u64;
  maxAmount: u64;
}
