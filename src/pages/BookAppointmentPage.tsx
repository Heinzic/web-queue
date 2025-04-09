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

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${theme.colors.primary.main};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing[4]};
  
  &:hover {
    text-decoration: underline;
  }
`;

const BookAppointmentPage: React.FC = () => {
  return (
    <Container>
      <BackLink to="/">← Назад</BackLink>
      <Title>Записаться на прием</Title>
      
      {/* Add your booking form or content here */}
      <p>Здесь будет форма записи на прием.</p>
    </Container>
  );
};

export default BookAppointmentPage; 