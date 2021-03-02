import React, { FC, useEffect, useState } from 'react';

import { styled } from '@linaria/react';
import { useParams } from 'react-router-dom';
import { PublicKey } from '@solana/web3.js';
import { Header } from 'components/common/Header';
import { Subscribe } from 'components/common/Subscribe';

const Wrapper = styled.div`
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  margin: 48px auto 0;
`;

export const SubscribePage: FC = () => {
  const { planAddress } = useParams<{
    planAddress: string;
  }>();
  const [isPlanAddressValid, setIsPlanAddressValid] = useState(false);

  useEffect(() => {
    // TODO: check better validation pubkey method
    try {
      new PublicKey(planAddress);
      setIsPlanAddressValid(true);
    } catch {}
  }, []);

  return (
    <Wrapper>
      <Header />
      <Container>
        {isPlanAddressValid ? <Subscribe planAddress={planAddress} /> : 'Invalid plan address'}
      </Container>
    </Wrapper>
  );
};
