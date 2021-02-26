import React, { FC, useMemo } from 'react';

import { styled } from '@linaria/react';
import { useGate, useStore } from 'effector-react';
import { PublicKey } from '@solana/web3.js';

import classNames from 'classnames';
import { Button } from 'components/ui/Button';
import { createSubscriptionFx } from 'models/connection';
import { connectFx } from 'models/wallet';
import { Card } from '../Card';
import { $store, SubscribeGate } from './model';
import rocketImg from './rocket.png';
import bgImg from './bg.png';

const WrapperCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 230px;

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

  &.isLoading {
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

interface Props {
  planAddress: string;
}

export const Subscribe: FC<Props> = ({ planAddress }) => {
  useGate(SubscribeGate, { planAddress: new PublicKey(planAddress) });
  const { connected, subscriptionPlan, tokens, isLoading, isSubscribing } = useStore($store);

  const token = useMemo(
    () =>
      tokens.find(
        (token) =>
          token.mintAddress === subscriptionPlan?.data.tokenMint.toBase58(),
      ),
    [tokens, subscriptionPlan],
  );

  const handleSubscribeClick = async () => {
    if (!subscriptionPlan) {
      return;
    }

    if (!connected) {
      await connectFx();
    }

    // TODO: !!!
    createSubscriptionFx({
      subscriptionPlanAddress: new PublicKey(planAddress),
      tokenAddress: subscriptionPlan.data.tokenMint,
      subscriptionTimeframe: subscriptionPlan.data.subscriptionTimeframe.toNumber(),
      maxAmount: subscriptionPlan.data.maxAmount.toNumber(),
    });
  };

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

  const renderButtonText = () => {
    if (isLoading) {
      return 'Loading...';
    }
    if (isSubscribing) {
      return 'Subscribing...';
    }
    if (connected) {
      return 'Subscribe';
    }
    return 'Connect and Subscribe';
  };

  const isDisabled = !subscriptionPlan && isLoading && isSubscribing;

  return (
    <WrapperCard>
      <Title>Payment</Title>
      <Rocket className={classNames({ isLoading })} />
      <Group className={classNames({ isDisabled })}>
        {subscriptionPlan ? (
          <>
            <Price>
              {subscriptionPlan.data.maxAmount.toNumber()}{' '}
              {token?.tokenSymbol || subscriptionPlan.data.tokenMint.toBase58()}{' '}
            </Price>
            {renderSubscriptionTimeframe(
              subscriptionPlan.data.subscriptionTimeframe.toNumber(),
            )}
          </>
        ) : null}
      </Group>
      <SubscribeButton onClick={handleSubscribeClick} disabled={isDisabled}>
        {renderButtonText()}
      </SubscribeButton>
    </WrapperCard>
  );
};
