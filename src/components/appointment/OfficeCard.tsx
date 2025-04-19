import { FlexBox, Text, theme } from '../../ui';
import styled from '@emotion/styled';
import { Office } from '../../models';
import { Logo } from './Logo';

interface OfficeCardProps {
  isSelected?: boolean;
  onClick?: () => void;
  office: Office;
}

const StyledCard = styled.div<OfficeCardProps>`
  display: flex;
  padding: ${theme.spacing[4]};
  background-color: white;
  border-radius: ${theme.borderRadius.md};
  border: ${(props: { isSelected?: boolean }) => props.isSelected ? '2px solid #7B61FF' : '2px solid #E0E0E0'};
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const OfficeCard: React.FC<OfficeCardProps> = ({ isSelected, onClick, office }) => {
  return (
    <StyledCard isSelected={isSelected} onClick={onClick} office={office}>
      <FlexBox direction="row">
        <Logo>М</Logo>
        <FlexBox direction="column" gap={2}>
          <Text size="sm" weight="medium">{office.name}, {office.address}</Text>
          <FlexBox direction="column" gap={2}>
            <Text size="sm" color='muted'>{office.city}</Text>
            <FlexBox direction="row" gap={2}>
              <Text size="sm" color='muted'>8:00 - 20:00</Text>
              <Text size="sm" color='muted'>200м</Text>
            </FlexBox>
        </FlexBox>
        </FlexBox>
        
      </FlexBox>
    </StyledCard>
  );
};
