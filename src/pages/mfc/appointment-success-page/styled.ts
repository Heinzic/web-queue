import styled from "@emotion/styled";
import { Title, Text, theme } from "../../../ui";

export const AppointmentSuccessCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: ${theme('mfc').borderRadius.lg};
    background-color: ${theme('mfc').colors.neutral.white};
    padding: ${theme('mfc').spacing[10]};
    gap: ${theme('mfc').spacing[2]};
`;

export const AppointmentSuccessCardTitle = styled(Title)`
    color: ${theme('mfc').colors.neutral.black};
    margin-bottom: ${theme('mfc').spacing[2]};
`;

export const AppointmentSuccessCardText = styled(Text)`
    color: ${theme('mfc').colors.neutral.black};
    text-align: center;
    font-size: ${theme('mfc').typography.fontSize.lg};
    font-weight: ${theme('mfc').typography.fontWeight.semibold};
`;
