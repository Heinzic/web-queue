import styled from '@emotion/styled';
import { theme } from './theme/theme';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type AlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
export type GapSize = keyof typeof theme.spacing;

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

const StyledFlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  align-content: ${props => props.alignContent || 'stretch'};
  gap: ${props => props.gap ? theme.spacing[props.gap] : '0'};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  height: ${props => props.fullHeight ? '100%' : 'auto'};
  padding: ${props => props.padding ? theme.spacing[props.padding] : '0'};
  margin: ${props => props.margin ? theme.spacing[props.margin] : '0'};
`;

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
    >
      {children}
    </StyledFlexBox>
  );
};

export default FlexBox; 