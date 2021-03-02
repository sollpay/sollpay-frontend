import {
  Account,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import { Token as SPLToken, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getConnection } from 'api/connection';
import { getWallet, makeTransaction, sendTransaction } from 'api/wallet';
import { SOLLPAY_FEE_ACCOUNT, SOLLPAY_PROGRAM_ID } from 'constants/common';
import { createSubscriptionFx } from '..';
import { SollPay, SubscriptionLayout } from 'lib/sollpay';

createSubscriptionFx.use(
  async ({
    subscriptionPlanAccount,
    authority,
    tokenAccount,
    subscriptionTimeframe,
    maxAmount,
  }) => {
    const connection = getConnection();
    const wallet = getWallet().pubkey;
    const subscriptionAccount = new Account();

    const instructions: TransactionInstruction[] = [];

    instructions.push(
      SPLToken.createApproveInstruction(
        TOKEN_PROGRAM_ID,
        tokenAccount,
        authority,
        getWallet().pubkey,
        [],
        1000000000, // TODO: find right maximum value
      ),
    );

    // Allocate memory for the account
    const balanceNeeded = await SollPay.getMinBalanceRentForExemptSubscription(
      connection,
    );

    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: wallet,
        newAccountPubkey: subscriptionAccount.publicKey,
        lamports: balanceNeeded,
        space: SubscriptionLayout.span,
        programId: SOLLPAY_PROGRAM_ID,
      }),
    );

    instructions.push(
      SollPay.createSubscriptionInstruction(
        subscriptionAccount,
        subscriptionPlanAccount,
        tokenAccount,
        TOKEN_PROGRAM_ID,
        SOLLPAY_FEE_ACCOUNT,
        SOLLPAY_PROGRAM_ID,
        subscriptionTimeframe,
        maxAmount,
      ),
    );

    const transaction = await makeTransaction(instructions, [
      subscriptionAccount,
    ]);
    return sendTransaction(transaction);
  },
);
