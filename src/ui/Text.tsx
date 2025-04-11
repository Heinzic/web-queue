import styled from '@emotion/styled';
import { theme } from './theme/theme';

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'muted' | 'error' | 'success';

interface TextProps {
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}

const getFontSize = (size: TextSize) => {
  switch (size) {
    case 'xs':
      return theme.typography.fontSize.xs;
    case 'sm':
      return theme.typography.fontSize.sm;
    case 'base':
      return theme.typography.fontSize.base;
    case 'lg':
      return theme.typography.fontSize.lg;
    case 'xl':
      return theme.typography.fontSize.xl;
    default:
      return theme.typography.fontSize.base;
  }
};

const getFontWeight = (weight: TextWeight) => {
  switch (weight) {
    case 'regular':
      return theme.typography.fontWeight.regular;
    case 'medium':
      return theme.typography.fontWeight.medium;
    case 'semibold':
      return theme.typography.fontWeight.semibold;
    case 'bold':
      return theme.typography.fontWeight.bold;
    default:
      return theme.typography.fontWeight.regular;
  }
};

const getTextColor = (color: TextColor) => {
  switch (color) {
    case 'primary':
      return theme.colors.neutral.gray[900];
    case 'secondary':
      return theme.colors.neutral.gray[700];
    case 'muted':
      return theme.colors.neutral.gray[600];
    case 'error':
      return theme.colors.error.main;
    case 'success':
      return theme.colors.success.main;
    default:
      return theme.colors.neutral.gray[900];
  }
};

const StyledText = styled.p<TextProps>`
  font-size: ${props => getFontSize(props.size || 'base')};
  font-weight: ${props => getFontWeight(props.weight || 'regular')};
  color: ${props => getTextColor(props.color || 'primary')};
  text-align: ${props => props.align || 'left'};
  margin: 0;
  line-height: 1.5;
  
  ${props => props.truncate && `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export const Text: React.FC<TextProps> = ({
  size = 'base',
  weight = 'regular',
  color = 'primary',
  align = 'left',
  truncate = false,
  className,
  children,
}) => {
  return (
    <StyledText
      size={size}
      weight={weight}
      color={color}
      align={align}
      truncate={truncate}
      className={className}
    >
      {children}
    </StyledText>
  );
};

export default Text; 