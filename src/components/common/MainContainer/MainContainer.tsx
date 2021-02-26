import React, { FC } from 'react';

import { styled } from '@linaria/react';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

interface Props {}

export const MainContainer: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
