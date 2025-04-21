import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

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
  background-color: ${props => props.backgroundColor || props.theme.colors.primary.main}; // Use theme from props
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.marginRight !== undefined ? 
    (typeof props.marginRight === 'string' ? props.marginRight : `${props.marginRight}px`) : 
    props.theme.spacing[3]}; // Use theme from props
  color: ${props => props.color || 'white'};
  font-weight: ${props => props.theme.typography.fontWeight.bold}; // Use theme from props
`;

export const Logo: React.FC<LogoProps> = ({ 
  children, 
  backgroundColor, 
  color, 
  size, 
  marginRight 
}) => {
  const theme = useTheme(); // Access the theme using useTheme

  return (
    <StyledLogo 
      backgroundColor={backgroundColor}
      color={color}
      size={size}
      marginRight={marginRight}
      theme={theme} // Pass the theme to StyledLogo
    >
      {children}
    </StyledLogo>
  );
};