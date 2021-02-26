import {
  Account,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import { Numberu64 } from '@solana/spl-token-swap';
import * as BufferLayout from 'buffer-layout';

import {
  RECCURING_PAYMENTS_PROGRAM_ID,
  SUBSCRIPTION_PLAN_STORAGE_SIZE,
} from 'constants/common';
import { getWallet, makeTransaction, sendTransaction } from 'api/wallet';
import { getConnection } from 'api/connection';
import { uint64 } from 'lib/layouts/layout';
import { createSubscriptionPlanFx } from '..';

function createSubscriptionPlanInstruction(
  subscriptionAccount: PublicKey,
  tokenMint: PublicKey,
  owner: PublicKey,
  subscriptionTimeframe: number | Numberu64,
  maxAmount: number | Numberu64,
  recurringPaymentsProgramId: PublicKey,
): TransactionInstruction {
  const dataLayout = BufferLayout.struct([
    BufferLayout.u8('instruction'),
    uint64('subscription_timeframe'),
    uint64('max_amount'),
  ]);

  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
    {
      instruction: 0, // CreateSubscriptionPlan instruction
      subscription_timeframe: new Numberu64(subscriptionTimeframe).toBuffer(),
      max_amount: new Numberu64(maxAmount).toBuffer(),
    },
    data,
  );

  const keys = [
    { pubkey: subscriptionAccount, isSigner: false, isWritable: true },
    { pubkey: tokenMint, isSigner: false, isWritable: false },
    { pubkey: owner, isSigner: false, isWritable: false },
  ];

  return new TransactionInstruction({
    keys,
    programId: recurringPaymentsProgramId,
    data,
  });
}

createSubscriptionPlanFx.use(
  async ({ tokenMint, subscriptionTimeframe, maxAmount }) => {
    const connection = getConnection();
    const owner = getWallet().pubkey;
    const subscriptionPlanAccount = new Account();

    const instructions: TransactionInstruction[] = [];

    // SubscriptionPlan account
    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: subscriptionPlanAccount.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          SUBSCRIPTION_PLAN_STORAGE_SIZE,
        ),
        space: SUBSCRIPTION_PLAN_STORAGE_SIZE,
        programId: RECCURING_PAYMENTS_PROGRAM_ID,
      }),
    );

    // createSubscriptionPlan instruction
    instructions.push(
      createSubscriptionPlanInstruction(
        subscriptionPlanAccount.publicKey,
        tokenMint,
        owner,
        subscriptionTimeframe,
        maxAmount,
        RECCURING_PAYMENTS_PROGRAM_ID,
      ),
    );

    const transaction = await makeTransaction(instructions, [
      subscriptionPlanAccount,
    ]);
    return sendTransaction(transaction);
  },
);
