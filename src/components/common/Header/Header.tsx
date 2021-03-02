import React, { FC } from 'react';

import { styled } from '@linaria/react';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';
import { $cluster, $connected, changeCluster } from 'models/wallet';
import { Select, SelectValueType } from 'components/ui/Select';
import { Button } from 'components/ui/Button';
import { connectAndCreateClicked } from 'pages/home/model';
import { MainContainer } from '../MainContainer';
import { ExtendedCluster } from '../../../types/custom';
import logoImg from './logo.png';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  height: 64px;

  background: #fff;
  box-shadow: inset 0 -1px #eaeaea;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  width: 92px;
  height: 39px;

  background: url('${logoImg}') no-repeat 50% 50%;
  background-size: 92px 39px;
`;

const Right = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 16px;
  }
`;

interface Props {
  showConnect?: boolean;
}

export const Header: FC<Props> = ({ showConnect }) => {
  const cluster = useStore($cluster);
  const connected = useStore($connected);

  const handleClusterChange = (cluster: SelectValueType) => {
    changeCluster(cluster as ExtendedCluster);
  };

  return (
    <Wrapper>
      <MainContainer>
        <Container>
          <Link to="/">
            <Logo />
          </Link>
          <Right>
            <Select
              placeholder="Choose network"
              selected={cluster}
              items={[
                { value: 'mainnet-beta' },
                { value: 'testnet' },
                { value: 'devnet' },
                { value: 'localnet' },
              ]}
              onChange={handleClusterChange}
            />
            {showConnect ? (
              <Button primary onClick={connectAndCreateClicked}>
                {!connected ? 'Connect' : 'Sign In'}
              </Button>
            ) : null}
          </Right>
        </Container>
      </MainContainer>
    </Wrapper>
  );
};
