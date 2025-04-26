import styled from "@emotion/styled";

export const ArrowBackIcon = styled.div`
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing[2]};
  display: flex;
  align-items: center;
`;

export const ResetButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  margin-left: auto;
  
  &:hover {
    text-decoration: underline;
  }
`;
