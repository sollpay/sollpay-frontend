import {
  AccountInfo,
  ParsedAccountData,
  PublicKey,
  PublicKeyAndAccount,
} from '@solana/web3.js';
import { Numberu64 } from '@solana/spl-token-swap';
import { app } from '../app';
import { ISubscriptionPlanRecord, ISubscriptionRecord } from './types';

export const getParsedTokenAccountsByOwnerFx = app.createEffect<
  {
    token?: PublicKey;
  },
  { pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }[]
>();

export const createSubscriptionPlanFx = app.createEffect<
  {
    token: PublicKey;
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

export const findSubscriptionsFx = app.createEffect<
  void,
  PublicKeyAndAccount<ISubscriptionRecord>[]
>();

export const createSubscriptionFx = app.createEffect<
  {
    subscriptionPlanAccount: PublicKey;
    authority: PublicKey;
    tokenAccount: PublicKey;
    subscriptionTimeframe: number | Numberu64;
    maxAmount: number | Numberu64;
  },
  string
>();
