import styled from '@emotion/styled';
import { theme } from '../../ui';

export const TimeSlot = styled.button<{ isSelected?: boolean }>`
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border: 1px solid ${theme.colors.neutral.gray[200]};
  border-radius: ${theme.borderRadius.md};
  background-color: ${props => props.isSelected ? theme.colors.primary.main : 'white'};
  color: ${props => props.isSelected ? 'white' : theme.colors.neutral.gray[700]};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.isSelected ? theme.colors.primary.dark : theme.colors.neutral.gray[400]};
  }
`;

export const TimeSlotContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[4]};
`;

export const TimeSlotLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.neutral.gray[600]};
  margin-bottom: ${theme.spacing[2]};
`;
