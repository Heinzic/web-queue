import { Container } from '../../../components/shared';
import { Title, CardLink, Text, FlexBox } from '../../../ui';
import { nav } from '../../../pages';
const HomePage = () => {
  return (
    <Container padding={6}>
      <Title 
        size="large" 
        marginBottom={6}
        color="#333"
      >
        Запись на прием
      </Title>
      
      <FlexBox direction="column" gap={4}>
        <CardLink 
          to={nav.uni.selectOffice()}
          size="medium"
          variant="default"
          withArrow
        >
          <Text size="base" weight="medium">Записаться на прием</Text>
        </CardLink>
        
        <CardLink 
          to={nav.uni.cancelAppointment()}
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