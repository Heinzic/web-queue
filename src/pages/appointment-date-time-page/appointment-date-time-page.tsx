import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/general';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { resetAppointment, setAmountOfPackages, setTimeSlot } from '../../store/appointmentSlice';
import { Card, CardLink, BackLink, Text, FlexBox, theme, Button } from '../../ui';
import { AppointmentDateContainer, TimeSlots } from '../../components/appointment';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../provider/client';
import { DateInfo } from '../../models';
import { isSameDay } from 'date-fns';
import { nav } from '..';
import { PackagesAmountButton } from './styled';

const AppointmentDateTimePage: React.FC = () => {  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedOffice, selectedService, amountOfPackages } = useAppSelector(state => state.appointment);

  const { data: timeSlots, isLoading, error } = useQuery({
    queryKey: ['dates', selectedOffice?.id, selectedService?.id],
    queryFn: async () => {
      const response = await instance.get<{ dates: DateInfo[] }>(`/api/dates?placeId=${selectedOffice?.id}&serviceId=${selectedService?.id}`);
      return response.data.dates;
    }
  });
  
  const [selectedDate, setSelectedDate] = useState<Date>(timeSlots?.[0]?.date ? new Date(timeSlots[0].date) : new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };
  
  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };
  
  const handleGoBack = () => {
    dispatch(resetAppointment());
  };
  
  const handleChangeOffice = () => {
    dispatch(resetAppointment());
    navigate(nav.selectOffice());
  };

  const handleBookAppointment = () => {
    dispatch(setTimeSlot(selectedTimeSlot ? selectedTimeSlot : ''));
    navigate(nav.enterData());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!selectedOffice || !selectedService) {
    navigate(nav.selectOffice());
    return null;
  }

  return (
    <Container padding={0} maxWidth={800}>
      <FlexBox align="center" padding={4} gap={2}>
        <BackLink to="/select-office" onClick={handleGoBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke={theme.colors.neutral.gray[800]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </BackLink>
        <FlexBox direction="column" gap={1}>
          <Text size="lg" weight="bold">{selectedOffice?.name + ' ' + selectedOffice?.address}</Text>
          <Text size="sm" color="muted">{selectedService?.name}</Text>
        </FlexBox>
      </FlexBox>

      <FlexBox align="center" justify="space-between" gap={2}>
        <AppointmentDateContainer
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <FlexBox align="center" gap={2}>
            <Text size="sm">Количество пакетов документов</Text>
            <PackagesAmountButton onClick={() => dispatch(setAmountOfPackages(amountOfPackages - 1))} disabled={amountOfPackages === 1}>
              <Text size="xl" color={amountOfPackages === 1 ? 'muted' : 'primary'}>−</Text>
            </PackagesAmountButton>
            <Text size="sm">{amountOfPackages}</Text>
            <PackagesAmountButton onClick={() => dispatch(setAmountOfPackages(amountOfPackages + 1))}>
              <Text size="xl" color="primary">+</Text>
            </PackagesAmountButton>
        </FlexBox>
      </FlexBox>
      <Card variant='elevated' withArrow size='small'>
        <CardLink to="/select-office">
          <Text size="lg" weight="medium">Записаться на ближайшее время</Text>
        </CardLink>
      </Card>

      {selectedDate && timeSlots && (
        <TimeSlots
          selectedTimeSlot={selectedTimeSlot}
          onTimeSlotSelect={handleTimeSlotSelect}
          timeSlots={timeSlots.filter(slot => isSameDay(new Date(slot.date), selectedDate))}
        />
      )}
      <FlexBox justify='center' padding={4} gap={2}>
        <Button size='large' variant='outlined' onClick={handleChangeOffice}>
          Другой офис
        </Button>
        {selectedTimeSlot && <Button size='large' variant='primary' onClick={handleBookAppointment}>
          Записаться
        </Button>}
      </FlexBox>
    </Container>
  );
};

export default AppointmentDateTimePage; 