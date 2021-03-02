import { forward, sample } from 'effector';
import { createGate } from 'effector-react';

import { PublicKeyAndAccount } from '@solana/web3.js';
import { findSubscriptionsFx } from 'models/connection';
import { ISubscriptionRecord } from 'models/connection/types';
import { app } from 'models/app';
import { connectFx } from 'models/wallet';

export const SubscriptionsGate = createGate();

export const $subscriptions = app.createStore<
  PublicKeyAndAccount<ISubscriptionRecord>[]
>([]);

export const $isLoading = findSubscriptionsFx.pending;

$subscriptions.on(
  findSubscriptionsFx.doneData,
  (_, subscriptions) => subscriptions,
);

forward({
  from: SubscriptionsGate.open,
  to: findSubscriptionsFx,
});

sample({
  source: SubscriptionsGate.open,
  clock: connectFx.done,
  target: findSubscriptionsFx,
});
