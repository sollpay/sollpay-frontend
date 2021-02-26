import BufferLayout from 'buffer-layout';
import { PublicKey } from '@solana/web3.js';
import { u64 } from '@solana/spl-token';
import { ISubscriptionPlanRecord } from '../../models/connection/types';
import { publicKey, uint64 } from './layout';

export const SubscriptionPlanLayout = BufferLayout.struct([
  BufferLayout.u8('isInitialized'),
  publicKey('owner'),
  publicKey('tokenMint'),
  uint64('subscriptionTimeframe'),
  uint64('maxAmount'),
]);

export function parseSubscriptionPlanData(
  data: Buffer,
): ISubscriptionPlanRecord {
  const accountInfo = SubscriptionPlanLayout.decode(data);
  accountInfo.isInitialized = accountInfo.isInitialized !== 0;
  accountInfo.owner = new PublicKey(accountInfo.owner);
  accountInfo.tokenMint = new PublicKey(accountInfo.tokenMint);
  accountInfo.subscriptionTimeframe = u64.fromBuffer(
    accountInfo.subscriptionTimeframe,
  );
  accountInfo.maxAmount = u64.fromBuffer(accountInfo.maxAmount);

  return accountInfo;
}
