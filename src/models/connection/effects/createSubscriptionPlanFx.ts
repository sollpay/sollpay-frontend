import {
  Account,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SOLLPAY_FEE_ACCOUNT, SOLLPAY_PROGRAM_ID } from 'constants/common';
import { getWallet, makeTransaction, sendTransaction } from 'api/wallet';
import { getConnection } from 'api/connection';
import { SollPay } from 'lib/sollpay';
import { SubscriptionPlanLayout } from 'lib/sollpay/layouts/subscriptionPlan';
import { createSubscriptionPlanFx } from '..';

createSubscriptionPlanFx.use(
  async ({ token, subscriptionTimeframe, maxAmount }) => {
    const connection = getConnection();
    const wallet = getWallet().pubkey;
    const subscriptionPlanAccount = new Account();

    const [authority, nonce] = await PublicKey.findProgramAddress(
      [subscriptionPlanAccount.publicKey.toBuffer()],
      SOLLPAY_PROGRAM_ID,
    );

    const instructions: TransactionInstruction[] = [];

    // Allocate memory for the account
    const balanceNeeded = await SollPay.getMinBalanceRentForExemptSubscriptionPlan(
      connection,
    );

    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: wallet,
        newAccountPubkey: subscriptionPlanAccount.publicKey,
        lamports: balanceNeeded,
        space: SubscriptionPlanLayout.span,
        programId: SOLLPAY_PROGRAM_ID,
      }),
    );

    instructions.push(
      SollPay.createSubscriptionPlanInstruction(
        subscriptionPlanAccount,
        authority,
        token,
        SOLLPAY_FEE_ACCOUNT,
        TOKEN_PROGRAM_ID,
        SOLLPAY_PROGRAM_ID,
        wallet,
        nonce,
        subscriptionTimeframe,
        maxAmount,
      ),
    );

    const transaction = await makeTransaction(instructions, [
      subscriptionPlanAccount,
    ]);
    return sendTransaction(transaction);
  },
);
