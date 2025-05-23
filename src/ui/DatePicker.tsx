import { forwardRef } from 'react';
import styled from '@emotion/styled';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

const DatePickerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const DateInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral.gray[900]};
  background-color: ${({ theme }) => theme.colors.neutral.white};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.neutral.gray[400]};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.light};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20;
  }
`;

// Override react-datepicker styles for custom design
const GlobalDatePickerStyles = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.neutral.gray[200]};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.neutral.white};
    padding: 12px;
    margin-top: 0;
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.colors.neutral.white};
    border-bottom: none;
    padding: 0 0 8px 0;
    position: relative;
  }
  
  .react-datepicker__current-month {
    font-size: 16px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.neutral.gray[900]};
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
  }

  .react-datepicker__day-names {
    display: flex;
    justify-content: space-around;
    margin-bottom: 4px;
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.colors.neutral.gray[500]};
    font-size: 12px;
    width: 28px;
    text-transform: uppercase;
    margin: 0;
    padding: 2px 0;
    text-align: center;
  }

  .react-datepicker__day {
    color: ${({ theme }) => theme.colors.neutral.gray[800]};
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    border-radius: 50%;
    line-height: 1;
  }

  .react-datepicker__day:hover {
    background-color: ${({ theme }) => theme.colors.neutral.gray[100]};
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.neutral.white};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  .react-datepicker__day--selected:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  .react-datepicker__day--today {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};
  }

  .react-datepicker__day--outside-month {
    color: ${({ theme }) => theme.colors.neutral.gray[400]};
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__navigation {
    top: 12px;
    &--previous {
      left: 12px;
    }
    &--next {
      right: 12px;
    }
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.colors.neutral.gray[600]};
    border-width: 2px 2px 0 0;
    height: 8px;
    width: 8px;
  }

  .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  .react-datepicker-popper {
    z-index: ${({ theme }) => theme.zIndex[50]};
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
  onDateSelect: (date: Date) => void;
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