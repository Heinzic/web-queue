import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { theme } from './theme/theme';
import { Input } from './Input';
export interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  marginBottom?: keyof typeof theme.spacing;
  showIcon?: boolean;
  iconPath?: string;
}

const Container = styled.div<{ marginBottom: keyof typeof theme.spacing }>`
  margin-bottom: ${props => theme.spacing[props.marginBottom]};
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIconContainer = styled.span`
  position: absolute;
  left: ${theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.neutral.gray[500]};
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled.img`
  width: 16px;
  height: 16px;
  opacity: 0.7;
`;

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Поиск",
  className,
  marginBottom = 4,
  showIcon = true,
  iconPath = "/searchIcon.png",
}) => {
  return (
    <Container className={className} marginBottom={marginBottom}>
      <InputWrapper>
        {showIcon && (
          <SearchIconContainer>
            <SearchIcon src={iconPath} alt="Search" />
          </SearchIconContainer>
        )}
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          hasIcon={showIcon}
        />
      </InputWrapper>
    </Container>
  );
};
