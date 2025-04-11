import React from 'react';
import styled from '@emotion/styled';
import { theme, Text, FlexBox } from '../../ui';
import { TimeSlot } from './TimeSlot';

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
  timeSlots: {
    morning: { title: string; range: string; slots: string[] };
    day: { title: string; range: string; slots: string[] };
    evening: { title: string; range: string; slots: string[] };
  };
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedTimeSlot,
  onTimeSlotSelect,
  timeSlots,
}) => {
  return (
    <>
      {/* Morning Time Slots */}
      <TimeSection>
        <FlexBox justify="space-between" align="center" padding={4}>
          <Text weight="medium">{timeSlots.morning.title}</Text>
          <Text size="sm" color="muted">{timeSlots.morning.range}</Text>
        </FlexBox>
        <TimeSlotContainer>
          {timeSlots.morning.slots.map(time => (
            <TimeSlot 
              key={time} 
              isSelected={selectedTimeSlot === time}
              onClick={() => onTimeSlotSelect(time)}
            >
              {time}
            </TimeSlot>
          ))}
        </TimeSlotContainer>
      </TimeSection>
      
      {/* Day Time Slots */}
      <TimeSection>
        <FlexBox justify="space-between" align="center" padding={4}>
          <Text weight="medium">{timeSlots.day.title}</Text>
          <Text size="sm" color="muted">{timeSlots.day.range}</Text>
        </FlexBox>
        <TimeSlotContainer>
          {timeSlots.day.slots.map(time => (
            <TimeSlot 
              key={time} 
              isSelected={selectedTimeSlot === time}
              onClick={() => onTimeSlotSelect(time)}
            >
              {time}
            </TimeSlot>
          ))}
        </TimeSlotContainer>
      </TimeSection>
      
      {/* Evening Time Slots */}
      <TimeSection>
        <FlexBox justify="space-between" align="center" padding={4}>
          <Text weight="medium">{timeSlots.evening.title}</Text>
          <Text size="sm" color="muted">{timeSlots.evening.range}</Text>
        </FlexBox>
        <TimeSlotContainer>
          {timeSlots.evening.slots.map(time => (
            <TimeSlot 
              key={time} 
              isSelected={selectedTimeSlot === time}
              onClick={() => onTimeSlotSelect(time)}
            >
              {time}
            </TimeSlot>
          ))}
        </TimeSlotContainer>
      </TimeSection>
    </>
  );
}; 