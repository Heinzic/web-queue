import { memo, useMemo } from 'react';
import styled from '@emotion/styled';
import { Theme } from '../../ui/theme/theme';
import { useTheme } from '@emotion/react';
import { TimeSlot } from './TimeSlot';
import { DateInfo } from '../../models';
import { parseISO, format } from 'date-fns';
import { FlexBox, Text } from '../../ui';
import { Container } from '../shared';

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

const TimeSlotContainer = styled.div<StyledComponentsProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const TimeSlots: React.FC<TimeSlotsProps> = memo(({
  selectedTimeSlot,
  onTimeSlotSelect,
  timeSlots,
  className,
  title = 'Время для записи',
}) => {
  const theme = useTheme();

  // Sort time slots chronologically
  const sortedTimeSlots = useMemo(() => {
    return [...timeSlots].sort((a, b) => 
      parseISO(a.from).getTime() - parseISO(b.from).getTime()
    );
  }, [timeSlots]);

  const categorizedTimeSlots = useMemo(() => {
    const morningSlots = sortedTimeSlots.filter(time => parseISO(time.from).getHours() < 12);
    const daySlots = sortedTimeSlots.filter(time => parseISO(time.from).getHours() >= 12 && parseISO(time.from).getHours() < 15);
    const eveningSlots = sortedTimeSlots.filter(time => parseISO(time.from).getHours() >= 15);
    
    return { morningSlots, daySlots, eveningSlots };
  }, [sortedTimeSlots]);

  if (sortedTimeSlots.length === 0) return <FlexBox padding={4} justify='center'>Нет доступных временных слотов на эту дату</FlexBox>

  return (
    <div className={className}>
      <FlexBox align='center' justify='center'>
        <Text size='lg' weight='semibold'>{title}</Text>
      </FlexBox>
      <FlexBox direction='column' padding={4} gap={2}>
          {categorizedTimeSlots.morningSlots.length > 0 && <FlexBox direction='column' gap={2}>
          <FlexBox gap={2} align='center'>
            <Text size='lg' weight='semibold'>Утро</Text>
            <Text size='base' color='muted'>До 12:00</Text>
          </FlexBox>
          
          <TimeSlotContainer theme={theme}>
            {categorizedTimeSlots.morningSlots.map(time => {
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
        </FlexBox>}
        

        {categorizedTimeSlots.daySlots.length > 0 && 
          <FlexBox direction='column' gap={2}>
            <FlexBox gap={2} align='center'>
              <Text size='lg' weight='semibold'>День</Text>
              <Text size='base' color='muted'>С 12:00 до 15:00</Text>
            </FlexBox>
            <TimeSlotContainer theme={theme}>
              {categorizedTimeSlots.daySlots.map(time => {
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
          </FlexBox>
        }

        {categorizedTimeSlots.eveningSlots.length > 0 && <FlexBox direction='column' gap={2}>
          <FlexBox gap={2} align='center'>
            <Text size='lg' weight='semibold'>Вечер</Text>
            <Text size='base' color='muted'>После 15:00</Text>
          </FlexBox>
          <TimeSlotContainer theme={theme}>
            {categorizedTimeSlots.eveningSlots.map(time => {
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
        </FlexBox>}
      </FlexBox>
      
    </div>
  );
});

TimeSlots.displayName = 'TimeSlots';