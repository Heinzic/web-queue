import { Container } from "../../../components/shared";
import { EnterDataForm } from "../../../containers/general/enter-data-form";
import { Title } from "../../../ui";

function EnterDataPage() {
    return (
        <Container>
            <Title size="large">Введите данные</Title>
            <EnterDataForm />
        </Container>
    );
}

export default EnterDataPage;