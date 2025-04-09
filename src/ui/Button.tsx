import React from 'react';
import styled from '@emotion/styled';
import theme from './theme/theme';

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';

// Button sizes
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${theme.borderRadius.default};
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  gap: ${theme.spacing[2]};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus {
    outline: none;
  }
  
  /* Variant styles */
  ${props => {
    const variant = props.variant || 'primary';
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary.main};
          color: ${theme.colors.primary.contrastText};
          &:hover {
            background-color: ${theme.colors.primary.dark};
          }
          &:focus {
            box-shadow: 0 0 0 2px ${theme.colors.primary.light};
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary.main};
          color: ${theme.colors.secondary.contrastText};
          &:hover {
            background-color: ${theme.colors.secondary.dark};
          }
          &:focus {
            box-shadow: 0 0 0 2px ${theme.colors.secondary.light};
          }
        `;
      case 'outlined':
        return `
          background-color: transparent;
          color: ${theme.colors.primary.main};
          border: 1px solid ${theme.colors.primary.main};
          &:hover {
            background-color: ${theme.colors.neutral.gray[50]};
          }
          &:focus {
            box-shadow: 0 0 0 2px ${theme.colors.primary.light};
          }
        `;
      case 'text':
        return `
          background-color: transparent;
          color: ${theme.colors.primary.main};
          &:hover {
            background-color: ${theme.colors.neutral.gray[50]};
          }
          &:focus {
            background-color: ${theme.colors.neutral.gray[100]};
          }
        `;
      default:
        return '';
    }
  }}
  
  /* Size styles */
  ${props => {
    const size = props.size || 'medium';
    switch (size) {
      case 'small':
        return `
          padding: ${theme.spacing[1]} ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.xs};
        `;
      case 'medium':
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'large':
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.base};
        `;
      default:
        return '';
    }
  }}
`;

const ButtonLoader = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.7s linear infinite;
  margin-right: ${theme.spacing[2]};
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  isLoading = false,
  disabled = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <ButtonLoader />}
      {!isLoading && startIcon && <span>{startIcon}</span>}
      {children}
      {!isLoading && endIcon && <span>{endIcon}</span>}
    </StyledButton>
  );
};

export default Button; 