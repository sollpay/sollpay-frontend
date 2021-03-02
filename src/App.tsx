import React, { Suspense } from 'react';
import { Router } from 'react-router';
import { useGate } from 'effector-react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { AppGate } from 'models/app';
import { history } from 'lib/routing';
import { Pages } from './routes';
import { ModalManager } from './components/common/ModalManager';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const App: React.FC = () => {
  useGate(AppGate);

  return (
    <>
      <Router history={history}>
        <Suspense fallback={null}>
          <Pages />
        </Suspense>
      </Router>
      <ModalManager />
    </>
  );
};
