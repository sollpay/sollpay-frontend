import { app } from 'models/app';
import { ButtonClick } from 'types/effector';
import { $connected, connectFx } from 'models/wallet';
import { history } from 'lib/routing';

export const connectAndCreateClicked = app.createEvent<ButtonClick>();

connectAndCreateClicked.watch(async () => {
  const connected = $connected.getState();
  if (!connected) {
    await connectFx();
  }
  history.push('/select');
});
