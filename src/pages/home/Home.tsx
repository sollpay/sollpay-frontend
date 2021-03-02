import React from 'react';
import { useStore } from 'effector-react';
import { styled } from '@linaria/react';
import { $connected } from 'models/wallet';
import { Button } from 'components/ui/Button';
import { Header } from 'components/common/Header';
import { Subscribe } from 'components/common/Subscribe';
import { MainContainer } from 'components/common/MainContainer';
import { connectAndCreateClicked } from './model';

const Wrapper = styled.div`
  min-height: 100%;
  padding-bottom: 50px;

  background: #fbfbfd;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 0 200px;
`;

const Hero = styled.div`
  padding: 120px 0 120px;

  text-align: center;
`;

const HeroTitle = styled.h1`
  margin: 0 0 30px;

  color: #111;
  font-size: 90px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
`;

const HeroDescription = styled.h3`
  margin: 0 0 40px;

  color: #666;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;

  & > :not(:last-child) {
    margin-right: 24px;
  }
`;

const ButtonStyled = styled(Button)`
  height: 48px;
  padding: 0 56px;
`;

const ConnectButton = styled(ButtonStyled)`
  box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
`;

const DocumentationButton = styled(ButtonStyled)`
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-bottom: 24px;

  color: #000;
  font-size: 24px;
  letter-spacing: -0.47px;
  font-weight: 600;
  line-height: 1.5;
`;

const SectionContent = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 24px;
`;

const SectionColumn = styled.div`
  display: flex;
  align-items: center;
`;

export const Home = () => {
  const connected = useStore($connected);

  return (
    <Wrapper>
      <Header showConnect />
      <MainContainer>
        <Container>
          <Hero>
            <HeroTitle>
              The Recurring Payments <br /> for Solana
            </HeroTitle>
            <HeroDescription>
              SollPay gives you the experience to accept recurring payments in
              wrapped tokens by 100% non-custodial way
            </HeroDescription>
            <ButtonsWrapper>
              <ConnectButton primary onClick={connectAndCreateClicked}>
                {connected ? 'Sign In' : 'Connect and Sign In'}
              </ConnectButton>
              <a href="#">
                <DocumentationButton hollow>Documentation</DocumentationButton>
              </a>
            </ButtonsWrapper>
          </Hero>

          <Section>
            <Title>Demo</Title>
            <SectionContent>
              <Subscribe planAddress="5eg3zjHtV7SkaxsHUJtxLeMDte2SFF1rV7ooGt4YwXSr" />
              <SectionColumn>
                <HeroDescription>
                  Make approve of transactions to an address every X days. You
                  can manage your subscriptions after Sign In.
                </HeroDescription>
              </SectionColumn>
            </SectionContent>
          </Section>
        </Container>
      </MainContainer>
    </Wrapper>
  );
};
