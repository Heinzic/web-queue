import { GeneralConfirmAppointmentForm } from "../../../containers/general/confirm-appointment-form";
import { Container } from "../../../components/shared";
import { Title } from "../../../ui";

function ConfirmAppointmentPage() {
    return ( 
        <Container>
            <Title size="large">Детали записи</Title>
            <GeneralConfirmAppointmentForm />
        </Container>
    );
}

export default ConfirmAppointmentPage;