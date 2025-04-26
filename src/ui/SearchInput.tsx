import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { spacing } from './theme/theme';
import { Input } from './Input';

// Props Interface
export interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  marginBottom?: keyof typeof spacing;
  showIcon?: boolean;
  iconPath?: string;
}

// Styled Components
const Container = styled.div<{ marginBottom: keyof typeof spacing }>`
  margin-bottom: ${({ marginBottom }) => spacing[marginBottom]};
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIconContainer = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.background.secondary};
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

// SearchInput Component
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Поиск",
  className,
  marginBottom = 4, // Default to '4' for spacing
  showIcon = true,
  iconPath = "/searchIcon.png",
}) => {
  const theme = useTheme(); // Access the theme

  return (
    <Container className={className} marginBottom={marginBottom}>
      <InputWrapper>
        {showIcon && (
          <SearchIconContainer theme={theme}>
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

export default SearchInput;