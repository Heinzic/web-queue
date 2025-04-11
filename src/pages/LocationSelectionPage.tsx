import React, { useState } from 'react';
import styled from '@emotion/styled';
import Container from '../components/Container';
import { Title, CardLink, BackLink, SearchInput, theme } from '../ui';

const LocationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

const LocationText = styled.div`
  font-size: ${theme.typography.fontSize.base};
`;

const locations = [
  "г. Екатеринбург",
  "г. Нижний Тагил",
  "г. Верхняя Пышма",
  "г. Каменск-Уральский",
  "г. Среднеуральск",
  "г. Арамиль"
];

const LocationSelectionPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredLocations = searchQuery 
    ? locations.filter(location => 
        location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : locations;

  return (
    <Container padding={6} backgroundColor="#f8f4ed">
      <BackLink to="/" />
      <Title 
        size="large" 
        marginBottom={5}
        color="#333"
      >
        Выбор населенного пункта
      </Title>
      
      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        showIcon
      />
      
      <LocationsContainer>
        {filteredLocations.map((location, index) => (
          <CardLink 
            key={index}
            to={`/select-office?location=${encodeURIComponent(location)}`}
            size="medium"
            variant="default"
            withArrow
          >
            <LocationText>{location}</LocationText>
          </CardLink>
        ))}
      </LocationsContainer>
    </Container>
  );
};

export default LocationSelectionPage;
