import { useNavigate } from "react-router-dom";
import { nav } from "../../../pages";
import { Container } from "../../../components/shared";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { FlexBox, Button } from "../../../ui";
import { AppointmentSuccessCard, AppointmentSuccessCardTitle, AppointmentSuccessCardText } from "./styled";
import { resetAppointment } from "../../../store/slices/appointmentSlice";

function AppointmentSuccessPage() {
    const { selectedOffice, userData, selectedService, amountOfPackages, timeSlot } = useAppSelector(state => state.appointment);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(resetAppointment());
        navigate(nav.general.index());
    };

    return ( 
        <Container>
            <AppointmentSuccessCard>
                <AppointmentSuccessCardTitle size="large">Запись успешно создана</AppointmentSuccessCardTitle>
                <FlexBox direction="column" gap={2}>
                    <AppointmentSuccessCardText color="neutral">
                        Уважаемый {userData?.firstName} {userData?.lastName}, ваша запись успешно создана.
                    </AppointmentSuccessCardText>
                    <AppointmentSuccessCardText color="neutral">
                        Услуга: {selectedService?.name || 'Не указана'}
                    </AppointmentSuccessCardText>
                    <AppointmentSuccessCardText color="neutral">
                        Адрес: {selectedOffice?.name || 'Не указан'} {selectedOffice?.address || 'Не указан'}
                    </AppointmentSuccessCardText>
                    <AppointmentSuccessCardText color="neutral">
                        Количество пакетов: {amountOfPackages}
                    </AppointmentSuccessCardText>
                    <AppointmentSuccessCardText color="neutral">
                        Вы записаны на: &nbsp;
                        {timeSlot ? new Date(timeSlot).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Не указано'}
                        &nbsp;
                        {timeSlot ? new Date(timeSlot).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : 'Не указано'}
                    </AppointmentSuccessCardText>
                    <AppointmentSuccessCardText color="neutral">
                        Рекомендуем приехать за 10 минут до начала записи.
                    </AppointmentSuccessCardText>
                    <AppointmentSuccessCardText color="neutral">
                        Не забудьте взять с собой необходимые документы.
                    </AppointmentSuccessCardText>
                    <AppointmentSuccessCardText color="neutral">
                        Мы отправили вам письмо на почту {userData?.email} с подробной информацией о записи.
                    </AppointmentSuccessCardText>
                </FlexBox>
                <FlexBox gap={2}>
                    <Button variant="outlined" fullWidth onClick={() => window.open('https://t.me/Vne_Ocheredi_notification_bot', '_blank')}>
                        Получить уведомление в Telegram
                    </Button>
                    <Button variant="primary" fullWidth onClick={handleClick}>Перейти на главную</Button>
                </FlexBox>
            </AppointmentSuccessCard>
        </Container>
    );
}

export default AppointmentSuccessPage;