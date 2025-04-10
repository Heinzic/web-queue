import React from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
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

const SelectClinicPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedLocation = searchParams.get('location') || 'Не выбран';

  return (
    <Container>
      <BackLink to="/select-location" />
      <Title 
        size="large" 
        marginBottom={5}
        color="#333"
      >
        Выбор медицинского учреждения
      </Title>
      
      <p>Выбранный населенный пункт: {selectedLocation}</p>
      
      <p>Здесь будет список доступных медицинских учреждений.</p>
    </Container>
  );
};

export default SelectClinicPage; 