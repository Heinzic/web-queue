import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// Props Interface
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasIcon?: boolean;
}

// Styled Component
const StyledTextArea = styled.textarea<{ hasIcon: boolean }>`
  max-width: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  padding-left: ${({ hasIcon, theme }) => (hasIcon ? theme.spacing[8] : theme.spacing[3])};
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  background-color: white;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// Input Component
export const TextArea: React.FC<TextAreaProps> = ({ hasIcon = false, ...props }) => {
  const theme = useTheme();

  return <StyledTextArea hasIcon={hasIcon} theme={theme} {...props} />;
};