import React from 'react';
import styled from '@emotion/styled';
import Container from '../components/Container';
import { Title, CardLink, theme } from '../ui';

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

const CardTitle = styled.h2`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  margin: 0;
`;

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
      
      <CardsContainer>
        <CardLink 
          to="/select-location"
          size="medium"
          variant="default"
          withArrow
        >
          <CardTitle>Записаться на прием</CardTitle>
        </CardLink>
        
        <CardLink 
          to="/cancel-appointment"
          size="medium"
          variant="default"
          withArrow
        >
          <CardTitle>Отменить запись на прием</CardTitle>
        </CardLink>
      </CardsContainer>
    </Container>
  );
};

export default HomePage; 