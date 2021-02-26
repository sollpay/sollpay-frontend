// Web3 does not recognise "localnet" as a cluster
import { Cluster } from '@solana/web3.js';

export type ExtendedCluster = Cluster | 'localnet';
