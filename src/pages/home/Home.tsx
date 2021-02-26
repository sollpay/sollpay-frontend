import React from 'react';
import { useStore } from 'effector-react';
import { styled } from '@linaria/react';
import { $connected } from 'models/wallet';
import { Button } from 'components/ui/Button';
import { Header } from 'components/common/Layout/Header';
import { Subscribe } from 'components/common/Subscribe';
import { MainContainer } from '../../components/common/MainContainer';
import { connectAndCreateClicked } from './model';

const Wrapper = styled.div`
  min-height: 100%;
  padding-bottom: 50px;

  background: #fbfbfd;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  text-align: center;
`;

const Hero = styled.div`
  padding: 120px 0 30px;
`;

const Title = styled.h1`
  margin: 0 0 30px;

  color: #111;
  font-size: 90px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
`;

const Description = styled.h3`
  margin: 0 0 40px;

  color: #666;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const ButtonStyled = styled(Button)`
  height: 48px;
  padding: 0 56px;

  box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
`;

export const Home = () => {
  const connected = useStore($connected);

  return (
    <Wrapper>
      <Header showConnect />
      <MainContainer>
        <Container>
          <Hero>
            <Title>
              The Recurring Payments <br /> for Solana
            </Title>
            <Description>
              SollPay gives you the experience to accept recurring payments in
              wrapped tokens by 100% non-custodial way
            </Description>
            <ButtonStyled onClick={connectAndCreateClicked}>
              {connected ? 'Sign In' : 'Connect and Sign In'}
            </ButtonStyled>
          </Hero>
          <Subscribe planAddress="GzYqqyUunWi3aptLG3fatNAxWUhxSbLM3vNnkVL3snjn" />
        </Container>
      </MainContainer>
    </Wrapper>
  );
};
