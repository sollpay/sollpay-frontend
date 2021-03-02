import React, { FC } from 'react';

import { styled } from '@linaria/react';
import { Link } from 'react-router-dom';
import { Header } from 'components/common/Header';
import { Card } from 'components/common/Card';
import leftImg from './left.png';
import rightImg from './right.png';

const Wrapper = styled.div`
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  margin: 48px auto 0;
`;

const CardStyled = styled(Card)`
  display: flex;

  width: 800px;
  min-height: 400px;
`;

const ColumnLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  &:hover {
  }
`;

const LeftColumnLink = styled(ColumnLink)``;

const LeftPic = styled.div`
  width: 194px;
  height: 200px;

  background: url('${leftImg}') no-repeat 50% 50%;
  background-size: 194px 200px;
`;

const Delimiter = styled.div`
  width: 1px;

  background: #eaeaea;
`;

const RightColumnLink = styled(ColumnLink)``;

const RightPic = styled.div`
  width: 209px;
  height: 200px;

  background: url('${rightImg}') no-repeat 50% 50%;
  background-size: 209px 200px;
`;

const Title = styled.div`
  margin-top: 24px;

  color: #000;
  font-size: 24px;
  letter-spacing: -0.47px;
  font-weight: 600;
  line-height: 1.5;
`;

const Description = styled.div`
  margin: 24px 0;
  color: #666;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
`;

export const Select: FC = () => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <CardStyled>
          <LeftColumnLink to="/user">
            <LeftPic />
            <Title>User</Title>
            <Description>Manage your subscriptions</Description>
          </LeftColumnLink>
          <Delimiter />
          <RightColumnLink to="/customer">
            <RightPic />
            <Title>Customer</Title>
            <Description>Manage your subscribers</Description>
          </RightColumnLink>
        </CardStyled>
      </Container>
    </Wrapper>
  );
};
