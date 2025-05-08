import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

const TabsContainer = styled.div`
  position: relative;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.gray[300]};
  width: 100%;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${props => props.active
    ? props.theme.typography.fontWeight.medium
    : props.theme.typography.fontWeight.regular};
  color: ${props => props.active
    ? props.theme.colors.primary.main
    : props.theme.colors.neutral.gray[700]};
  text-align: center;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const Indicator = styled(motion.div)`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 1px;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeTab = containerRef.current?.querySelector<HTMLButtonElement>('button[data-active="true"]');
    if (activeTab) {
      const rect = activeTab.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        setIndicatorStyle({
          left: rect.left - containerRect.left,
          width: rect.width
        });
      }
    }
  }, [children]);

  return (
    <TabsContainer ref={containerRef}>
      {children}
      <Indicator
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width
        }}
      />
    </TabsContainer>
  );
};

export const TabItem: React.FC<TabProps> = ({ active, onClick, children }) => {
  const theme = useTheme();

  return (
    <Tab
      active={active}
      onClick={onClick}
      data-active={active}
      theme={theme}
    >
      {children}
    </Tab>
  );
};
