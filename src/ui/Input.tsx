import styled from "@emotion/styled";
import { theme } from "./theme/theme";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasIcon?: boolean;
}

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

export const Input = ({ hasIcon = false, ...props }: InputProps) => {
  return <StyledInput hasIcon={hasIcon} {...props} />;
};