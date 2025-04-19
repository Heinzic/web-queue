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
