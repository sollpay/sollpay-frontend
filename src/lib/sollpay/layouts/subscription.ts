import BufferLayout from 'buffer-layout';
import { PublicKey } from '@solana/web3.js';
import { u64 } from '@solana/spl-token';
import { ISubscriptionRecord } from 'models/connection/types';
import { publicKey, uint64 } from '../layout';

export const SubscriptionLayout = BufferLayout.struct([
  BufferLayout.u8('isInitialized'),
  BufferLayout.u8('isApproved'),
  publicKey('subscriptionPlanAccount'),
  publicKey('tokenAccount'),
  publicKey('owner'),
  uint64('cycleStart'),
  uint64('subscriptionTimeframe'),
  uint64('maxAmount'),
  uint64('withdrawnAmount'),
]);

export function parseSubscriptionData(data: Buffer): ISubscriptionRecord {
  const accountInfo = SubscriptionLayout.decode(data);
  accountInfo.isInitialized = accountInfo.isInitialized !== 0;
  accountInfo.isApproved = accountInfo.isApproved !== 0;
  accountInfo.subscriptionPlanAccount = new PublicKey(
    accountInfo.subscriptionPlanAccount,
  );
  accountInfo.tokenAccount = new PublicKey(accountInfo.tokenAccount);
  accountInfo.owner = new PublicKey(accountInfo.owner);
  accountInfo.cycleStart = u64.fromBuffer(accountInfo.cycleStart);
  accountInfo.subscriptionTimeframe = u64.fromBuffer(
    accountInfo.subscriptionTimeframe,
  );
  accountInfo.maxAmount = u64.fromBuffer(accountInfo.maxAmount);
  accountInfo.withdrawnAmount = u64.fromBuffer(accountInfo.withdrawnAmount);

  return accountInfo;
}
