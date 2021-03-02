import React, { ButtonHTMLAttributes, FC } from 'react';

import { styled } from '@linaria/react';
import classNames from 'classnames';

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 8px 11px;

  font-size: 14px;
  font-weight: 500;
  line-height: 22px;

  border-radius: 5px;
  transition: opacity 200ms linear 0s, background-color 200ms linear 0s,
    box-shadow 200ms linear 0s, color 200ms linear 0s;

  outline: 0;
  cursor: pointer;

  &.primary {
    color: #fff;

    background-color: rgb(15, 111, 222);
    box-shadow: rgb(19 45 74 / 12%) 0 0 0 0, rgb(0 0 0 / 20%) 0 2px 4px -2px;
  }

  &.hollow {
    color: #696969;

    background: #fff;
  }

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 1;
    background: #a3a5ba;
    cursor: not-allowed;
  }
`;

interface Props {
  primary?: boolean;
  hollow?: boolean;
}

export const Button: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  primary,
  hollow,
  disabled,
  onClick,
  children,
  className,
}) => {
  return (
    <ButtonStyled
      disabled={disabled}
      className={classNames(className, { primary, hollow })}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  );
};
