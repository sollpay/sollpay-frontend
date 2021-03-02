import { styled } from '@linaria/react';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  height: 38px;
`;

export const Title = styled.h3`
  color: #000;
  font-size: 24px;
  letter-spacing: -0.47px;
  font-weight: 600;
  line-height: 1.5;
`;

export const Description = styled.p`
  margin: 24px 0;

  color: #666;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
`;

export const ExplorerA = styled.a`
  color: #666;
  text-decoration: none;

  transition: color 0.1s ease;

  &:hover {
    color: #000;
  }
`;
