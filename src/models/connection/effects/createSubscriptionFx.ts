import {
  Account,
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  TransactionInstruction,
} from '@solana/web3.js';
import { Numberu64 } from '@solana/spl-token-swap';
import * as BufferLayout from 'buffer-layout';
import { uint64 } from 'lib/layouts/layout';
import { getConnection } from 'api/connection';
import { getWallet, makeTransaction, sendTransaction } from 'api/wallet';
import {
  RECCURING_PAYMENTS_PROGRAM_ID,
  SUBSCRIPTION_STORAGE_SIZE,
} from 'constants/common';
import { createSubscriptionFx } from '..';

function createSubscriptionInstruction(
  subscriptionAccount: PublicKey,
  subscriptionPlanAddress: PublicKey,
  tokenAddress: PublicKey,
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
      instruction: 1, // CreateSubscription instruction
      subscription_timeframe: new Numberu64(subscriptionTimeframe).toBuffer(),
      max_amount: new Numberu64(maxAmount).toBuffer(),
    },
    data,
  );

  const keys = [
    { pubkey: subscriptionAccount, isSigner: false, isWritable: true },
    { pubkey: subscriptionPlanAddress, isSigner: false, isWritable: false },
    { pubkey: tokenAddress, isSigner: false, isWritable: false },
    { pubkey: owner, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
  ];

  return new TransactionInstruction({
    keys,
    programId: recurringPaymentsProgramId,
    data,
  });
}

createSubscriptionFx.use(
  async ({
    subscriptionPlanAddress,
    tokenAddress,
    subscriptionTimeframe,
    maxAmount,
  }) => {
    const connection = getConnection();
    const owner = getWallet().pubkey;
    const subscriptionAccount = new Account();

    const instructions: TransactionInstruction[] = [];

    // SubscriptionPlan account
    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: subscriptionAccount.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          SUBSCRIPTION_STORAGE_SIZE,
        ),
        space: SUBSCRIPTION_STORAGE_SIZE,
        programId: RECCURING_PAYMENTS_PROGRAM_ID,
      }),
    );

    // createSubscriptionPlan instruction
    instructions.push(
      createSubscriptionInstruction(
        subscriptionAccount.publicKey,
        subscriptionPlanAddress,
        tokenAddress,
        owner,
        subscriptionTimeframe,
        maxAmount,
        RECCURING_PAYMENTS_PROGRAM_ID,
      ),
    );

    const transaction = await makeTransaction(instructions, [
      subscriptionAccount,
    ]);
    return sendTransaction(transaction);
  },
);
