import React, { FC } from 'react';

import { styled } from '@linaria/react';
import { useGate, useStore } from 'effector-react';
import { PublicKeyAndAccount } from '@solana/web3.js';
import { openModalFx } from 'models/modals';
import { MODAL_PLAN } from 'components/common/ModalManager/constants';
import { Layout } from 'components/common/Layout';
import { Button } from 'components/ui/Button';
import { shortAddress } from 'utils/common';
import { getExplorerUrl } from 'utils/connection';
import { Loader } from 'components/common/Loader';
import { $tokens } from 'models/wallet';
import { ISubscriptionPlanRecord } from '../../models/connection/types';
import { $isLoading, $plans, PlansGate } from './model';

const Wrapper = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h3`
  color: #000;
  font-size: 24px;
  letter-spacing: -0.47px;
  font-weight: 600;
  line-height: 1.5;
`;

const Description = styled.p`
  margin: 24px 0;

  color: #666;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
`;

const Table = styled.table`
  width: 100%;

  border-spacing: 0;

  & > thead > tr {
    height: 40px;

    th:first-child {
      border-radius: 5px 0 0 5px;
      border-left: 1px solid #eaeaea;
    }

    th {
      position: relative;

      padding: 0 12px;

      color: #666;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0;
      text-transform: uppercase;
      text-align: left;

      background: #fafafa;
      border-top: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;

      vertical-align: middle;
    }

    th:last-child {
      border-radius: 0 5px 5px 0;
      border-right: 1px solid #eaeaea;
    }
  }

  & > tbody > tr {
      height: 48px;
    
      font-size: 14px;

      td {
        padding: 8px 12px;
        vertical-align: middle;
        color: #444;
      }

      &:not(:last-of-type) td {
        border-bottom: 1px solid #eaeaea;
      }
    }
  }

  & > tfoot > tr {
    height: 48px;
  }
`;

const ExplorerA = styled.a`
  color: #666;
  text-decoration: none;

  transition: color 0.1s ease;

  &:hover {
    color: #000;
  }
`;

export const Plans: FC = () => {
  useGate(PlansGate);
  const plans = useStore($plans);
  const isLoading = useStore($isLoading);
  const tokens = useStore($tokens);

  const handleShowPlanModalClick = () => {
    openModalFx({ modalType: MODAL_PLAN });
  };

  const renderTr = (plan: PublicKeyAndAccount<ISubscriptionPlanRecord>) => {
    const token = tokens.find(
      (token) => token.mintAddress === plan.account.data.tokenMint.toBase58(),
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
              plan.account.data.tokenMint.toBase58(),
            )}
            target="_blank"
            rel="noopener noreferrer noindex"
          >
            {token?.tokenSymbol ||
              shortAddress(plan.account.data.tokenMint.toBase58())}
          </ExplorerA>
        </td>
        <td>{plan.account.data.maxAmount.toNumber()}</td>
        <td>{plan.account.data.subscriptionTimeframe.toNumber()}</td>
      </tr>
    );
  };

  return (
    <Layout>
      {/*<Card>*/}
      <Header>
        <Title>Plans</Title>
        <Button onClick={handleShowPlanModalClick}>Create plan</Button>
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
      {/*</Card>*/}
    </Layout>
  );
};
