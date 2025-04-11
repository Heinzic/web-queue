import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from './theme/theme';

export type CardSize = 'small' | 'medium' | 'large';
export type CardVariant = 'default' | 'outlined' | 'elevated';

export interface CardBaseProps {
  children: React.ReactNode;
  size?: CardSize;
  variant?: CardVariant;
  className?: string;
  backgroundColor?: string;
  withArrow?: boolean;
}

export interface CardProps extends CardBaseProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface CardLinkProps extends CardBaseProps {
  to: string;
}

const getCardPadding = (size: CardSize) => {
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

const getCardStyles = (variant: CardVariant) => {
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

const BaseCardStyles = styled.div<{
  size: CardSize;
  variant: CardVariant;
  backgroundColor: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => getCardPadding(props.size)};
  background-color: ${props => props.backgroundColor};
  border-radius: ${theme.borderRadius.default};
  ${props => getCardStyles(props.variant)}
  margin: ${theme.spacing[2]};
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const StyledCard = styled(BaseCardStyles)`
  cursor: pointer;
`;

const StyledCardLink = styled(Link)<{
  size: CardSize;
  variant: CardVariant;
  backgroundColor: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => getCardPadding(props.size)};
  background-color: ${props => props.backgroundColor};
  border-radius: ${theme.borderRadius.default};
  text-decoration: none;
  color: inherit;
  ${props => getCardStyles(props.variant)}
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const ArrowIcon = styled.span`
  font-size: 1.2rem;
  color: #999;
  margin-left: ${theme.spacing[2]};
`;

export const Card: React.FC<CardProps> = ({
  children,
  size = 'medium',
  variant = 'default',
  className,
  backgroundColor = theme.colors.neutral.white,
  withArrow = false,
  onClick,
}) => {
  return (
    <StyledCard
      size={size}
      variant={variant}
      className={className}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {children}
      {withArrow && <ArrowIcon>›</ArrowIcon>}
    </StyledCard>
  );
};

export const CardLink: React.FC<CardLinkProps> = ({
  children,
  to,
  size = 'medium',
  variant = 'default',
  className,
  backgroundColor = theme.colors.neutral.white,
  withArrow = false,
}) => {
  return (
    <StyledCardLink
      to={to}
      size={size}
      variant={variant}
      className={className}
      backgroundColor={backgroundColor}
    >
      {children}
      {withArrow && <ArrowIcon>›</ArrowIcon>}
    </StyledCardLink>
  );
};

export default { Card, CardLink }; 