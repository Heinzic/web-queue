import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import ServicesList from '../components/ServicesList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Office, Service, setSelectedOffice, setSelectedService } from '../store/appointmentSlice';
import { Title, SearchInput, theme } from '../ui';

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
  border-bottom: 2px solid ${(props: { active: boolean }) => props.active ? '#F44336' : 'transparent'};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${(props: { active: boolean }) => props.active ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular};
  color: ${(props: { active: boolean }) => props.active ? '#F44336' : theme.colors.neutral.gray[700]};
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
  border: ${(props: { isSelected?: boolean }) => props.isSelected ? '2px solid #7B61FF' : '2px solid #E0E0E0'};
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
  background-color: ${theme.colors.primary.main};
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

const ResetButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary.main};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  margin-left: auto;
  
  &:hover {
    text-decoration: underline;
  }
`;

const mockOffices = [
  {
    id: 1,
    name: "МФЦ, Дублёр Сибирского тракта, 2 (ТРК \"КомсоМолл\")",
    city: "Екатеринбург",
    workingHours: "С 9:00 до 20:00",
    distance: "200 м",
    services: [1, 2, 3] // Service IDs that this office provides
  },
  {
    id: 2,
    name: "МФЦ, ул. Рощинская, 21",
    city: "Екатеринбург",
    workingHours: "С 9:00 до 20:00",
    distance: "800 м",
    services: [1, 2] // Service IDs that this office provides
  },
  {
    id: 3,
    name: "МФЦ, ул. Учителей, 25",
    city: "Екатеринбург",
    workingHours: "С 9:00 до 20:00",
    distance: "3,2 км",
    services: [1, 3] // Service IDs that this office provides
  },
  {
    id: 4,
    name: "МФЦ, ул. Бориса Ельцина, 3",
    city: "Екатеринбург",
    workingHours: "С 9:00 до 20:00",
    distance: "6,8 км",
    services: [2, 3] // Service IDs that this office provides
  },
  {
    id: 5,
    name: "МФЦ, ул. Героев России, 2 (ТДЦ Свердловск)",
    city: "Екатеринбург",
    workingHours: "С 9:00 до 20:00",
    distance: "7,5 км",
    services: [1, 2, 3] // Service IDs that this office provides
  }
];

const SelectOfficePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedLocation = searchParams.get('location') || 'г. Екатеринбург';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("places");
  
  const dispatch = useAppDispatch();
  const { selectedOffice, selectedService } = useAppSelector(state => state.appointment);
  
  useEffect(() => {
    if (selectedOffice && selectedService) {
      navigate('/appointment-datetime');
    }
  }, [selectedOffice, selectedService]);
  
  // Filter offices based on search query and selected service
  const filteredOffices = mockOffices
    .filter(office => {
      // Filter by search query
      const matchesSearch = !searchQuery || 
        office.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by selected service if one is selected
      const matchesService = !selectedService || 
        (office.services && office.services.includes(selectedService.id));
      
      return matchesSearch && matchesService;
    });

  const handleOfficeSelect = (office: Office) => {
    dispatch(setSelectedOffice(office));
    setActiveTab("services");
  };

  const handleServiceSelect = (service: Service) => {
    dispatch(setSelectedService(service));
    setActiveTab("places");
  };

  const handleResetOffice = () => {
    dispatch(setSelectedOffice(null));
    setActiveTab("places");
  };

  const handleResetService = () => {
    dispatch(setSelectedService(null));
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    // Only clear office/service selection when appropriate
    if (tab === "services" && activeTab === "places" && !selectedOffice) {
      dispatch(setSelectedOffice(null));
    }
    
    setActiveTab(tab);
  };

  return (
    <Container padding={6} backgroundColor="#f8f4ed" maxWidth={800}>
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
          onClick={() => handleTabChange("places")}
        >
          Места
        </Tab>
        <Tab 
          active={activeTab === "services"} 
          onClick={() => handleTabChange("services")}
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
        {selectedOffice ? (
          <>
            <div style={{ padding: "8px 0", fontWeight: 500 }}>
              {selectedOffice.name}
            </div>
            <ResetButton onClick={handleResetOffice}>
              Сбросить
            </ResetButton>
          </>
        ) : selectedService && activeTab === "places" ? (
          <>
            <div style={{ padding: "8px 0", fontWeight: 500 }}>
              {selectedService.name}
            </div>
            <ResetButton onClick={handleResetService}>
              Сбросить
            </ResetButton>
          </>
        ) : activeTab === "places" ? (
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск офиса"
            marginBottom={0}
            showIcon
          />
        ) : (
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск услуги"
            marginBottom={0}
            showIcon
          />
        )}
      </SearchContainer>
      
      <div>
        {activeTab === "places" && (
          <OfficesContainer>
            {filteredOffices.length > 0 ? (
              filteredOffices.map((office) => (
                <OfficeCard 
                  key={office.id}
                  isSelected={selectedOffice?.id === office.id}
                  onClick={() => handleOfficeSelect(office as Office)}
                >
                  <OfficeLogo>М</OfficeLogo>
                  <OfficeInfo>
                    <OfficeName>{office.name}</OfficeName>
                    <OfficeCity>{office.city}</OfficeCity>
                    <OfficeDetails>
                      <WorkingHours>
                        {office.workingHours}
                      </WorkingHours>
                      <Distance>
                        {office.distance}
                      </Distance>
                    </OfficeDetails>
                  </OfficeInfo>
                </OfficeCard>
              ))
            ) : (
              <div style={{ padding: theme.spacing[4], textAlign: 'center', color: theme.colors.neutral.gray[600] }}>
                {selectedService 
                  ? `Нет офисов, предоставляющих услугу "${selectedService.name}"`
                  : "Нет офисов, соответствующих поиску"
                }
              </div>
            )}
          </OfficesContainer>
        )}
        
        
        {activeTab === "services" && (
          <ServicesList 
            showSearch={false} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onServiceSelect={handleServiceSelect}
            onResetService={handleResetService}
          />
        )}
      </div>
    </Container>
  );
};

export default SelectOfficePage; 