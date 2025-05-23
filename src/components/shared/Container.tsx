import React from 'react';
import styled from '@emotion/styled';
import { theme, spacing } from '../../ui/theme/theme';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: number | string;
  padding?: keyof typeof spacing;
  backgroundColor?: string;
  className?: string;
}

const StyledContainer = styled.div<{
  maxWidth: number | string;
  padding: keyof typeof spacing;
  backgroundColor: string;
}>`
  max-width: ${props => typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth};
  margin: 0 auto;
  padding: ${props => theme().spacing[props.padding]};
  background-color: ${props => props.backgroundColor};
  min-height: 100vh;
  width: 100%;
`;

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 800,
  padding = 4,
  backgroundColor = '#f8f4ed',
  className,
}) => {
  return (
    <StyledContainer
      maxWidth={maxWidth}
      padding={padding}
      backgroundColor={backgroundColor}
      className={className}
    >
      {children}
    </StyledContainer>
  );
}; 