import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { theme } from '../../ui';
import { CustomDatePicker } from '../../ui';

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

const DateSelectionSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  padding: 0 ${theme.spacing[4]};
`;

const CalendarIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${theme.colors.neutral.gray[500]};
  
  &:hover {
    color: ${theme.colors.primary.main};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const DaySelector = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
  overflow-x: auto;
  padding: ${theme.spacing[1]} 0;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const DayButton = styled.button<{ isSelected?: boolean; isToday?: boolean; isCurrentMonth?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 48px;
  padding: ${theme.spacing[2]} ${theme.spacing[2]};
  border: none;
  border-radius: ${theme.borderRadius.md};
  background-color: ${props => props.isSelected ? theme.colors.primary.main : 'transparent'};
  color: ${props => {
    if (props.isSelected) return 'white';
    if (!props.isCurrentMonth) return theme.colors.neutral.gray[300];
    return theme.colors.neutral.gray[900];
  }};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.isSelected ? theme.colors.primary.dark : theme.colors.neutral.gray[100]};
  }
  
  .day-number {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.medium};
    margin-bottom: 2px;
  }
  
  .day-label {
    font-size: ${theme.typography.fontSize.xs};
    color: ${props => props.isSelected ? 'rgba(255, 255, 255, 0.8)' : theme.colors.neutral.gray[500]};
  }
`;

const HiddenDatePicker = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: ${theme.zIndex[50]};
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  &.visible {
    opacity: 1;
    visibility: visible;
  }
`;

const DatePickerContainer = styled.div`
  position: relative;
`;

interface DateContainerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

export const AppointmentDateContainer: React.FC<DateContainerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateSelect = (date: Date | undefined) => {
    onDateChange(date || null);
    setIsCalendarOpen(false);
  };

  const generateDaysList = () => {
    const result = [];
    const dateToShow = new Date(selectedDate || new Date());
    
    for (let i = -2; i <= 2; i++) {
      const date = new Date(dateToShow);
      date.setDate(date.getDate() + i);
      
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const isToday = new Date().toDateString() === date.toDateString();
      
      const dayLabels = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const label = dayLabels[date.getDay()];
      
      result.push({
        day,
        month,
        year,
        label,
        isToday,
        isCurrentMonth: month === (selectedDate || new Date()).getMonth()
      });
    }
    
    return result;
  };

  const daysList = generateDaysList();

  return (
    <DateContainer>
      <DateSelectionSection>
        <CalendarIconButton onClick={handleCalendarIconClick} aria-label="Open calendar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h5v5H7z"/>
          </svg>
        </CalendarIconButton>
        
        <DaySelector>
          {daysList.map((day) => (
            <DayButton 
              key={`${day.day}-${day.month}`} 
              isSelected={day.day === (selectedDate || new Date()).getDate() && day.month === (selectedDate || new Date()).getMonth()}
              isToday={day.isToday}
              isCurrentMonth={day.isCurrentMonth}
              onClick={() => onDateChange(new Date(day.year, day.month, day.day))}
            >
              <span className="day-number">{day.day}</span>
              <span className="day-label">{day.label}</span>
            </DayButton>
          ))}
        </DaySelector>

        <DatePickerContainer ref={datePickerRef}>
          <HiddenDatePicker className={isCalendarOpen ? 'visible' : ''}>
            <CustomDatePicker
              selectedDate={selectedDate || new Date()}
              onDateSelect={handleDateSelect}
            />
          </HiddenDatePicker>
        </DatePickerContainer>
      </DateSelectionSection>
    </DateContainer>
  );
}; 