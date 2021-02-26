import React, { FC } from 'react';

import { styled } from '@linaria/react';

const Wrapper = styled.div`
  @keyframes origamiA {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes origamiB {
    from,
    25%,
    50%,
    75%,
    to {
      opacity: 1;
      transform: translateZ(0) rotateX(0deg);
    }
    12.5%,
    62.5% {
      opacity: 1;
      transform: translateZ(1px) rotateX(-180deg);
    }
    37.5%,
    87.5% {
      opacity: 0;
      transform: translateZ(0) rotateX(0deg);
    }
  }
  @keyframes origamiC {
    from,
    25%,
    50%,
    75%,
    to {
      opacity: 1;
      transform: translateZ(0) rotateZ(180deg) rotateX(0deg);
    }
    12.5%,
    62.5% {
      opacity: 0;
      transform: translateZ(0) rotateZ(180deg) rotateX(0deg);
    }
    37.5%,
    87.5% {
      opacity: 1;
      transform: translateZ(1px) rotateZ(180deg) rotateX(-180deg);
    }
  }

  &,
  &:before,
  &:after {
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  & {
    margin: 0 auto;
    position: relative;
    width: 25px;
    height: 25px;
  }

  &:before,
  &:after {
    background: #0f6fde;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    transform-origin: 50% 100%;
    clip-path: polygon(0 0, 100% 0, 50% 100%);
  }

  animation-name: origamiA;
  animation-timing-function: steps(4);

  &:before,
  &:after {
    clip-path: polygon(50% 0, 100% 100%, 0% 100%);
  }

  &:before {
    animation-name: origamiB;
  }

  &:after {
    animation-name: origamiC;
    transform: rotate(180deg);
  }
`;

interface Props {}

export const Loader: FC<Props> = (props) => {
  return <Wrapper />;
};
