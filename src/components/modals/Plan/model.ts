import { combine } from 'effector';
import { createSubscriptionPlanFx } from 'models/connection';

export const $store = combine({
  isLoading: createSubscriptionPlanFx.pending,
});
