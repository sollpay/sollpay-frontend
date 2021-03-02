import React, { FC, useMemo } from 'react';

import { styled } from '@linaria/react';
import { useGate, useStore } from 'effector-react';
import { PublicKey } from '@solana/web3.js';

import classNames from 'classnames';
import { Button } from 'components/ui/Button';
import { createSubscriptionFx } from 'models/connection';
import { connectFx } from 'models/wallet';
import { shortAddress } from 'utils/common';
import { Card } from '../Card';
import { $store, SubscribeGate } from './model';
import rocketImg from './rocket.png';
import bgImg from './bg.png';

const WrapperCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 230px;

  background-image: url('${bgImg}');
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: contain;
`;

const Title = styled.div`
  //margin-bottom: 20px;

  color: #000;
  font-size: 24px;
  letter-spacing: -0.47px;
  font-weight: 600;
  line-height: 1.5;
`;

const Rocket = styled.div`
  @keyframes fly {
    0% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(5deg);
    }
  }

  width: 50px;
  height: 60px;
  margin: 10px;

  background: url('${rocketImg}') no-repeat 50% 50%;
  background-size: 50px 60px;

  &.isFetching {
    animation: fly 0.5s linear infinite;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  padding: 0 12px;

  color: #666;
  font-size: 14px;
  font-weight: 400;

  background: #fafafa;
  border-radius: 5px;
  border: 1px solid #eaeaea;

  &.isDisabled {
    visibility: hidden;
  }
`;

const Price = styled.div`
  margin-right: 10px;

  font-weight: 600;
`;

const SubscribeButton = styled(Button)`
  margin-top: 20px;

  width: 100%;
`;

const renderSubscriptionTimeframe = (subscriptionTimeframe: number) => {
  switch (subscriptionTimeframe) {
    case 1:
      return 'daily';
    case 7:
      return 'weekly';
    case 30:
      return 'monthly';
    case 365:
      return 'yearly';
    default:
      return subscriptionTimeframe;
  }
};

interface Props {
  planAddress: string;
}

// TODO: make less compexity
// eslint-disable-next-line sonarjs/cognitive-complexity
export const Subscribe: FC<Props> = ({ planAddress }) => {
  useGate(SubscribeGate, { planAddress: new PublicKey(planAddress) });
  const {
    connected,
    subscriptionPlan,
    availableTokens,
    tokenAccounts,
    isLoadingPlan,
    isLoadingTokenAccounts,
    isSubscribing,
    isFetching,
  } = useStore($store);

  const tokenMeta = useMemo(
    () =>
      availableTokens.find(
        (token) =>
          token.mintAddress === subscriptionPlan?.data.token.toBase58(),
      ),
    [availableTokens, subscriptionPlan],
  );

  const tokenAccount = useMemo(() => {
    if (tokenAccounts.length === 0) {
      return null;
    }

    return tokenAccounts.sort(
      (a, b) =>
        a.account.data.parsed.info.tokenAmount.uiAmount -
        b.account.data.parsed.info.tokenAmount.uiAmount,
    )[0];
  }, [tokenAccounts]);

  const handleSubscribeClick = async () => {
    if (!subscriptionPlan) {
      return;
    }

    if (!connected) {
      await connectFx();
    }

    if (!tokenAccount) {
      return;
    }

    await createSubscriptionFx({
      subscriptionPlanAccount: new PublicKey(planAddress),
      tokenAccount: tokenAccount.pubkey,
      authority: subscriptionPlan.data.authority,
      subscriptionTimeframe: subscriptionPlan.data.subscriptionTimeframe.toNumber(),
      maxAmount: subscriptionPlan.data.maxAmount.toNumber(),
    });
  };

  const renderButtonText = () => {
    if (isLoadingPlan) {
      return 'Loading plan...';
    }
    if (isLoadingTokenAccounts) {
      return 'Loading tokens...';
    }
    if (isSubscribing) {
      return 'Subscribing...';
    }
    if (connected) {
      return 'Subscribe';
    }
    return 'Connect';
  };

  const renderSubscriptionPlan = () => {
    if (!subscriptionPlan) {
      return null;
    }

    if (!tokenAccount && connected) {
      return (
        <>
          You don't have{' '}
          {tokenMeta?.tokenSymbol ||
            shortAddress(subscriptionPlan.data.token.toBase58())}
        </>
      );
    }

    return (
      <>
        <Price>
          {subscriptionPlan.data.maxAmount.toNumber()}{' '}
          {tokenMeta?.tokenSymbol || subscriptionPlan.data.token.toBase58()}{' '}
        </Price>
        {renderSubscriptionTimeframe(
          subscriptionPlan.data.subscriptionTimeframe.toNumber(),
        )}
      </>
    );
  };

  const isDisabled = !subscriptionPlan || isFetching;

  return (
    <WrapperCard>
      <Title>Payment</Title>
      <Rocket className={classNames({ isFetching })} />
      <Group className={classNames({ isDisabled })}>
        {renderSubscriptionPlan()}
      </Group>
      <SubscribeButton primary onClick={handleSubscribeClick} disabled={isDisabled}>
        {renderButtonText()}
      </SubscribeButton>
    </WrapperCard>
  );
};
