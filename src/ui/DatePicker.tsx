import { forwardRef } from 'react';
import styled from '@emotion/styled';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { theme } from './theme/theme';

const DatePickerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const DateInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${theme.colors.neutral.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.neutral.gray[900]};
  background-color: ${theme.colors.neutral.white};
  cursor: pointer;
  
  &:hover {
    border-color: ${theme.colors.neutral.gray[400]};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 0 0 2px ${theme.colors.primary.main}20;
  }
`;

// Override react-datepicker styles for custom design
const GlobalDatePickerStyles = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.neutral.gray[200]};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background-color: ${theme.colors.neutral.white};
    padding: 16px;
    margin-top: 12px;
  }

  .react-datepicker__header {
    background-color: ${theme.colors.neutral.white};
    border-bottom: none;
    padding: 0 0 12px 0;
    position: relative;
  }
  
  .react-datepicker__month-container {
    float: none;
  }

  .react-datepicker__current-month {
    font-size: 16px;
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.neutral.gray[900]};
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
  }

  .react-datepicker__day-names {
    display: flex;
    justify-content: space-around;
    margin-bottom: 8px;
  }

  .react-datepicker__day-name {
    color: ${theme.colors.neutral.gray[500]};
    font-size: 12px;
    width: 32px;
    text-transform: uppercase;
    margin: 0;
    padding: 4px 0;
    text-align: center;
  }

  .react-datepicker__month {
    margin: 0;
  }

  .react-datepicker__week {
    display: flex;
    justify-content: space-around;
  }

  .react-datepicker__day {
    color: ${theme.colors.neutral.gray[800]};
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    border-radius: 50%;
    line-height: 1;
  }

  .react-datepicker__day:hover {
    background-color: ${theme.colors.neutral.gray[100]};
  }

  .react-datepicker__day--selected {
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};
    font-weight: ${theme.typography.fontWeight.medium};
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${theme.colors.primary.main}50;
  }

  .react-datepicker__day--selected:hover {
    background-color: ${theme.colors.primary.dark};
  }

  .react-datepicker__day--today {
    font-weight: bold;
    color: ${theme.colors.primary.main};
  }

  .react-datepicker__day--outside-month {
    color: ${theme.colors.neutral.gray[400]};
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__navigation {
    top: 16px;
    &--previous {
      left: 20px;
    }
    &--next {
      right: 20px;
    }
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${theme.colors.neutral.gray[600]};
  }

  .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
    border-color: ${theme.colors.primary.main};
  }

  .react-datepicker-popper {
    z-index: ${theme.zIndex[50]};
  }
  
  .react-datepicker-popper[data-placement^="bottom"] {
    padding-top: 0;
  }
`;

// Create a custom input component for the DatePicker
const CustomInput = forwardRef<HTMLInputElement, React.ComponentPropsWithRef<'input'> & { value?: string; onClick?: () => void }>(
  ({ value, onClick }, ref) => (
    <DateInput
      value={value}
      onClick={onClick}
      readOnly
      ref={ref}
    />
  )
);

// Properly name the component for React DevTools
CustomInput.displayName = 'CustomDatePickerInput';

interface CustomDatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date | undefined) => void;
  className?: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onDateSelect,
  className,
}) => {
  const handleChange = (date: Date | null) => {
    if (date) {
      onDateSelect(date);
    }
  };

  return (
    <DatePickerContainer className={className}>
      <GlobalDatePickerStyles>
        <ReactDatePicker
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="d MMMM yyyy"
          locale={ru}
          showPopperArrow={false}
          calendarStartDay={1}
          customInput={<CustomInput />}
          fixedHeight
          monthsShown={1}
          inline
        />
      </GlobalDatePickerStyles>
    </DatePickerContainer>
  );
};