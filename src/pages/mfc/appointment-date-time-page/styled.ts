import styled from "@emotion/styled";
import { theme } from "../../../ui";

export const PackagesAmountButton = styled.button`
  background: ${theme('mfc').colors.neutral.white};
  border: 1px solid ${theme('mfc').colors.neutral.gray[300]};
  border-radius: ${theme('mfc').borderRadius.full};
  color: ${theme('mfc').colors.primary.main};
  font-size: ${theme('mfc').typography.fontSize.sm};
  cursor: pointer;
  padding: ${theme('mfc').spacing[1]} ${theme('mfc').spacing[2]};
  margin-left: auto;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme('mfc').colors.neutral.gray[100]};
  }

  &:disabled {
    background: ${theme('mfc').colors.neutral.gray[100]};
    color: ${theme('mfc').colors.neutral.gray[300]};
    cursor: not-allowed;
  }
`;