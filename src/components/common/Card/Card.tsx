import React, { FC, HTMLAttributes } from 'react';

import { styled } from '@linaria/react';

const Wrapper = styled.div`
  padding: 20px;

  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
`;

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  style,
  className,
}) => {
  return (
    <Wrapper style={style} className={className}>
      {children}
    </Wrapper>
  );
};
