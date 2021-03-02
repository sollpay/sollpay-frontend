import { forward } from 'effector';
import { persist } from 'effector-storage/local';
import * as WalletAPI from 'api/wallet';
import { WalletEvent } from 'api/wallet/Wallet';

import {
  $cluster,
  $connected,
  $type,
  changeCluster,
  connectFx,
  disconnectFx,
} from '.';

connectFx.use(async () => {
  const cluster = $cluster.getState();
  const type = $type.getState();
  const wallet = await WalletAPI.connect(cluster, type);

  wallet.on(WalletEvent.DISCONNECT, () => {
    disconnectFx();
    console.error('Wallet disconnected');
  });

  wallet.on(WalletEvent.CONFIRMED, ({ transactionSignature }) =>
    console.info(`Confirmed: ${transactionSignature}`),
  );

  console.info('Wallet connected');

  return wallet.pubkey.toBase58();
});

disconnectFx.use(() => {
  WalletAPI.disconnect();
  console.error('Wallet disconnected');
});

$cluster.on(changeCluster, (_, cluster) => cluster);

$connected.on(connectFx.done, () => true).on(disconnectFx, () => false);

forward({
  from: changeCluster,
  to: [connectFx],
});

persist({
  store: $cluster,
  key: 'cluster',
});
