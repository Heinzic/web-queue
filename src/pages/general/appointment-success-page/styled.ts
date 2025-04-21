import styled from "@emotion/styled";
import { Title, Text, theme } from "../../../ui";

export const AppointmentSuccessCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: ${theme().borderRadius.lg};
    background-color: ${theme().colors.neutral.white};
    padding: ${theme().spacing[10]};
    gap: ${theme().spacing[2]};
`;

export const AppointmentSuccessCardTitle = styled(Title)`
    color: ${theme().colors.neutral.black};
    margin-bottom: ${theme().spacing[2]};
`;

export const AppointmentSuccessCardText = styled(Text)`
    color: ${theme().colors.neutral.black};
    text-align: center;
    font-size: ${theme().typography.fontSize.lg};
    font-weight: ${theme().typography.fontWeight.semibold};
`;
