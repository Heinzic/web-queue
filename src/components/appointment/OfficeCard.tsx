import { FlexBox, Text } from '../../ui';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react'; // Import useTheme
import { Office } from '../../models';
import { Logo } from './Logo';

interface OfficeCardProps {
  office: Office & { distance?: number };
  isSelected?: boolean;
  onClick?: () => void;
}

const StyledCard = styled.div<OfficeCardProps>`
  display: flex;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: ${(props) => props.isSelected ? '2px solid' + props.theme.colors.primary.light : '2px solid' + props.theme.colors.neutral.gray[300]};
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const OfficeCard: React.FC<OfficeCardProps> = ({ isSelected, onClick, office }) => {
  const theme = useTheme();

  return (
    <StyledCard isSelected={isSelected} onClick={onClick} office={office} theme={theme}>
      <FlexBox direction="row">
        <Logo>М</Logo>
        <FlexBox direction="column" gap={2}>
          <Text size="sm" weight="medium">{office.name}, {office.address}</Text>
          <FlexBox direction="column" gap={2}>
            <Text size="sm" color='muted'>{office.city}</Text>
            <FlexBox direction="row" gap={2}>
              <Text size="sm" color='muted'>{office.openingHours}</Text>
              <Text size="sm" color="muted">
                {office.distance !== undefined
                  ? `${Math.round(office.distance)} м`
                  : ' '}
              </Text>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </StyledCard>
  );
};