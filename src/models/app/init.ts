import { $connected, changeCluster } from '../wallet';
import { app } from './index';

app.onCreateStore((newStore) => {
  // Change cluster reset all store exclude $connected because of route pass user to home page
  if (newStore !== $connected) {
    newStore.reset(changeCluster);
  }
});

app.onCreateEffect((newEffect) => {
  newEffect.failData.watch((payload) => console.error(payload));
});
