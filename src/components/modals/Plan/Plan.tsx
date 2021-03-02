import React, { FC, useMemo, useState } from 'react';

import { styled } from '@linaria/react';
import { useStore } from 'effector-react';
import { PublicKey } from '@solana/web3.js';
import { Modal } from 'components/common/Modal';
import { Input } from 'components/ui/Input';
import { SelectValueType, Select } from 'components/ui/Select';
import { Button } from 'components/ui/Button';
import { $availableTokens } from 'models/wallet';
import { createSubscriptionPlanFx } from 'models/connection';
import { Loader } from 'components/common/Loader';
import { $store } from './model';

const FormRow = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 32px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  margin-bottom: 16px;
`;

const Label = styled.label`
  margin-bottom: 6px;

  color: #042040;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 4px;
`;

interface Props {
  close: () => void;
}

export const Plan: FC<Props> = ({ close }) => {
  const [selectedToken, setSelectedToken] = useState<SelectValueType>();
  const [
    selectedSubscriptionTimeframe,
    setSelectedSubscriptionTimeframe,
  ] = useState<SelectValueType>();
  const [maxAmount, setMaxAmount] = useState<string>();
  const availableTokens = useStore($availableTokens);
  const { isLoading } = useStore($store);

  const itemsTokens = useMemo(
    () =>
      availableTokens.map((token) => ({
        title: token.tokenSymbol,
        value: token.mintAddress,
      })),
    [availableTokens],
  );

  const handleTokenChange = (nextValue: SelectValueType) => {
    setSelectedToken(nextValue);
  };

  const handleSubscriptionTimeframeChange = (nextValue: SelectValueType) => {
    setSelectedSubscriptionTimeframe(nextValue);
  };

  const handleMaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxAmount = e.target.value;
    setMaxAmount(maxAmount);
  };

  const handleSubmit = async () => {
    await createSubscriptionPlanFx({
      token: new PublicKey(String(selectedToken)),
      maxAmount: Number(maxAmount),
      subscriptionTimeframe: Number(selectedSubscriptionTimeframe),
    });

    close();
  };

  return (
    <Modal title="Create new plan" close={close}>
      <FormRow>
        <FormGroup>
          <Label>Token</Label>
          <Select
            placeholder="Choose token"
            selected={selectedToken}
            items={itemsTokens}
            onChange={handleTokenChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Price</Label>
          <Input
            type="text"
            placeholder="0.1"
            onChange={handleMaxAmountChange}
          />
          {/* TODO: custom price */}
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Label>Interval</Label>
        <Select
          placeholder="Choose interval"
          selected={selectedSubscriptionTimeframe}
          items={[
            { title: 'Daily', value: 1 },
            { title: 'Weekly', value: 7 },
            { title: 'Monthly', value: 30 },
            { title: 'Yearly', value: 365 },
          ]}
          onChange={handleSubscriptionTimeframeChange}
        />
        {/* TODO: custom interval */}
      </FormGroup>

      <Footer>
        <Button primary onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Create Plan'}
        </Button>
      </Footer>
    </Modal>
  );
};
