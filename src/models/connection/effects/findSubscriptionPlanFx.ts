import { getConnection } from 'api/connection';
import { parseSubscriptionPlanData } from 'lib/layouts/subscriptionPlan';
import { findSubscriptionPlanFx } from '..';

findSubscriptionPlanFx.use(async ({ planAddress }) => {
  const connection = getConnection();
  const info = await connection.getAccountInfo(planAddress);
  if (!info) {
    return null;
  }

  return {
    ...info,
    data: parseSubscriptionPlanData(info.data),
  };
});
