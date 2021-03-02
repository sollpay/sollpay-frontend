import React, { FC } from 'react';

import { useGate, useStore } from 'effector-react';
import { PublicKeyAndAccount } from '@solana/web3.js';
import { openModalFx } from 'models/modals';
import { MODAL_PLAN } from 'components/common/ModalManager/constants';
import { Layout } from 'components/common/Layout';
import { Button } from 'components/ui/Button';
import { shortAddress } from 'utils/common';
import { getExplorerUrl } from 'utils/connection';
import { Loader } from 'components/common/Loader';
import { $availableTokens } from 'models/wallet';
import { ISubscriptionPlanRecord } from '../../../models/connection/types';
import { $isLoading, $plans, PlansGate } from './model';
import { Table } from 'components/common/Table';
import {Description, ExplorerA, Header, Title } from '../common.styled';

export const Plans: FC = () => {
  useGate(PlansGate);
  const plans = useStore($plans);
  const isLoading = useStore($isLoading);
  const availableTokens = useStore($availableTokens);

  const handleShowPlanModalClick = () => {
    openModalFx({ modalType: MODAL_PLAN });
  };

  const renderTr = (plan: PublicKeyAndAccount<ISubscriptionPlanRecord>) => {
    const token = availableTokens.find(
      (token) => token.mintAddress === plan.account.data.token.toBase58(),
    );

    return (
      <tr key={plan.pubkey.toBase58()}>
        <td>
          <ExplorerA
            href={getExplorerUrl('address', plan.pubkey.toBase58())}
            target="_blank"
            rel="noopener noreferrer noindex"
          >
            {shortAddress(plan.pubkey.toBase58())}
          </ExplorerA>
        </td>
        <td>
          <ExplorerA
            href={getExplorerUrl(
              'address',
              plan.account.data.token.toBase58(),
            )}
            target="_blank"
            rel="noopener noreferrer noindex"
          >
            {token?.tokenSymbol ||
              shortAddress(plan.account.data.token.toBase58())}
          </ExplorerA>
        </td>
        <td>{plan.account.data.maxAmount.toNumber()}</td>
        <td>{plan.account.data.subscriptionTimeframe.toNumber()}</td>
      </tr>
    );
  };

  return (
    <Layout type="customer">
      <Header>
        <Title>Plans</Title>
        <Button primary onClick={handleShowPlanModalClick}>Create plan</Button>
      </Header>
      <Description>
        These are subscription plans that users can subscribe to.
      </Description>
      <Table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Token</th>
            <th>Price</th>
            <th>Interval</th>
          </tr>
        </thead>
        <tbody>{plans.map((plan) => renderTr(plan))}</tbody>
        {isLoading ? (
          <tfoot>
            <tr>
              <td colSpan={4}>
                <Loader />
              </td>
            </tr>
          </tfoot>
        ) : null}
      </Table>
    </Layout>
  );
};
