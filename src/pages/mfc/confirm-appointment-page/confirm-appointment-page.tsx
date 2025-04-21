import { ConfirmAppointmentForm } from "../../../containers/general/confirm-appointment-form";
import { Container } from "../../../components/shared";
import { Title } from "../../../ui";
import { nav } from "../../nav";

function ConfirmAppointmentPage() {
    return ( 
        <Container>
            <Title size="large">Детали записи</Title>
            <ConfirmAppointmentForm nextLink={nav.mfc.appointmentSuccess()}/>
        </Container>
    );
}

export default ConfirmAppointmentPage;