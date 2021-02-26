import { combine, forward, guard, merge } from 'effector';
import { createGate } from 'effector-react';
import { AccountInfo, PublicKey } from '@solana/web3.js';

import { app } from 'models/app';
import {
  createSubscriptionFx,
  findSubscriptionPlanFx,
  getParsedTokenAccountsByOwnerFx,
} from 'models/connection';
import { ISubscriptionPlanRecord } from 'models/connection/types';
import { $connected, $tokens } from 'models/wallet';

export const SubscribeGate = createGate<{ planAddress: PublicKey }>();

export const $subscriptionPlan = app.createStore<AccountInfo<ISubscriptionPlanRecord> | null>(
  null,
);

export const $store = combine({
  connected: $connected,
  subscriptionPlan: $subscriptionPlan,
  tokens: $tokens,
  isLoading: findSubscriptionPlanFx.pending,
  isSubscribing: createSubscriptionFx.pending,
});

forward({
  from: SubscribeGate.open,
  to: findSubscriptionPlanFx,
});

guard({
  source: $subscriptionPlan.map((subscriptionPlan) => ({
    tokenMint: subscriptionPlan?.data.tokenMint,
  })),
  clock: $connected,
  filter: ({ tokenMint }, connected) => Boolean(tokenMint) && connected,
  target: getParsedTokenAccountsByOwnerFx,
});

$subscriptionPlan.on(
  findSubscriptionPlanFx.doneData,
  (_, subscriptionPlan) => subscriptionPlan,
);
