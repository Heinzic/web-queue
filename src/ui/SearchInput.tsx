import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import theme from './theme/theme';

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

const StyledInput = styled.input<{ hasIcon: boolean }>`
  width: 100%;
  padding: ${theme.spacing[3]};
  padding-left: ${props => props.hasIcon ? theme.spacing[8] : theme.spacing[3]};
  border: 1px solid ${theme.colors.neutral.gray[200]};
  border-radius: ${theme.borderRadius.xl};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.base};
  background-color: white;
  outline: none;
  
  &:focus {
    border-color: ${theme.colors.primary.main};
  }
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

const SearchInput: React.FC<SearchInputProps> = ({
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
        <StyledInput
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

export default SearchInput; 