import { PublicKey } from '@solana/web3.js';
import { u64 } from '@solana/spl-token';

export interface ISubscriptionPlanRecord {
  isInitialized: boolean;
  nonce: number;
  owner: PublicKey;
  authority: PublicKey;
  token: PublicKey;
  subscriptionTimeframe: u64;
  maxAmount: u64;
}

export interface ISubscriptionRecord {
  isInitialized: boolean;
  isApproved: boolean;
  subscriptionPlanAccount: PublicKey;
  tokenAddress: PublicKey;
  owner: PublicKey;
  cycleStart: u64;
  subscriptionTimeframe: u64;
  maxAmount: u64;
  withdrawnAmount: u64;
}
