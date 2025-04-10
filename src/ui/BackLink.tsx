import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from './theme/theme';

export interface BackLinkProps {
  to: string;
  children?: React.ReactNode;
  className?: string;
}

const StyledBackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${theme.colors.primary.main};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing[4]};
  
  &:hover {
    text-decoration: underline;
  }
`;

const BackLink: React.FC<BackLinkProps> = ({ to, children = '← Назад', className }) => {
  return (
    <StyledBackLink to={to} className={className}>
      {children}
    </StyledBackLink>
  );
};

export default BackLink; 