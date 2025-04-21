import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// Types
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'neutral';

// Props Interface
interface TextProps {
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Styled Component
const StyledText = styled.p<TextProps>`
  font-size: ${({ size, theme }) => {
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
  }};
  font-weight: ${({ weight, theme }) => {
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
  }};
  color: ${({ color, theme }) => {
    switch (color) {
      case 'primary':
        return theme.colors.primary.main;
      case 'secondary':
        return theme.colors.secondary.main;
      case 'muted':
        return theme.colors.neutral.gray[600];
      case 'error':
        return theme.colors.error.main;
      case 'success':
        return theme.colors.success.main;
      case 'neutral':
      default:
        return theme.colors.neutral.gray[900];
    }
  }};
  text-align: ${({ align }) => align || 'left'};
  margin: 0;
  line-height: 1.5;

  ${({ truncate }) => truncate && `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

// Text Component
export const Text: React.FC<TextProps> = ({
  size = 'base',
  weight = 'regular',
  color = 'neutral',
  align = 'left',
  truncate = false,
  className,
  children,
}) => {
  const theme = useTheme(); // Access the theme

  return (
    <StyledText
      size={size}
      weight={weight}
      color={color}
      align={align}
      truncate={truncate}
      className={className}
      theme={theme} // Pass theme to styled component
    >
      {children}
    </StyledText>
  );
};

export default Text;