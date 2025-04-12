import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../ui';

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.colors.neutral.gray[300]};
  margin-bottom: 0;
  width: 100%;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#F44336' : 'transparent'};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${props => props.active ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular};
  color: ${props => props.active ? '#F44336' : theme.colors.neutral.gray[700]};
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
  return (
    <Tab active={active} onClick={onClick}>
      {children}
    </Tab>
  );
}; 