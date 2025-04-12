import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/general';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { resetAppointment } from '../store/appointmentSlice';
import { Card, CardLink, BackLink, Text, FlexBox, theme, Button } from '../ui';
import { AppointmentDateContainer, TimeSlots } from '../components/appointment';

const timeSlots = {
  morning: { title: 'Утро', range: 'С 9 до 12', slots: ['9:10', '9:30', '10:10', '10:25', '10:40', '11:00'] },
  day: { title: 'День', range: 'С 12 до 15', slots: ['12:50', '13:40', '13:50', '14:00', '14:30', '15:00'] },
  evening: { title: 'Вечер', range: 'С 15 до 20', slots: ['15:10', '15:30', '16:00', '16:25', '17:40', '19:00'] },
};

const AppointmentDateTimePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedOffice, selectedService } = useAppSelector(state => state.appointment);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  // Prevent direct access if office or service is not selected
  if (!selectedOffice || !selectedService) {
    navigate('/select-office');
    return null;
  }
  
  const handleDateChange = (date: Date | null) => {
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

      {selectedDate && (
        <TimeSlots
          selectedTimeSlot={selectedTimeSlot}
          onTimeSlotSelect={handleTimeSlotSelect}
          timeSlots={timeSlots}
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