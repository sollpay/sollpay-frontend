import React, { FC } from 'react';

import { styled } from '@linaria/react';
import { Layout } from 'components/common/Layout';
import { Card } from 'components/common/Card';

const Wrapper = styled.div``;

export const Subscriptions: FC = () => {
  return (
    <Layout>
      <Card>subscriptions</Card>
    </Layout>
  );
};
