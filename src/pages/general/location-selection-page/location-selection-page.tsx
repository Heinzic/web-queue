import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '../../../components/shared';
import { Title, BackLink, Text, FlexBox, CardLink, SearchInput } from '../../../ui';
import { nav } from '../../../pages';

const locations = [
  "Екатеринбург",
  "Нижний Тагил",
  "Верхняя Пышма",
  "Каменск-Уральский",
  "Среднеуральск",
  "Арамиль"
];

const LocationSelectionPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userCity, setUserCity] = useState<string | null>(null);

  // Определение города по геолокации
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client', {
          params: {
            latitude,
            longitude,
            localityLanguage: 'ru'
          }
        });
        const city: string = response.data.city;
        if (locations.includes(city.split(" ")[1])) {
          setUserCity(city.split(" ")[1]);
        }
        
      } catch (err) {
        console.error("Ошибка при получении города:", err);
      }
    }, (err) => {
      console.warn("Геолокация не разрешена:", err.message);
    });
  }, []);

  const filteredLocations = searchQuery 
    ? locations.filter(location => 
        location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : userCity
      ? [userCity, ...locations.filter(l => l !== userCity)]
      : locations;

  return (
    <Container padding={6} backgroundColor="#f8f4ed">
      <BackLink to="/" />
      <Title size="large" marginBottom={5} color="#333">
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
            to={`${nav.general.selectOffice()}?location=${encodeURIComponent(location)}`}
            size="medium"
            variant="default"
            withArrow
          >
            <Text size="base">
              г. {location}
              {userCity === location ? ' 📍' : ''}
            </Text>
          </CardLink>
        ))}
      </FlexBox>
    </Container>
  );
};

export default LocationSelectionPage;
