import { Container } from '../../../components/shared';
import { Title, CardLink, Text, FlexBox } from '../../../ui';
import { nav } from '../../../pages';
import { useLocation } from 'react-router-dom';
const HomePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedQueue = searchParams.get('queue') || 'Для физических лиц';

  return (
    <Container padding={6}>
      <Title 
        size="large" 
        marginBottom={6}
        color="#333"
      >
        {selectedQueue}
      </Title>
      
      <FlexBox direction="column" gap={4}>
        <CardLink 
          to={nav.mfc.selectLocation()}
          size="medium"
          variant="default"
          withArrow
        >
          <Text size="base" weight="medium">Записаться на прием</Text>
        </CardLink>
        
        <CardLink 
          to={nav.mfc.cancelAppointment()}
          size="medium"
          variant="default"
          withArrow
        >
          <Text size="base" weight="medium">Отменить запись на прием</Text>
        </CardLink>
      </FlexBox>
    </Container>
  );
};

export default HomePage; 