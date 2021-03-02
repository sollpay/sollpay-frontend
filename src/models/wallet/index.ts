// import { Connection } from '@solana/web3.js';
// import { Wallet } from 'api/wallet/Wallet';
import { TOKENS } from '@solana/spl-token-registry';
import { WalletType } from 'api/wallet';
import { app } from '../app';
import { ExtendedCluster } from '../../types/custom';

export const connectFx = app.createEffect<void, string>();

export const disconnectFx = app.createEffect<void, void>();

export const changeCluster = app.createEvent<ExtendedCluster>();

export const $cluster = app.createStore<ExtendedCluster>('devnet');

export const clusterPersisted = app.createEvent<any>();

export const $type = app.createStore<WalletType>(WalletType.SOLLET);

export const $connected = app.createStore<boolean>(false);

export const $availableTokens = $cluster.map((cluster) => TOKENS[cluster] || []);

// export const $connection = app.createStore<Connection | null>(null);
//
// export const $wallet = app.createStore<Wallet | null>(null);
