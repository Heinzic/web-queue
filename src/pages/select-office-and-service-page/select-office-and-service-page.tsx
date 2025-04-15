import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAmountOfPackages, setSelectedOffice, setSelectedService } from '../../store/appointmentSlice';
import { Title, SearchInput, theme, FlexBox, FastFilters, Text } from '../../ui';
import { Breadcrumbs, BreadcrumbItem, BreadcrumbSeparator } from '../../components/appointment/Breadcrumbs';
import { Tabs, TabItem } from '../../components/appointment/Tabs';
import { Office, Service } from '../../models';
import { OfficesList } from '../../components/appointment';
import { Container } from '../../components/general';
import { ServicesList } from '../../components/appointment/ServicesList';
import { ArrowBackIcon, PackagesAmountButton, ResetButton } from './styled';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const filtersList = {name: ["МВД", "Росреестр"], city: ["Екатеринбург", "Спб"]};
const SelectOfficeAndServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedLocation = searchParams.get('location') || 'г. Екатеринбург';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("places");
  
  const dispatch = useAppDispatch();
  const { selectedOffice, selectedService, amountOfPackages } = useAppSelector(state => state.appointment);

  const {data: offices, isLoading, error} = useQuery({
    queryKey: ['offices'],
    queryFn: async (): Promise<Office[]> => {
      const response = await axios.get<{ offices: Office[] }>('http://localhost:5173/api/offices');
      return response.data.offices;
    }
  })
  
  // Filter offices based on search query and selected service
  const filteredOffices = offices
    ?.filter(office => {
      // Filter by search query
      const matchesSearch = !searchQuery || 
        office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        office.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by selected service if one is selected
      const matchesService = !selectedService || 
        office.lines.some(line => line.serviceId === selectedService.id);
      
      return matchesSearch && matchesService;
    });

    // function filterOffices(
    //   offices: Office[],
    //   filters: typeof filtersList,
    //   searchQuery: string,
    //   selectedService?: { id: number }
    // ) {
    //   return offices.filter(office => {
    //     // 1. Handle search query
    //     const matchesSearch = !searchQuery || 
    //       Object.values(office).some(
    //         val => typeof val === 'string' && 
    //         val.toLowerCase().includes(searchQuery.toLowerCase())
    //       );
    
    //     // 2. Handle service filter
    //     const matchesService = !selectedService || 
    //       office.lines.some(line => line.serviceId === selectedService.id);
    
    //     // 3. Handle dynamic filters from filtersList
    //     const matchesFilters = Object.entries(filters).every(([key, allowedValues]) => {
    //       if (!allowedValues || allowedValues.length === 0) return true;
    
    //       // Convert office[key] to string for comparison
    //       const officeValue = office[key as keyof typeof office];
    //       return allowedValues.includes(String(officeValue)); // Convert to string
    //     });
    
    //     return matchesSearch && matchesService && matchesFilters;
    //   });
    // }

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

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error.message}</div>

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
        <FlexBox justify="space-between" align="center">
          <FastFilters options={filtersList.name} selectedOption={activeTab} onSelect={handleTabChange} />
          <FlexBox align="center" gap={2}>
            <Text size="sm">Количество пакетов документов</Text>
            <PackagesAmountButton onClick={() => dispatch(setAmountOfPackages(amountOfPackages - 1))} disabled={amountOfPackages === 1}>
              <Text size="xl" color={amountOfPackages === 1 ? 'muted' : 'primary'}>−</Text>
            </PackagesAmountButton>
            <Text size="sm">{amountOfPackages}</Text>
            <PackagesAmountButton onClick={() => dispatch(setAmountOfPackages(amountOfPackages + 1))}>
              <Text size="xl" color="primary">+</Text>
            </PackagesAmountButton>
          </FlexBox>
        </FlexBox>
        <div>
          {activeTab === "places" && (
            <FlexBox direction="column" gap={3}>
              {filteredOffices && filteredOffices.length > 0 ? (
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

export default SelectOfficeAndServicePage; 