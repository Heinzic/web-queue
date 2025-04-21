import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { spacing } from './theme/theme';

// Types
export type TitleSize = 'small' | 'medium' | 'large';
export type TitleAlign = 'left' | 'center' | 'right';

// Props Interface
export interface TitleProps {
  children: React.ReactNode;
  size?: TitleSize;
  align?: TitleAlign;
  color?: string;
  className?: string;
  marginBottom?: keyof typeof spacing;
}

// Styled Component
const StyledTitle = styled.h1<{
  size: TitleSize;
  align: TitleAlign;
  color: string;
  marginBottom: keyof typeof spacing;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ size, theme }) => {
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
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: ${({ align }) => align};
  color: ${({ color }) => color};
  margin-bottom: ${({ marginBottom }) => spacing[marginBottom]};
  line-height: 1.2;
`;

// Title Component
export const Title: React.FC<TitleProps> = ({
  children,
  size = 'medium',
  align = 'left',
  color = '#333',
  className,
  marginBottom = 6, // Default to '6' for spacing
}) => {
  const theme = useTheme(); // Access the theme

  return (
    <StyledTitle
      size={size}
      align={align}
      color={color}
      marginBottom={marginBottom}
      className={className}
      theme={theme} // Pass theme to styled component
    >
      {children}
    </StyledTitle>
  );
};

export default Title;