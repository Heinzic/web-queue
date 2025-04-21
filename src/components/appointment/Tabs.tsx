import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react'; // Import useTheme

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.gray[300]};
  margin-bottom: 0;
  width: 100%;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#F44336' : 'transparent'};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${props => props.active ? props.theme.typography.fontWeight.medium : props.theme.typography.fontWeight.regular};
  color: ${props => props.active ? '#F44336' : props.theme.colors.neutral.gray[700]};
  text-align: center;
  
  &:hover {
    color: #F44336;
  }
`;

interface TabsProps {
  children: React.ReactNode;
}

interface TabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <TabsContainer>{children}</TabsContainer>;
};

export const TabItem: React.FC<TabProps> = ({ active, onClick, children }) => {
  const theme = useTheme(); // Access the theme using useTheme

  return (
    <Tab active={active} onClick={onClick} theme={theme}>
      {children}
    </Tab>
  );
};