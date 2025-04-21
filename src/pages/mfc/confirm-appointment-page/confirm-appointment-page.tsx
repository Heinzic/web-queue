import { ConfirmAppointmentForm } from "../../../containers/general/confirm-appointment-form";
import { Container } from "../../../components/shared";
import { Title } from "../../../ui";

function ConfirmAppointmentPage() {
    return ( 
        <Container>
            <Title size="large">Детали записи</Title>
            <ConfirmAppointmentForm />
        </Container>
    );
}

export default ConfirmAppointmentPage;