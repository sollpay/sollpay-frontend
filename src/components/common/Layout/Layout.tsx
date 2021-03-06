import React, { FC } from 'react';

import { styled } from '@linaria/react';
import { MainContainer } from '../MainContainer';
import { Header } from '../Header';
import { CustomerMenu } from './CustomerMenu';
import { UserMenu } from './UserMenu';

const Wrapper = styled.div`
  height: 100%;

  background: #fff;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 228px 1fr;
  grid-gap: 24px;

  margin-top: 48px;
`;

const Content = styled.div``;

interface Props {
  type: 'user' | 'customer';
}

export const Layout: FC<Props> = ({ type, children }) => {
  return (
    <Wrapper>
      <Header />
      <MainContainer>
        <Container>
          {type === 'customer' ? (
            <CustomerMenu />
          ) : (type === 'user' ? (
            <UserMenu />
          ) : null)}
          <Content>{children}</Content>
        </Container>
      </MainContainer>
    </Wrapper>
  );
};
