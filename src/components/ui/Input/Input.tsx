import React, { FC, InputHTMLAttributes } from 'react';

import { styled } from '@linaria/react';

const Wrapper = styled.div`
  display: flex;

  background-color: rgb(255, 255, 255);
  border: 1px rgb(209, 218, 230);
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgb(209 218 230);
  transition: box-shadow 200ms cubic-bezier(0.64, 0, 0.35, 1) 0s;
`;

const InputStyled = styled.input`
  width: 100%;
  height: 38px;
  padding: 7px 12px 9px;

  color: rgb(34, 57, 84);
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #96a3b3;
  }
`;

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <Wrapper>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <InputStyled {...props} />
    </Wrapper>
  );
};
