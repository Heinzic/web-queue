import { Container } from "../../../components/shared";
import { EnterDataForm } from "../../../containers/general/enter-data-form";
import { Title } from "../../../ui";
import { nav } from "../../nav";

function EnterDataPage() {
    return (
        <Container>
            <Title size="large">Введите данные</Title>
            <EnterDataForm nextLink={nav.mfc.confirmAppointment()}/>
        </Container>
    );
}

export default EnterDataPage;