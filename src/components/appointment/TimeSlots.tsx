import React from 'react';
import styled from '@emotion/styled';
import { theme, Text, FlexBox } from '../../ui';
import { TimeSlot } from './TimeSlot';
import { DateInfo } from '../../models';
import { parseISO, format } from 'date-fns';

const TimeSection = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

const TimeSlotContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${theme.spacing[2]};
  padding: 0 ${theme.spacing[4]};
`;

interface TimeSlotsProps {
  selectedTimeSlot: string | null;
  onTimeSlotSelect: (timeSlot: string) => void;
  timeSlots: DateInfo[]
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedTimeSlot,
  onTimeSlotSelect,
  timeSlots,
}) => {
  console.log(timeSlots);
  return (
    <>
      <TimeSection>
        <FlexBox justify="space-between" align="center" padding={4}>
          <Text weight="medium">Время</Text>
        </FlexBox>
        <TimeSlotContainer>
          {timeSlots.map(time => (
            <TimeSlot 
              key={time.from} 
              isSelected={selectedTimeSlot === time.from}
              onClick={() => onTimeSlotSelect(time.from)}
            >
              {format(parseISO(time.from), 'HH:mm')}
            </TimeSlot>
          ))
          }
        </TimeSlotContainer>
      </TimeSection>
    </>
  );
}; 