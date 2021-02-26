import {
  AccountInfo,
  ParsedAccountData,
  PublicKey,
  PublicKeyAndAccount,
  RpcResponseAndContext,
} from '@solana/web3.js';
import { Numberu64 } from '@solana/spl-token-swap';
import { app } from '../app';
import { ISubscriptionPlanRecord } from './types';

export const getParsedTokenAccountsByOwnerFx = app.createEffect<
  {
    tokenMint?: PublicKey;
  },
  RpcResponseAndContext<
    { pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }[]
  >
>();

export const createSubscriptionPlanFx = app.createEffect<
  {
    tokenMint: PublicKey;
    subscriptionTimeframe: number;
    maxAmount: number;
  },
  string
>();

export const findSubscriptionPlansFx = app.createEffect<
  void,
  PublicKeyAndAccount<ISubscriptionPlanRecord>[]
>();

export const findSubscriptionPlanFx = app.createEffect<
  { planAddress: PublicKey },
  AccountInfo<ISubscriptionPlanRecord> | null
>();

export const createSubscriptionFx = app.createEffect<
  {
    subscriptionPlanAddress: PublicKey;
    tokenAddress: PublicKey;
    subscriptionTimeframe: number | Numberu64;
    maxAmount: number | Numberu64;
  },
  string
>();
