import { forward, sample } from 'effector';
import { createGate } from 'effector-react';

import { PublicKeyAndAccount } from '@solana/web3.js';
import {
  createSubscriptionPlanFx,
  findSubscriptionPlansFx,
  findSubscriptionsFx,
} from 'models/connection';
import { ISubscriptionPlanRecord } from 'models/connection/types';
import { app } from 'models/app';
import { connectFx } from 'models/wallet';
import { SubscriptionsGate } from '../subscriptions/model';

export const PlansGate = createGate();

export const $plans = app.createStore<
  PublicKeyAndAccount<ISubscriptionPlanRecord>[]
>([]);

export const $isLoading = findSubscriptionPlansFx.pending;

$plans.on(
  findSubscriptionPlansFx.doneData,
  (_, subscriptionPlans) => subscriptionPlans,
);

forward({
  from: PlansGate.open,
  to: findSubscriptionPlansFx,
});

sample({
  source: PlansGate.open,
  clock: connectFx.done,
  target: findSubscriptionPlansFx,
});

sample({
  source: PlansGate.open,
  clock: createSubscriptionPlanFx.done,
  target: findSubscriptionPlansFx,
});
