import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

export interface BackLinkProps {
  to: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const StyledBackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

export const BackLink: React.FC<BackLinkProps> = ({ to, children = '← Назад', className, onClick }) => {
  const theme = useTheme();

  return (
    <StyledBackLink to={to} className={className} onClick={onClick} style={{ color: theme.colors.primary.main }}>
      {children}
    </StyledBackLink>
  );
};

