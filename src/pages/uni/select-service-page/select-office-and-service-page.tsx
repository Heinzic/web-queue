import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { setSelectedOffice, setSelectedService } from '../../../store/slices/appointmentSlice';
import { Title, SearchInput, FlexBox } from '../../../ui';
import { Breadcrumbs, BreadcrumbItem, BreadcrumbSeparator } from '../../../components/appointment/Breadcrumbs';
import { Tabs, TabItem } from '../../../components/appointment/Tabs';
import { Service } from '../../../models';
import { Container } from '../../../components/shared';
import { ServicesList } from '../../../components/appointment/ServicesList';
import { ArrowBackIcon } from './styled';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../../provider/client';
import { nav } from '../..';

const SelectServicePage = () => {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("services");
  
  const dispatch = useAppDispatch();
  
  const { data: services, isLoading: isServicesLoading, error: servicesError } = useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<Service[]> => {
      const response = await instance.get<{ services: Service[] }>('/api/uni/services');
      return response.data.services;
    }
  });

  const filteredServices = services?.filter(service => {
    const matchesSearch = !searchQuery || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  const handleResetService = () => {
    dispatch(setSelectedService(null));
    setActiveTab("services");
  };

  const handleServiceSelect = (service: Service) => {
    dispatch(setSelectedOffice({
      name: "Деканат ИРИТ-РТФ",
      address: "ул. Мира 32",
      city: "Екатеринбург",
      id: "uni",
      lines: [],
      timeZoneId: "Ekaterinburg Standard Time",
      nearestDate: 1744705200000,
      active: false,
      lat: 0,
      lon: 0
    }))
    dispatch(setSelectedService(service))
    nav.uni.appointmentDateTime()
  }

  if (isServicesLoading) return <div>Загрузка...</div>;
  if (servicesError) return <div>Ошибка: {servicesError?.message}</div>;

  return (
    <Container maxWidth={800}>
      <FlexBox direction="column" gap={1}>
        <Breadcrumbs>
          <BreadcrumbItem to={nav.uni.index()}>Главная</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem>Запись в деканат ИРИТ-РТФ</BreadcrumbItem>
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
            active={activeTab === "services"} 
            onClick={() => {}}
          >
            Услуги
          </TabItem>
        </Tabs>
      
        <FlexBox justify="space-between" align="center">
          <ArrowBackIcon onClick={() => {
            dispatch(setSelectedOffice(null)); 
            dispatch(setSelectedService(null));
            navigate(nav.uni.index());
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ArrowBackIcon>
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск услуги"
            marginBottom={0}
            showIcon
          />
        </FlexBox>
        <div>
          <ServicesList 
              services={filteredServices || []}
              showSearch={false}
              onServiceSelect={handleServiceSelect}
              onResetService={handleResetService}
            />
          </div> 
        </FlexBox>
    </Container>
  );
};

export default SelectServicePage;