import React, { FC } from 'react';

import { styled } from '@linaria/react';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavLinkMenu = styled(NavLink)`
  display: flex;
  align-items: center;

  height: 40px;
  padding: 8px 0;

  color: #666;
  text-decoration: none;

  border-radius: 8px;
  transition: color 0.2s ease;

  &:hover {
    color: #000;
  }

  &.active {
    color: #000;
    font-weight: 700;
  }

  &:not(:last-child) {
    margin-bottom: 2px;
  }
`;

const NavLinkText = styled.span`
  font-size: 14px;
`;

export const LeftNavMenu: FC = () => {
  return (
    <Wrapper>
      <NavLinkMenu to="/plans">
        <NavLinkText>Plans</NavLinkText>
      </NavLinkMenu>
      <NavLinkMenu to="/subscriptions">
        <NavLinkText>Subscriptions</NavLinkText>
      </NavLinkMenu>
    </Wrapper>
  );
};
