import { Container } from "../../../components/shared";
import { Title } from "../../../ui";
import { MfcConfirmAppointmentForm } from "../../../containers/mfc/confirm-appointment-form";

function ConfirmAppointmentPage() {
    return ( 
        <Container>
            <Title size="large">Детали записи</Title>
            <MfcConfirmAppointmentForm/>
        </Container>
    );
}

export default ConfirmAppointmentPage;