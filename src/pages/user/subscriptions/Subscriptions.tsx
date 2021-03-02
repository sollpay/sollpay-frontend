import React, { FC } from 'react';

import { useGate, useStore } from 'effector-react';
import { PublicKeyAndAccount } from '@solana/web3.js';
import dayjs from 'dayjs';
import { Layout } from 'components/common/Layout';
import { shortAddress } from 'utils/common';
import { getExplorerUrl } from 'utils/connection';
import { Loader } from 'components/common/Loader';
import { Table } from 'components/common/Table';
import { ISubscriptionRecord } from 'models/connection/types';
import { Button } from 'components/ui/Button';
import { Header, Description, ExplorerA, Title } from '../common.styled';
import { $isLoading, $subscriptions, SubscriptionsGate } from './model';

export const Subscriptions: FC = () => {
  useGate(SubscriptionsGate);
  const subscriptions = useStore($subscriptions);
  const isLoading = useStore($isLoading);

  // const handleShowPlanModalClick = () => {
  //   openModalFx({ modalType: MODAL_PLAN });
  // };

  const renderTr = (subscription: PublicKeyAndAccount<ISubscriptionRecord>) => {
    const date = dayjs.unix(subscription.account.data.cycleStart.toNumber());

    return (
      <tr key={subscription.pubkey.toBase58()}>
        <td>
          <ExplorerA
            href={getExplorerUrl('address', subscription.pubkey.toBase58())}
            target="_blank"
            rel="noopener noreferrer noindex"
          >
            {shortAddress(subscription.pubkey.toBase58())}
          </ExplorerA>
        </td>
        <td>
          <ExplorerA
            href={getExplorerUrl(
              'address',
              subscription.account.data.subscriptionPlanAccount.toBase58(),
            )}
            target="_blank"
            rel="noopener noreferrer noindex"
          >
            {shortAddress(
              subscription.account.data.subscriptionPlanAccount.toBase58(),
            )}
          </ExplorerA>
        </td>
        <td title={dayjs(date).format('LLL')}>{dayjs().to(date)}</td>
        <td>{subscription.account.data.maxAmount.toNumber()}</td>
        <td>{subscription.account.data.subscriptionTimeframe.toNumber()}</td>
        <td>
          <Button primary disabled={true}>Revoke</Button>
        </td>
      </tr>
    );
  };

  return (
    <Layout type="user">
      <Header>
        <Title>Subscriptions</Title>
      </Header>
      <Description>
        These are subscriptions that users can subscribed to.
      </Description>
      <Table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Subscription Plan</th>
            <th>Cycle start</th>
            <th>Price</th>
            <th>Interval</th>
            <th>Revoke</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => renderTr(subscription))}
        </tbody>
        {isLoading ? (
          <tfoot>
            <tr>
              <td colSpan={6}>
                <Loader />
              </td>
            </tr>
          </tfoot>
        ) : null}
      </Table>
    </Layout>
  );
};
