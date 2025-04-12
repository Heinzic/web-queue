import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../ui';

interface LogoProps {
  children: React.ReactNode;
  backgroundColor?: string;
  color?: string;
  size?: number;
  marginRight?: string | number;
}

const StyledLogo = styled.div<Omit<LogoProps, 'children'>>`
  width: ${props => props.size ? `${props.size}px` : '40px'};
  height: ${props => props.size ? `${props.size}px` : '40px'};
  min-width: ${props => props.size ? `${props.size}px` : '40px'};
  border-radius: 8px;
  background-color: ${props => props.backgroundColor || theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.marginRight !== undefined ? 
    (typeof props.marginRight === 'string' ? props.marginRight : `${props.marginRight}px`) : 
    theme.spacing[3]};
  color: ${props => props.color || 'white'};
  font-weight: ${theme.typography.fontWeight.bold};
`;

export const Logo: React.FC<LogoProps> = ({ 
  children, 
  backgroundColor, 
  color, 
  size, 
  marginRight 
}) => {
  return (
    <StyledLogo 
      backgroundColor={backgroundColor}
      color={color}
      size={size}
      marginRight={marginRight}
    >
      {children}
    </StyledLogo>
  );
}; 