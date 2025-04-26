import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Theme } from './theme/theme';
import { useTheme } from '@emotion/react';

// Types
export type CardSize = 'small' | 'medium' | 'large';
export type CardVariant = 'default' | 'outlined' | 'elevated';

interface CardBaseProps {
  size?: CardSize;
  variant?: CardVariant;
  className?: string;
  backgroundColor?: string;
  withArrow?: boolean;
}

export interface CardProps extends CardBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, keyof CardBaseProps> {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface CardLinkProps extends CardBaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CardBaseProps> {
  to: string;
}

// Helper functions with theme parameter
const getCardPadding = (theme: Theme, size: CardSize) => {
  switch (size) {
    case 'small':
      return `${theme.spacing[3]} ${theme.spacing[3]}`;
    case 'medium':
      return `${theme.spacing[5]} ${theme.spacing[4]}`;
    case 'large':
      return `${theme.spacing[6]} ${theme.spacing[5]}`;
    default:
      return `${theme.spacing[5]} ${theme.spacing[4]}`;
  }
};

const getCardStyles = (theme: Theme, variant: CardVariant) => {
  switch (variant) {
    case 'outlined':
      return `
        border: 1px solid ${theme.colors.neutral.gray[200]};
        box-shadow: none;
      `;
    case 'elevated':
      return `
        box-shadow: ${theme.shadows.md};
      `;
    case 'default':
    default:
      return `
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      `;
  }
};

// Styled components
interface StyledCardProps extends CardBaseProps {
  theme: Theme;
}

const BaseCardStyles = styled.div<StyledCardProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme, size = 'medium' }) => getCardPadding(theme, size)};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  ${({ theme, variant = 'default' }) => getCardStyles(theme, variant)};
  margin: ${({ theme }) => theme.spacing[2]};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.gray[50]};
  }
`;

const StyledCard = styled(BaseCardStyles)`
  cursor: pointer;
`;

const StyledCardLink = styled(Link)<StyledCardProps>`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme, size = 'medium' }) => getCardPadding(theme, size)};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const ArrowIcon = styled.span<{ theme: Theme }>`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutral.gray[500]};
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

// Card Components
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      size = 'medium',
      variant = 'default',
      className,
      backgroundColor,
      withArrow = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <StyledCard
        ref={ref}
        size={size}
        variant={variant}
        className={className}
        backgroundColor={backgroundColor}
        onClick={onClick}
        theme={theme}
        {...props}
      >
        {children}
        {withArrow && <ArrowIcon theme={theme}>›</ArrowIcon>}
      </StyledCard>
    );
  }
);

export const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(
  (
    {
      children,
      to,
      size = 'medium',
      variant = 'default',
      className,
      backgroundColor,
      withArrow = false,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <StyledCardLink
        ref={ref}
        to={to}
        size={size}
        variant={variant}
        className={className}
        backgroundColor={backgroundColor}
        theme={theme}
        {...props}
      >
        {children}
        {withArrow && <ArrowIcon theme={theme}>›</ArrowIcon>}
      </StyledCardLink>
    );
  }
);

export default { Card, CardLink };