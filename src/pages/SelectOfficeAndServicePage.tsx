import { useState } from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Service, setSelectedOffice, setSelectedService } from '../store/appointmentSlice';
import { Title, SearchInput, theme, FlexBox } from '../ui';
import { Breadcrumbs, BreadcrumbItem, BreadcrumbSeparator } from '../components/appointment/Breadcrumbs';
import { Tabs, TabItem } from '../components/appointment/Tabs';
import { Office } from '../models';
import { OfficesList } from '../components/appointment';
import { Container, ServicesList } from '../components/general';

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
    address: "Дублёр Сибирского тракта, 2 (ТРК \"КомсоМолл\")",
    workingHours: "С 9:00 до 20:00",
    distance: "200 м",
    services: [1, 2, 3] // Service IDs that this office provides
  },
  {
    id: 2,
    name: "МФЦ, ул. Рощинская, 21",
    city: "Екатеринбург",
    address: "ул. Рощинская, 21",
    workingHours: "С 9:00 до 20:00",
    distance: "800 м",
    services: [1, 2] // Service IDs that this office provides
  },
  {
    id: 3,
    name: "МФЦ, ул. Учителей, 25",
    city: "Екатеринбург",
    address: "ул. Учителей, 25",
    workingHours: "С 9:00 до 20:00",
    distance: "3,2 км",
    services: [1, 3] // Service IDs that this office provides
  },
  {
    id: 4,
    name: "МФЦ, ул. Бориса Ельцина, 3",
    city: "Екатеринбург",
    address: "ул. Бориса Ельцина, 3",
    workingHours: "С 9:00 до 20:00",
    distance: "6,8 км",
    services: [2, 3] // Service IDs that this office provides
  },
  {
    id: 5,
    name: "МФЦ, ул. Героев России, 2 (ТДЦ Свердловск)",
    city: "Екатеринбург",
    address: "ул. Героев России, 2 (ТДЦ Свердловск)",
    workingHours: "С 9:00 до 20:00",
    distance: "7,5 км",
    services: [1, 2, 3] // Service IDs that this office provides
  }
];

const SelectOfficePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedLocation = searchParams.get('location') || 'г. Екатеринбург';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("places");
  
  const dispatch = useAppDispatch();
  const { selectedOffice, selectedService } = useAppSelector(state => state.appointment);
  
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
    setActiveTab("services");
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
    <Container maxWidth={800}>
      <FlexBox direction="column" gap={1}>
        <Breadcrumbs>
          <BreadcrumbItem to="/">Главная</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem to="/">Услуги</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem to="/">Запись на прием</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem>Запись в отделы города {selectedLocation}</BreadcrumbItem>
        </Breadcrumbs>
        <Title 
          size="large" 
          marginBottom={4}
          color="#333"
        >
          Запись на прием
        </Title>
        
        <Tabs>
          <TabItem 
            active={activeTab === "places"} 
            onClick={() => handleTabChange("places")}
          >
            Места
          </TabItem>
          <TabItem 
            active={activeTab === "services"} 
            onClick={() => handleTabChange("services")}
          >
            Услуги
          </TabItem>
        </Tabs>
      
        <FlexBox justify="space-between" align="center">
          <ArrowBackIcon onClick={() => {
            dispatch(setSelectedOffice(null)); 
            dispatch(setSelectedService(null));
            navigate('/');
            }}>
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
        </FlexBox>
        
        <div>
          {activeTab === "places" && (
            <FlexBox direction="column" gap={3}>
              {filteredOffices.length > 0 ? (
                <OfficesList 
                  offices={filteredOffices} 
                  selectedOfficeId={selectedOffice?.id}
                  onOfficeSelect={handleOfficeSelect}
                />
              ) : (
                <div style={{ padding: theme.spacing[4], textAlign: 'center', color: theme.colors.neutral.gray[600] }}>
                  {selectedService 
                    ? `Нет офисов, предоставляющих услугу "${selectedService.name}"`
                    : "Нет офисов, соответствующих поиску"
                  }
                </div>
              )}
            </FlexBox>
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
      </FlexBox>
    </Container>
  );
};

export default SelectOfficePage; 