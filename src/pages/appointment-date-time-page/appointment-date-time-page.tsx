import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/general';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { resetAppointment } from '../../store/appointmentSlice';
import { Card, CardLink, BackLink, Text, FlexBox, theme, Button } from '../../ui';
import { AppointmentDateContainer, TimeSlots } from '../../components/appointment';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../provider/client';
import { DateInfo } from '../../models';
import { isSameDay } from 'date-fns';

const AppointmentDateTimePage: React.FC = () => {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedOffice, selectedService } = useAppSelector(state => state.appointment);

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
    navigate('/select-office');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!selectedOffice || !selectedService) {
    navigate('/select-office');
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
          <Text size="lg" weight="bold">{selectedOffice?.name}</Text>
          <Text size="sm" color="muted">МФЦ. Справки, время обслуживания ≈ 15 минут</Text>
        </FlexBox>
      </FlexBox>

      <AppointmentDateContainer
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
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
      <FlexBox justify='center' padding={4}>
        <Button size='large' variant='outlined' onClick={handleChangeOffice}>
          Другой офис
        </Button>
      </FlexBox>
    </Container>
  );
};

export default AppointmentDateTimePage; 