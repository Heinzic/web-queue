import React from 'react';
import { Link } from 'react-router-dom';
import { FlexBox, Text } from '../../ui';
import { theme } from '../../ui/theme/theme';
import styled from '@emotion/styled';

interface BreadcrumbsProps {
  children: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ children }) => {
  return (
    <FlexBox
      align="center"
      gap={2}
    >
      {children}
    </FlexBox>
  );
};

interface BreadcrumbItemProps {
  to?: string;
  children: React.ReactNode;
}

const StyledLink = styled(Link)`
  color: ${theme.colors.neutral.gray[600]};
  text-decoration: none;
  font-size: ${theme.typography.fontSize.sm};
  
  &:hover {
    text-decoration: underline;
  }
`;

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ to, children }) => {
  return (
    <StyledLink to={to || ''}>
      {children}
    </StyledLink>
  );
};

export const BreadcrumbSeparator: React.FC<BreadcrumbsProps> = ({ children }) => {
  return (
    <Text 
      size="sm" 
      color="muted"
    >
      {children}
    </Text>
  );
}; 