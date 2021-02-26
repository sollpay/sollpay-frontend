import { LOCALNET_URL } from 'api/connection';
import { $cluster } from '../models/wallet';

const EXPLORER_BASE_URL = 'https://explorer.solana.com/';

export const getExplorerUrl = (type = 'tx', address: string): string => {
  const cluster = $cluster.getState();

  const baseUrlWithAddress = `${EXPLORER_BASE_URL}${type}/${address}`;
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      return `${baseUrlWithAddress}?cluster=${cluster}`;
    case 'localnet':
      return `${baseUrlWithAddress}?cluster=custom&customUrl=${LOCALNET_URL}`;
    default:
      return baseUrlWithAddress;
  }
};
