import React from 'react';
import styled from '@emotion/styled';
import { theme } from './theme/theme';

export type TitleSize = 'small' | 'medium' | 'large';
export type TitleAlign = 'left' | 'center' | 'right';

export interface TitleProps {
  children: React.ReactNode;
  size?: TitleSize;
  align?: TitleAlign;
  color?: string;
  className?: string;
  marginBottom?: keyof typeof theme.spacing;
}

const getFontSize = (size: TitleSize) => {
  switch (size) {
    case 'small':
      return theme.typography.fontSize.xl;
    case 'medium':
      return theme.typography.fontSize['2xl'];
    case 'large':
      return theme.typography.fontSize['3xl'];
    default:
      return theme.typography.fontSize['2xl'];
  }
};

const StyledTitle = styled.h1<{
  size: TitleSize;
  align: TitleAlign;
  color: string;
  marginBottom: keyof typeof theme.spacing;
}>`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${props => getFontSize(props.size)};
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: ${props => props.align};
  color: ${props => props.color};
  margin-bottom: ${props => theme.spacing[props.marginBottom]};
  line-height: 1.2;
`;

export const Title: React.FC<TitleProps> = ({
  children,
  size = 'medium',
  align = 'left',
  color = '#333',
  className,
  marginBottom = 6,
}) => {
  return (
    <StyledTitle
      size={size}
      align={align}
      color={color}
      marginBottom={marginBottom}
      className={className}
    >
      {children}
    </StyledTitle>
  );
};
