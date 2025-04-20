import styled from "@emotion/styled";
import { Title, Text } from "../../ui";

export const AppointmentSuccessCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background-color: ${({ theme }) => theme.colors.neutral.white};
    padding: ${({ theme }) => theme.spacing[10]};
    gap: ${({ theme }) => theme.spacing[2]};
`;

export const AppointmentSuccessCardTitle = styled(Title)`
    color: ${({ theme }) => theme.colors.neutral.black};
    margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const AppointmentSuccessCardText = styled(Text)`
    color: ${({ theme }) => theme.colors.neutral.black};
    text-align: center;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
