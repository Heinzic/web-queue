import { Container } from '../components/general';
import { Title, BackLink } from '../ui';

const CancelAppointmentPage: React.FC = () => {
  return (
    <Container padding={6} backgroundColor="#f8f4ed">
      <BackLink to="/" />
      <Title 
        size="medium"
        color="#333"
        marginBottom={8}
      >
        Отменить запись на прием
      </Title>
      
      {/* Add your cancellation form or content here */}
      <p>Здесь будет форма отмены записи на прием.</p>
    </Container>
  );
};

export default CancelAppointmentPage; 