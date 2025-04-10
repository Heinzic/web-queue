import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import theme from '../ui/theme/theme';
import Title from '../ui/Title';
import SearchInput from '../ui/SearchInput';
import Container from '../components/Container';

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[4]};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.neutral.gray[600]};
`;

const BreadcrumbItem = styled(Link)`
  color: inherit;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 ${theme.spacing[1]};
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.colors.neutral.gray[300]};
  margin-bottom: 0;
  width: 100%;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#F44336' : 'transparent'};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${props => props.active ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular};
  color: ${props => props.active ? '#F44336' : theme.colors.neutral.gray[700]};
  text-align: center;
  
  &:hover {
    color: #F44336;
  }
`;

const OfficesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

const OfficeCard = styled.div<{ isSelected?: boolean }>`
  display: flex;
  padding: ${theme.spacing[4]};
  background-color: white;
  border-radius: ${theme.borderRadius.md};
  border: ${props => props.isSelected ? '2px solid #7B61FF' : '2px solid #E0E0E0'};
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

const OfficeLogo = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 8px;
  background-color: #FF5722;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing[3]};
  color: white;
  font-weight: ${theme.typography.fontWeight.bold};
`;

const OfficeInfo = styled.div`
  flex: 1;
`;

const OfficeName = styled.div`
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing[1]};
`;

const OfficeCity = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.neutral.gray[600]};
  margin-bottom: ${theme.spacing[2]};
`;

const OfficeDetails = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.neutral.gray[600]};
`;

const WorkingHours = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
`;

const Distance = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing[2]} ${theme.spacing[0]};
`;

const ArrowBackIcon = styled.div`
  cursor: pointer;
  margin-right: ${theme.spacing[2]};
  display: flex;
  align-items: center;
`;

// Mockup data for clinics
const mockOffices = [
  {
    id: 1,
    name: "МФЦ, Дублёр Сибирского тракта, 2 (ТРК \"КомсоМолл\")",
    city: "Екатеринбург",
    workingHours: "С 9:00 до 20:00",
    distance: "200 м"
  },
  {
    id: 2,
    name: "МФЦ, ул. Рощинская, 21",
    city: "Екатеринбург",
    workingHours: "С 9:00 до 20:00",
    distance: "800 м"
  },
  {
    id: 3,
    name: "МФЦ, ул. Учителей, 25",
    city: "Екатеринбург",
    workingHours: "С 9:00 до 20:00",
    distance: "3,2 км",
  },
  {
    id: 4,
    name: "МФЦ, ул. Бориса Ельцина, 3",
    city: "Екатеринбург",
    workingHours: "С 9:00 до 20:00",
    distance: "6,8 км"
  },
  {
    id: 5,
    name: "МФЦ, ул. Героев России, 2 (ТДЦ Свердловск)",
    city: "Екатеринбург",
    workingHours: "С 9:00 до 20:00",
    distance: "7,5 км"
  }
];

const SelectClinicPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedLocation = searchParams.get('location') || 'г. Екатеринбург';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("places");
  const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
  
  const filteredClinics = searchQuery 
    ? mockOffices.filter(clinic => 
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockOffices;

  return (
    <Container padding={0} backgroundColor="#f8f4ed" maxWidth={800}>
      
      <div style={{ padding: theme.spacing[4] }}>
        <Breadcrumbs>
          <BreadcrumbItem to="/">Главная</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem to="/">Услуги</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem to="/">Запись на прием</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <span>Запись в отделы города {selectedLocation}</span>
        </Breadcrumbs>
        
        <Title 
          size="large" 
          marginBottom={4}
          color="#333"
        >
          Запись на прием
          </Title>
          <TabsContainer>
          <Tab 
            active={activeTab === "places"} 
            onClick={() => setActiveTab("places")}
          >
            Места
          </Tab>
          <Tab 
            active={activeTab === "services"} 
            onClick={() => setActiveTab("services")}
          >
            Услуги
          </Tab>
        </TabsContainer>
      
        <SearchContainer>
          <ArrowBackIcon onClick={() => window.history.back()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ArrowBackIcon>
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск"
            marginBottom={0}
            showIcon
          />
        </SearchContainer>
        <OfficesContainer>
          {filteredClinics.map((clinic) => (
            <OfficeCard 
              key={clinic.id}
              isSelected={selectedClinic === clinic.id}
              onClick={() => setSelectedClinic(clinic.id)}
            >
              <OfficeLogo>М</OfficeLogo>
              <OfficeInfo>
                <OfficeName>{clinic.name}</OfficeName>
                <OfficeCity>{clinic.city}</OfficeCity>
                <OfficeDetails>
                  <WorkingHours>
                    {clinic.workingHours}
                  </WorkingHours>
                  <Distance>
                    {clinic.distance}
                  </Distance>
                </OfficeDetails>
              </OfficeInfo>
            </OfficeCard>
          ))}
        </OfficesContainer>
      </div>
    </Container>
  );
};

export default SelectClinicPage; 