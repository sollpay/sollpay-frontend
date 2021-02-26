import React, { FC } from 'react';

import { styled } from '@linaria/react';
import { IoCloseOutline } from 'react-icons/io5';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 432px;

  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 1px 0 rgb(19 45 74 / 24%), 0 24px 24px 0 rgb(19 45 74 / 4%),
    0 2px 2px 0 rgb(19 45 74 / 4%), 0 4px 4px 0 rgb(19 45 74 / 4%),
    0 8px 8px 0 rgb(19 45 74 / 4%), 0 16px 16px 0 rgb(19 45 74 / 4%);
`;

const Header = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  padding: 20px;

  border-bottom: 1px solid #f0f3f7;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

const CloseWrapper = styled.div`
  position: absolute;
  right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;
`;

interface Props {
  title: string;
  close?: () => void;
}

export const Modal: FC<Props> = ({ title, close, children }) => {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        {close ? (
          <CloseWrapper onClick={close}>
            <IoCloseOutline size={26} />
          </CloseWrapper>
        ) : null}
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  );
};
