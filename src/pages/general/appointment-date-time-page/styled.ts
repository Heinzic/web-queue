import styled from "@emotion/styled";
import { Card } from "../../../ui";

export const PackagesAmountButton = styled.button`
  background: ${({ theme }) => theme.colors.neutral.white};
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.gray[100]};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutral.gray[100]};
    color: ${({ theme }) => theme.colors.neutral.gray[300]};
    cursor: not-allowed;
  }
`;

export const NearestDateCard = styled(Card)`
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  background: ${({ theme }) => theme.colors.background.secondary};
`