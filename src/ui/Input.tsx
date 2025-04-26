import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// Props Interface
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasIcon?: boolean;
}

// Styled Component
const StyledInput = styled.input<{ hasIcon: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  padding-left: ${({ hasIcon, theme }) => (hasIcon ? theme.spacing[8] : theme.spacing[3])};
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  background: ${({ theme }) => theme.colors.background.secondary};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// Input Component
export const Input: React.FC<InputProps> = ({ hasIcon = false, ...props }) => {
  const theme = useTheme(); // Access the theme

  return <StyledInput hasIcon={hasIcon} theme={theme} {...props} />;
};