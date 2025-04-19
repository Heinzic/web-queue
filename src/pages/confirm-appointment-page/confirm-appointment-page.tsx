import { ConfirmAppointmentForm } from "../../containers/confirm-appointment-form";
import { Container } from "../../components/general";
import { Title } from "../../ui";

function ConfirmAppointmentPage() {
    return ( 
        <Container>
            <Title size="large">Детали записи</Title>
            <ConfirmAppointmentForm />
        </Container>
    );
}

export default ConfirmAppointmentPage;