import { Container } from "../../components/general";
import { EnterDataForm } from "../../containers/enter-data-form";
import { Title } from "../../ui";

function EnterDataPage() {
    return (
        <Container>
            <Title size="large">Введите данные</Title>
            <EnterDataForm />
        </Container>
    );
}

export default EnterDataPage;