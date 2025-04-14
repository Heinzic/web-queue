import styled from "@emotion/styled";
import { theme } from "../../ui";

export const ArrowBackIcon = styled.div`
  cursor: pointer;
  margin-right: ${theme.spacing[2]};
  display: flex;
  align-items: center;
`;

export const ResetButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary.main};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  margin-left: auto;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const PackagesAmountButton = styled.button`
  background: ${theme.colors.neutral.white};
  border: 1px solid ${theme.colors.neutral.gray[300]};
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.primary.main};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  margin-left: auto;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.neutral.gray[100]};
  }

  &:disabled {
    background: ${theme.colors.neutral.gray[100]};
    color: ${theme.colors.neutral.gray[300]};
    cursor: not-allowed;
  }
`;

