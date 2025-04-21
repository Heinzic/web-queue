import { useNavigate } from "react-router-dom";
import { nav } from "../../../pages";
import { Container } from "../../../components/shared";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { FlexBox, Button } from "../../../ui";
import { AppointmentSuccessCard, AppointmentSuccessCardTitle, AppointmentSuccessCardText } from "./styled";
import { resetAppointment } from "../../../store/appointmentSlice";

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
                <Button variant="primary" onClick={handleClick}>Перейти на главную</Button>
            </AppointmentSuccessCard>
        </Container>
    );
}

export default AppointmentSuccessPage;