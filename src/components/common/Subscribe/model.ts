import { combine, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import {
  AccountInfo,
  ParsedAccountData,
  PublicKey,
  RpcResponseAndContext,
} from '@solana/web3.js';

import { app } from 'models/app';
import {
  createSubscriptionFx,
  findSubscriptionPlanFx,
  getParsedTokenAccountsByOwnerFx,
} from 'models/connection';
import { ISubscriptionPlanRecord } from 'models/connection/types';
import { $connected, $availableTokens } from 'models/wallet';

export const SubscribeGate = createGate<{ planAddress: PublicKey }>();

export const $subscriptionPlan = app.createStore<AccountInfo<ISubscriptionPlanRecord> | null>(
  null,
);

export const $tokenAccounts = app.createStore<
  { pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }[]
>([]);

export const $store = combine({
  connected: $connected,
  subscriptionPlan: $subscriptionPlan,
  availableTokens: $availableTokens,
  tokenAccounts: $tokenAccounts,
  isLoadingPlan: findSubscriptionPlanFx.pending,
  isLoadingTokenAccounts: getParsedTokenAccountsByOwnerFx.pending,
  isSubscribing: createSubscriptionFx.pending,
  isFetching: combine(
    findSubscriptionPlanFx.pending,
    createSubscriptionFx.pending,
    getParsedTokenAccountsByOwnerFx.pending,
    (one, two, three) => one || two || three,
  ),
});

$subscriptionPlan.on(
  findSubscriptionPlanFx.doneData,
  (_, subscriptionPlan) => subscriptionPlan,
);

$tokenAccounts.on(
  getParsedTokenAccountsByOwnerFx.doneData,
  (_, tokens) => tokens,
);

forward({
  from: SubscribeGate.open,
  to: findSubscriptionPlanFx,
});

guard({
  source: $subscriptionPlan.map((subscriptionPlan) => ({
    token: subscriptionPlan?.data.token,
  })),
  clock: $connected,
  filter: ({ token }, connected) => Boolean(token) && connected,
  target: getParsedTokenAccountsByOwnerFx,
});
