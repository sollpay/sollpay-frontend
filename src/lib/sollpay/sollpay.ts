import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  Account,
  TransactionInstruction,
  SYSVAR_CLOCK_PUBKEY,
} from '@solana/web3.js';

import * as BufferLayout from 'buffer-layout';
import { Numberu64 } from '@solana/spl-token-swap';
import * as Layout from './layout';
import { SubscriptionLayout } from './layouts/subscription';
import { SubscriptionPlanLayout } from './layouts/subscriptionPlan';
import { sendAndConfirmTransaction } from './utils/send-and-confirm-transaction';

export class SollPay {
  private connection: Connection;

  /**
   * Program Identifier for the SollPay program
   */
  private sollPayProgramId: PublicKey;

  /**
   * Program Identifier for the Token program
   */
  private tokenProgramId: PublicKey;

  /**
   * The public key identifying subscription plan program
   */
  private subscriptionPlan: PublicKey;

  /**
   * The public key for the subscription plan token mint
   */
  private token: PublicKey;

  /**
   * The public key for the fee account receiving fee
   */
  private feeAccount: PublicKey;

  /**
   * Authority
   */
  private authority: PublicKey;

  /**
   * Fee payer
   */
  private payer: Account;

  /**
   * Owner
   */
  private owner: PublicKey;

  constructor(
    connection: Connection,
    subscriptionPlan: PublicKey,
    sollPayProgramId: PublicKey,
    tokenProgramId: PublicKey,
    token: PublicKey,
    feeAccount: PublicKey,
    authority: PublicKey,
    payer: Account,
    owner: PublicKey,
  ) {
    this.connection = connection;
    this.subscriptionPlan = subscriptionPlan;
    this.sollPayProgramId = sollPayProgramId;
    this.tokenProgramId = tokenProgramId;
    this.token = token;
    this.feeAccount = feeAccount;
    this.authority = authority;
    this.payer = payer;
    this.owner = owner;
  }

  static async createSubscriptionPlan(
    connection: Connection,
    payer: Account,
    subscriptionPlanAccount: Account, // TODO: maybe inside
    authority: PublicKey, // TODO: maybe inside
    token: PublicKey,
    feeAccount: PublicKey,
    sollPayProgramId: PublicKey,
    tokenProgramId: PublicKey,
    nonce: number,
    owner: PublicKey,
    subscriptionTimeframe: number | Numberu64,
    maxAmount: number | Numberu64,
  ) {
    const sollPay = new SollPay(
      connection,
      subscriptionPlanAccount.publicKey,
      sollPayProgramId,
      tokenProgramId,
      token,
      feeAccount,
      authority,
      payer,
      owner,
    );

    // Allocate memory for the account
    const balanceNeeded = await SollPay.getMinBalanceRentForExemptSubscriptionPlan(
      connection,
    );

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: subscriptionPlanAccount.publicKey,
        lamports: balanceNeeded,
        space: SubscriptionPlanLayout.span,
        programId: sollPayProgramId,
      }),
    );

    transaction.add(
      SollPay.createSubscriptionPlanInstruction(
        subscriptionPlanAccount,
        authority,
        token,
        feeAccount,
        tokenProgramId,
        sollPayProgramId,
        owner,
        nonce,
        subscriptionTimeframe,
        maxAmount,
      ),
    );

    await sendAndConfirmTransaction(
      'createAccount and CreateSubscriptionPlan',
      connection,
      transaction,
      payer,
      subscriptionPlanAccount,
    );

    return sollPay;
  }

  static createSubscriptionPlanInstruction(
    subscriptionPlanAccount: Account,
    authority: PublicKey,
    token: PublicKey,
    feeAccount: PublicKey,
    tokenProgramId: PublicKey,
    recurringPaymentsProgramId: PublicKey,
    owner: PublicKey,
    nonce: number,
    subscriptionTimeframe: number | Numberu64,
    maxAmount: number | Numberu64,
  ): TransactionInstruction {
    const dataLayout = BufferLayout.struct([
      BufferLayout.u8('instruction'),
      BufferLayout.u8('nonce'),
      Layout.uint64('subscription_timeframe'),
      Layout.uint64('max_amount'),
    ]);

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 0, // CreateSubscriptionPlan instruction
        nonce,
        subscription_timeframe: new Numberu64(subscriptionTimeframe).toBuffer(),
        max_amount: new Numberu64(maxAmount).toBuffer(),
      },
      data,
    );

    const keys = [
      {
        pubkey: subscriptionPlanAccount.publicKey,
        isSigner: false,
        isWritable: true,
      },
      { pubkey: owner, isSigner: false, isWritable: false },
      { pubkey: authority, isSigner: false, isWritable: false },
      { pubkey: token, isSigner: false, isWritable: false },
      // { pubkey: feeAccount, isSigner: false, isWritable: false },
      // { pubkey: tokenProgramId, isSigner: false, isWritable: false },
    ];

    return new TransactionInstruction({
      keys,
      programId: recurringPaymentsProgramId,
      data,
    });
  }

  static createSubscriptionInstruction(
    subscriptionAccount: Account,
    subscriptionPlanAccount: PublicKey,
    tokenAccount: PublicKey,
    tokenProgramId: PublicKey,
    feeAccount: PublicKey,
    recurringPaymentsProgramId: PublicKey,
    subscriptionTimeframe: number | Numberu64,
    maxAmount: number | Numberu64,
  ): TransactionInstruction {
    const dataLayout = BufferLayout.struct([
      BufferLayout.u8('instruction'),
      Layout.uint64('subscription_timeframe'),
      Layout.uint64('max_amount'),
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
      {
        pubkey: subscriptionAccount.publicKey,
        isSigner: false,
        isWritable: true,
      },
      { pubkey: subscriptionPlanAccount, isSigner: false, isWritable: false },
      { pubkey: tokenAccount, isSigner: false, isWritable: false },
      { pubkey: tokenProgramId, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: feeAccount, isSigner: false, isWritable: false },
    ];

    return new TransactionInstruction({
      keys,
      programId: recurringPaymentsProgramId,
      data,
    });
  }

  /**
   * Get the minimum balance for the subscription plan account to be rent exempt
   *
   * @return Number of lamports required
   */
  static async getMinBalanceRentForExemptSubscriptionPlan(
    connection: Connection,
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      SubscriptionPlanLayout.span,
    );
  }

  /**
   * Get the minimum balance for the subscription account to be rent exempt
   *
   * @return Number of lamports required
   */
  static async getMinBalanceRentForExemptSubscription(
    connection: Connection,
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      SubscriptionLayout.span,
    );
  }
}
