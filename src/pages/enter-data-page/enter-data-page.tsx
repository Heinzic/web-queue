import { Container } from "../../components/general";
import { EnterDataForm } from "../../containers/enter-data-form";
import { Title } from "../../ui";

function EnterDataPage() {
    return (
        <Container>
            <Title>Введите данные</Title>
            <EnterDataForm />
        </Container>
    );
}

export default EnterDataPage;