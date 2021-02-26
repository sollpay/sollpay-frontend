import React, { ButtonHTMLAttributes, FC } from 'react';

import { styled } from '@linaria/react';

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 8px 11px;

  background-color: rgb(15, 111, 222);
  border-radius: 5px;
  box-shadow: rgb(19 45 74 / 12%) 0 0 0 0, rgb(0 0 0 / 20%) 0 2px 4px -2px;
  transition: opacity 200ms linear 0s, background-color 200ms linear 0s,
    box-shadow 200ms linear 0s;

  outline: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ButtonText = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  transition: color 200ms linear 0s;
`;

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonStyled {...props}>
      <ButtonText>{children}</ButtonText>
    </ButtonStyled>
  );
};
