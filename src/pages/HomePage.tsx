import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '../ui/theme/theme';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing[6]};
`;

const Title = styled.h1`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing[8]};
  text-align: center;
  color: ${theme.colors.primary.main};
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing[4]};
`;

const Card = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing[6]};
  background-color: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  text-decoration: none;
  color: ${theme.colors.neutral.gray[800]};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const CardTitle = styled.h2`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0;
`;

const ArrowIcon = styled.span`
  font-size: 1.5rem;
  color: ${theme.colors.primary.main};
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      <Title>Запись на прием</Title>
      
      <CardsContainer>
        <Card to="/book-appointment">
          <CardTitle>Записаться на прием</CardTitle>
          <ArrowIcon>→</ArrowIcon>
        </Card>
        
        <Card to="/cancel-appointment">
          <CardTitle>Отменить запись на прием</CardTitle>
          <ArrowIcon>→</ArrowIcon>
        </Card>
      </CardsContainer>
    </Container>
  );
};

export default HomePage; 