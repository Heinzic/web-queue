import React from 'react';
import Container from '../components/Container';
import { Title, CardLink, Text, FlexBox } from '../ui';

const HomePage: React.FC = () => {
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
          to="/select-location"
          size="medium"
          variant="default"
          withArrow
        >
          <Text size="base" weight="medium">Записаться на прием</Text>
        </CardLink>
        
        <CardLink 
          to="/cancel-appointment"
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