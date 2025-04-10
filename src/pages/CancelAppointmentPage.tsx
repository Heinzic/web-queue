import React from 'react';
import styled from '@emotion/styled';
import theme from '../ui/theme/theme';
import Title from '../ui/Title';
import BackLink from '../ui/BackLink';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing[6]};
  background-color: #f8f4ed;
  min-height: 100vh;
`;

const CancelAppointmentPage: React.FC = () => {
  return (
    <Container>
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