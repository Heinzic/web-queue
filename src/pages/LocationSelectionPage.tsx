import { useState } from 'react';
import { Container } from '../components/general';
import { Title, CardLink, BackLink, SearchInput, FlexBox, Text } from '../ui';

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
      
      <FlexBox direction="column" gap={3}>
        {filteredLocations.map((location, index) => (
          <CardLink 
            key={index}
            to={`/select-office?location=${encodeURIComponent(location)}`}
            size="medium"
            variant="default"
            withArrow
          >
            <Text size="base">{location}</Text>
          </CardLink>
        ))}
      </FlexBox>
    </Container>
  );
};

export default LocationSelectionPage;
