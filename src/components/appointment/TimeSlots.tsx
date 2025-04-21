import {memo, useMemo} from 'react';
import styled from '@emotion/styled';
import { Theme } from '../../ui/theme/theme';
import { useTheme } from '@emotion/react';
import { TimeSlot } from './TimeSlot';
import { DateInfo } from '../../models';
import { parseISO, format } from 'date-fns';
import { FlexBox, Text } from '../../ui';

interface TimeSlotsProps {
  selectedTimeSlot: string | null;
  onTimeSlotSelect: (timeSlot: string) => void;
  timeSlots: DateInfo[];
  className?: string;
  title?: string;
}

interface StyledComponentsProps {
  theme: Theme;
}

const TimeSection = styled.div<StyledComponentsProps>`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const TimeSlotContainer = styled.div<StyledComponentsProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

export const TimeSlots: React.FC<TimeSlotsProps> = memo(({
  selectedTimeSlot,
  onTimeSlotSelect,
  timeSlots,
  className,
  title = 'Время',
}) => {
  const theme = useTheme();

  // Sort time slots chronologically
  const sortedTimeSlots = useMemo(() => {
    return [...timeSlots].sort((a, b) => 
      parseISO(a.from).getTime() - parseISO(b.from).getTime()
    );
  }, [timeSlots]);

  return (
    <TimeSection className={className} theme={theme}>
      <FlexBox padding={4} align='center' justify='center'>
        <Text size='lg' weight='semibold'>{title}</Text>
      </FlexBox>
      <TimeSlotContainer theme={theme}>
        {sortedTimeSlots.map(time => {
          const timeString = format(parseISO(time.from), 'HH:mm');
          const isSelected = selectedTimeSlot === time.from;
          return (
            <TimeSlot 
              key={time.from} 
              isSelected={isSelected}
              onClick={() => onTimeSlotSelect(time.from)}
              aria-label={`Select time slot ${timeString}`}
              aria-pressed={isSelected}
              theme={theme}
            >
              {timeString}
            </TimeSlot>
          );
        })}
      </TimeSlotContainer>
    </TimeSection>
  );
});

TimeSlots.displayName = 'TimeSlots';