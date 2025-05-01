import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelectedOffice, setSelectedService } from '../../../store/slices/appointmentSlice';
import { Title, SearchInput, FlexBox } from '../../../ui';
import { Breadcrumbs, BreadcrumbItem, BreadcrumbSeparator } from '../../../components/appointment/Breadcrumbs';
import { Tabs, TabItem } from '../../../components/appointment/Tabs';
import { Office, OfficeServerResponse, Service } from '../../../models';
import { OfficesList } from '../../../components/appointment';
import { Container } from '../../../components/shared';
import { ServicesList } from '../../../components/appointment/ServicesList';
import { ArrowBackIcon, ResetButton } from './styled';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../../../provider/client';
import { nav } from '../../../pages';
import { FastFilters } from '../../../containers/shared/FastFilters/FastFilters';

const companyOptions = [
  { label: "МФЦ", value: "МФЦ" },
  { label: "ПМПК Ресурс", value: "ПМПК Ресурс" },
];
const cityOptions = [
  { label: "Екатеринбург", value: "Екатеринбург" },
  { label: "Спб", value: "Спб" },
];
const tagsOptions = [
  { label: "Доступно для инвалидов", value: "accessible" },
  { label: "Есть парковка", value: "parking" },
  { label: "Работает по выходным", value: "weekend" },
];

const SelectOfficeAndServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedLocation = searchParams.get('location') || 'Екатеринбург';  
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("places");
  const [companyFilter, setCompanyFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>(selectedLocation);
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  
  const dispatch = useAppDispatch();
  const { selectedOffice, selectedService } = useAppSelector(state => state.appointment);  

  const { data: officesData, isLoading: isLoadingOffice, error: officeError } = useQuery({
    queryKey: ['offices'],
    queryFn: async (): Promise<OfficeServerResponse[]> => {
      const response = await instance.get<OfficeServerResponse[]>('/api/offices');
      return response.data;
    }
  });
  
  const { data: services, isLoading: isServicesLoading, error: servicesError } = useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<Service[]> => {
      const response = await instance.get<{ services: Service[] }>('/api/services');
      return response.data.services;
    }
  });

  const allOffices = officesData?.flatMap(response => response.offices.map(office => ({
    ...office,
    companyName: response.companyName
  }))) || [];

  const groupedOffices = allOffices.reduce((acc, office) => {
    const companyName = office.companyName || "Другие";
    if (!acc[companyName]) {
      acc[companyName] = [];
    }
    acc[companyName].push(office);
    return acc;
  }, {} as Record<string, Office[]>);

  const filteredOffices = Object.entries(groupedOffices).map(([companyName, offices]) => ({
    companyName,
    offices: offices.filter(office => {
      const matchesSearch = !searchQuery || 
        office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        office.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesService = !selectedService || 
        office.lines.some(line => line.serviceId === selectedService.id);

      const matchesCompany = !companyFilter || companyName === companyFilter;
      const matchesCity = !cityFilter || office.city === cityFilter;
      
      const matchesTags = !tagsFilter || tagsFilter.length === 0 || tagsFilter.every(tag => {
        if (tag === 'accessible') return office.isAccessible;
        if (tag === 'parking') return office.hasParking;
        if (tag === 'weekend') return office.worksOnWeekends;
        return true;
      });
      
      return matchesSearch && matchesService && matchesCompany && matchesCity && matchesTags;
    })
  })).filter(group => group.offices.length > 0);

  const filteredServices = services?.filter(service => {
    const matchesSearch = !searchQuery || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesOffice = !selectedOffice || 
      service.officeIds.some(officeId => officeId === selectedOffice.id);

    return matchesSearch && matchesOffice;
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

  const handleTabChange = (tab: string) => {
    if (tab === "services" && activeTab === "places" && !selectedOffice) {
      dispatch(setSelectedOffice(null));
    }
    setSearchQuery("");
    setActiveTab(tab);
  };

  if (isLoadingOffice || isServicesLoading) return <div>Загрузка...</div>;
  if (officeError || servicesError) return <div>Ошибка: {officeError?.message || servicesError?.message}</div>;

  return (
    <Container maxWidth={800}>
      <FlexBox direction="column" gap={1}>
        <Breadcrumbs>
          <BreadcrumbItem to={nav.general.index()}>Главная</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem to={nav.general.selectLocation()}>Услуги</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem to={nav.general.appointmentDateTime()}>Запись на прием</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem>Запись в отделы города {cityFilter? cityFilter: 'Екатеринбург'}</BreadcrumbItem>
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
            navigate(nav.general.index());
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ArrowBackIcon>
          {selectedOffice ? (
            <>
              <div style={{ padding: "8px 0", fontWeight: 500 }}>
                {selectedOffice.name} {selectedOffice.address}
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
        <FlexBox gap={1}>
          <FastFilters
            filters={cityOptions}
            selected={cityFilter}
            onSelect={(value) => setCityFilter(value as string)}
            type="toggle"
            placeholder="Город"
          />
          <FastFilters
            filters={companyOptions}
            selected={companyFilter}
            onSelect={(value) => setCompanyFilter(value as string)}
            type="toggle"
            placeholder="Компания"
          />
          <FastFilters
            filters={tagsOptions}
            selected={tagsFilter}
            onSelect={(value) => setTagsFilter(value as string[])}
            type="multiple"
            placeholder="Специальные условия"
          />
        </FlexBox>
       <div>
          {activeTab === "places" && (
            <FlexBox direction="column" gap={3}>
              {filteredOffices && filteredOffices.length > 0 ? (
                filteredOffices.map(group => (
                  <div key={group.companyName}>
                    <Title size='small' marginBottom={3}>{group.companyName}</Title>
                    <OfficesList offices={group.offices} 
                      selectedOfficeId={selectedOffice?.id}
                      onOfficeSelect={handleOfficeSelect}
                    />
                  </div>
                ))
              ) : (
                <FlexBox justify='center'>
                  {selectedService 
                    ? `Нет офисов, предоставляющих услугу "${selectedService.name}"`
                    : "Нет офисов, соответствующих поиску"
                  }
                </FlexBox>
              )}
            </FlexBox>
          )}
          
          {activeTab === "services" && (
            filteredServices && filteredServices.length > 0 ? 
            (<ServicesList 
              services={filteredServices || []}
              showSearch={false}
              onServiceSelect={handleServiceSelect}
              onResetService={handleResetService}
            />) : (
              <FlexBox justify='center'>
                  {selectedOffice
                    ? `Нет услуг, предоставляемых ${selectedOffice.name} ${selectedOffice.address}`
                    : "Нет услуг, соответствующих поиску"
                  }
              </FlexBox>
            )
          )}
        </div> 
        </FlexBox>
    </Container>
  );
};

export default SelectOfficeAndServicePage;
