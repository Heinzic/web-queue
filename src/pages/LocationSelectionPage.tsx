import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import theme from '../ui/theme/theme';
import Title from '../ui/Title';
import { CardLink } from '../ui/Card';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing[6]};
  background-color: #f8f4ed;
  min-height: 100vh;
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

const SearchContainer = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing[3]};
  border: 1px solid ${theme.colors.neutral.gray[200]};
  border-radius: ${theme.borderRadius.default};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.base};
  background-color: white;
  outline: none;
  
  &:focus {
    border-color: ${theme.colors.primary.main};
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: ${theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.neutral.gray[500]};
`;

const InputWrapper = styled.div`
  position: relative;
`;

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
    <Container>
      <BackLink to="/">← Назад</BackLink>
      <Title 
        size="large" 
        marginBottom={5}
        color="#333"
      >
        Выбор населенного пункта
      </Title>
      
      <SearchContainer>
        <InputWrapper>
          <SearchInput 
            type="text" 
            placeholder="Поиск" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputWrapper>
      </SearchContainer>
      
      <LocationsContainer>
        {filteredLocations.map((location, index) => (
          <CardLink 
            key={index}
            to={`/select-clinic?location=${encodeURIComponent(location)}`}
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
