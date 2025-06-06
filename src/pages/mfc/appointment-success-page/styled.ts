import styled from "@emotion/styled";
import { Title, Text, FlexBox as BaseFlexBox } from "../../../ui";

export const AppointmentSuccessCard = styled.div`
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[10]};
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing[6]};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
`;

export const AppointmentSuccessCardTitle = styled(Title)`
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral.black};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const AppointmentSuccessCardText = styled(Text)`
  color: ${({ theme }) => theme.colors.neutral.gray[700] || theme.colors.neutral.black};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const AppointmentSuccessDetailsBox = styled(BaseFlexBox)`
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.colors.neutral.gray[50] || "#f9f9f9"};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const AppointmentSuccessButtonsBox = styled(BaseFlexBox)`
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;
