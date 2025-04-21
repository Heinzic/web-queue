import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { spacing } from './theme/theme';

// Types
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type AlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
export type GapSize = keyof typeof spacing;

// Props Interface
interface FlexBoxProps {
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justify?: JustifyContent;
  align?: AlignItems;
  alignContent?: AlignContent;
  gap?: GapSize;
  fullWidth?: boolean;
  fullHeight?: boolean;
  padding?: GapSize;
  margin?: GapSize;
  className?: string;
  children: React.ReactNode;
}

// Styled Component
const StyledFlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'stretch'};
  align-content: ${({ alignContent }) => alignContent || 'stretch'};
  gap: ${({ gap, theme }) => (gap ? theme.spacing[gap] : '0')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'auto')};
  padding: ${({ padding, theme }) => (padding ? theme.spacing[padding] : '0')};
  margin: ${({ margin, theme }) => (margin ? theme.spacing[margin] : '0')};
`;

// FlexBox Component
export const FlexBox: React.FC<FlexBoxProps> = ({
  direction = 'row',
  wrap = 'nowrap',
  justify = 'flex-start',
  align = 'stretch',
  alignContent = 'stretch',
  gap,
  fullWidth = false,
  fullHeight = false,
  padding,
  margin,
  className,
  children,
}) => {
  const theme = useTheme(); // Access the theme

  return (
    <StyledFlexBox
      direction={direction}
      wrap={wrap}
      justify={justify}
      align={align}
      alignContent={alignContent}
      gap={gap}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      padding={padding}
      margin={margin}
      className={className}
      theme={theme} // Pass theme to styled component
    >
      {children}
    </StyledFlexBox>
  );
};

export default FlexBox;