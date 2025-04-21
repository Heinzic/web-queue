import styled from '@emotion/styled';
import { Theme } from '../../ui/theme/theme';
import { useTheme } from '@emotion/react';

interface TimeSlotProps {
  isSelected?: boolean;
  disabled?: boolean;
  theme: Theme;
  children?: React.ReactNode;
}

export const TimeSlot = styled.button<TimeSlotProps>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.primary.main : theme.colors.neutral.white};
  color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.neutral.white : theme.colors.neutral.gray[700]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
  text-align: center;
  height: 40px;
  
  &:hover {
    background-color: ${({ isSelected, disabled, theme }) => 
      disabled ? 'inherit' : 
      isSelected ? theme.colors.primary.dark : theme.colors.neutral.gray[100]};
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-1px)'};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.neutral.gray[100]};
  }
`;

export const TimeSlotContainer = styled.div<{ theme: Theme }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

export const TimeSlotHeader = styled.div<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral.gray[900]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

// Hook to provide themed time slot components
export const useTimeSlotComponents = () => {
  const theme = useTheme();
  
  return {
    TimeSlot: (props: Omit<TimeSlotProps, 'theme'>) => (
      <TimeSlot {...props} theme={theme} />
    ),
    TimeSlotContainer: (props: React.ComponentProps<typeof TimeSlotContainer>) => (
      <TimeSlotContainer {...props} theme={theme} />
    ),
    TimeSlotHeader: (props: React.ComponentProps<typeof TimeSlotHeader>) => (
      <TimeSlotHeader {...props} theme={theme} />
    )
  };
};