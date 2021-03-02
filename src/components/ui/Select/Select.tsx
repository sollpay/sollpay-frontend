import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { styled } from '@linaria/react';
import classNames from 'classnames';

import { HiOutlineSelector } from 'react-icons/hi';

const Wrapper = styled.div`
  position: relative;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 38px;
  padding: 0 5px 0 11px;

  font-size: 14px;
  font-weight: 400;
  text-align: left;

  background: #fff;
  border: 1px rgba(19, 45, 74, 0.12);
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgb(19 45 74 / 12%), 0 2px 4px -2px rgb(0 0 0 / 20%);
  transition: box-shadow 200ms cubic-bezier(0.64, 0, 0.35, 1) 0s;
  outline: none;

  &:hover {
    box-shadow: 0 0 0 1px rgb(19 45 74 / 12%), 0 3px 6px -2px rgb(0 0 0 / 20%);
  }
`;

const Value = styled.div`
  width: 100%;
  margin-right: 2px;

  color: #364a61;
`;

const Placeholder = styled(Value)`
  color: #96a3b3;
`;

const SelectListContainer = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;

  min-width: 100%;
  margin-top: 8px;

  background: #fff;
  border: 1px rgba(19, 45, 74, 0.12);
  border-radius: 5px;
  box-shadow: rgba(19, 45, 74, 0.12) 0 0 0 1px,
    rgba(0, 0, 0, 0.14) 0 7px 14px -4px;
`;

const SelectList = styled.div`
  display: flex;
  flex-direction: column;

  padding: 6px 0;
  max-height: 288px;

  overflow-y: auto;
`;

const SelectOptionText = styled.span`
  color: #364a61;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.36px;
  white-space: nowrap;
`;

const SelectOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  min-height: 36px;
  padding: 0 11px;

  cursor: pointer;

  &:hover {
    background: #f7f9fc;
  }

  &.isSelected {
    background: #f7f9fc;

    ${SelectOptionText} {
      font-weight: 500;
    }
  }
`;

export type SelectValueType = string | number;

interface Props {
  placeholder: string;
  selected?: SelectValueType;
  items: { title?: string; value: SelectValueType }[];
  onChange: (nextValue: SelectValueType) => void;
}

export const Select: FC<Props> = ({
  placeholder,
  selected,
  items,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);
  const selectListRef = useRef<HTMLDivElement>(null);

  const handleAwayClick = (e: MouseEvent) => {
    if (
      !selectRef.current?.contains(e.target as HTMLButtonElement) &&
      !selectListRef.current?.contains(e.target as HTMLDivElement)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleAwayClick);

    return () => {
      window.removeEventListener('click', handleAwayClick);
    };
  }, []);

  const selectedItem = useMemo(
    () => items.find((item) => item.value === selected),
    [selected, items],
  );

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (nextValue: SelectValueType) => () => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <SelectButton ref={selectRef} onClick={handleSelectClick}>
        {selectedItem ? (
          <Value>{selectedItem.title || selectedItem.value}</Value>
        ) : (
          <Placeholder>{placeholder}</Placeholder>
        )}{' '}
        <HiOutlineSelector size={20} color="#96A3B3" />
      </SelectButton>
      {isOpen ? (
        <SelectListContainer ref={selectListRef}>
          <SelectList role="listbox">
            {items.map(({ title, value }) => (
              <SelectOption
                key={value || title}
                role="option"
                onClick={handleOptionClick(value)}
                className={classNames({ isSelected: value === selected })}
              >
                <SelectOptionText title={title || String(value)}>
                  {title || value}
                </SelectOptionText>
              </SelectOption>
            ))}
          </SelectList>
        </SelectListContainer>
      ) : null}
    </Wrapper>
  );
};
