import { UniConfirmAppointmentForm } from "../../../containers/uni/confirm-appointment-form";
import { Container } from "../../../components/shared";
import { Title } from "../../../ui";

function ConfirmAppointmentPage() {
    return ( 
        <Container>
            <Title size="large">Детали записи</Title>
            <UniConfirmAppointmentForm />
        </Container>
    );
}

export default ConfirmAppointmentPage;