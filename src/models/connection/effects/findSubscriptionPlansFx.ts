import assert from 'assert';
import { PublicKey } from '@solana/web3.js';
import { complement, isNil } from 'ramda';
import { getConnection } from 'api/connection';
import { getWallet } from 'api/wallet';
import {
  parseSubscriptionPlanData,
  SubscriptionPlanLayout,
} from 'lib/sollpay/layouts/subscriptionPlan';
import { GetProgramAccountsRpcResult } from '../structs';
import { findSubscriptionPlansFx } from '..';
import { SOLLPAY_PROGRAM_ID } from '../../../constants/common';

findSubscriptionPlansFx.use(async () => {
  const connection = getConnection();
  const wallet = getWallet().pubkey;

  const filters = [
    {
      memcmp: {
        offset: SubscriptionPlanLayout.offsetOf('owner'),
        bytes: wallet.toBase58(),
      },
    },
    {
      dataSize: SubscriptionPlanLayout.span,
    },
  ];

  const unsafeRes = await connection._rpcRequest('getProgramAccounts', [
    SOLLPAY_PROGRAM_ID.toBase58(),
    {
      commitment: connection.commitment,
      filters,
      encoding: 'base64',
    },
  ]);

  const res = GetProgramAccountsRpcResult(unsafeRes);
  if (res.error) {
    throw new Error(
      'failed to get accounts owned by program ' +
        SOLLPAY_PROGRAM_ID.toBase58() +
        ': ' +
        res.error.message,
    );
  }

  const { result } = res;
  assert(typeof result !== 'undefined');

  return result
    .map((result: any) => {
      assert(result.account.data[1] === 'base64');

      const parsedData = parseSubscriptionPlanData(
        Buffer.from(result.account.data[0], 'base64'),
      );
      if (!parsedData.isInitialized) {
        return null;
      }

      return {
        pubkey: new PublicKey(result.pubkey),
        account: {
          executable: result.account.executable,
          owner: new PublicKey(result.account.owner),
          lamports: result.account.lamports,
          data: parsedData,
        },
      };
    })
    .filter(complement(isNil));
});
