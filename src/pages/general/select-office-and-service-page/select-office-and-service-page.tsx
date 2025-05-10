
import { useState, useMemo, useEffect } from 'react';
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
import { AnimatePresence, motion } from "motion/react"
import { getDistance } from '../../../utils/getDistance';

const SelectOfficeAndServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedLocation = searchParams.get('location') || 'Екатеринбург';  
  
  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("places");
  const [companyFilter, setCompanyFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>(selectedLocation);
  const [districtFilter, setDistrictFilter] = useState<string>('');
  const [officeTypeFilter, setOfficeTypeFilter] = useState<string>('');
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);

  // --- Service filters ---
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('');
  const [serviceIsOnlineFilter, setServiceIsOnlineFilter] = useState<string>(''); // "true" | "false" | ""
  const [serviceTagsFilter, setServiceTagsFilter] = useState<string[]>([]);
  // For price, you might want a range slider, but for simplicity, let's use price groups:
  const [servicePriceFilter, setServicePriceFilter] = useState<string>(''); // e.g. "free", "low", "medium", "high"

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => console.warn("Геолокация отключена:", err.message)
    );    
  }, []);

  // Dynamically generate office filter options from server data
  const {
    companyOptions,
    cityOptions,
    districtOptions,
    officeTypeOptions,
    tagsOptions
  } = useMemo(() => {
    const companies = new Set<string>();
    const cities = new Set<string>();
    const districts = new Set<string>();
    const officeTypes = new Set<string>();
    const tagsSet = new Set<string>();

    officesData?.forEach(group => {
      companies.add(group.companyName);
      group.offices.forEach(office => {
        if (office.city) cities.add(office.city);
        if (office.district) districts.add(office.district);
        if (office.type) officeTypes.add(office.type);
        if (office.isAccessible) tagsSet.add("accessible");
        if (office.hasParking) tagsSet.add("parking");
        if (office.worksOnWeekends) tagsSet.add("weekend");
      });
    });

    // Tag labels
    const tagLabels: Record<string, string> = {
      accessible: "Доступно для инвалидов",
      parking: "Есть парковка",
      weekend: "Работает по выходным",
    };

    return {
      companyOptions: Array.from(companies).map(label => ({ label, value: label })),
      cityOptions: Array.from(cities).map(label => ({ label, value: label })),
      districtOptions: Array.from(districts).map(label => ({ label, value: label })),
      officeTypeOptions: Array.from(officeTypes).map(label => ({ label, value: label })),
      tagsOptions: Array.from(tagsSet).map(tag => ({
        label: tagLabels[tag] || tag,
        value: tag,
      })),
    };
  }, [officesData]);

  // --- Service filter options ---
  const {
    serviceCategoryOptions,
    serviceTypeOptions,
    serviceIsOnlineOptions,
    serviceTagsOptions,
    servicePriceOptions
  } = useMemo(() => {
    const categories = new Set<string>();
    const types = new Set<string>();
    const tagsSet = new Set<string>();
    let hasOnline = false;
    let hasOffline = false;
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    services?.forEach(service => {
      if (service.category) categories.add(service.category);
      if (service.type) types.add(service.type);
      if (service.tags) service.tags.forEach(tag => tagsSet.add(tag));
      if (service.isOnline === true) hasOnline = true;
      if (service.isOnline === false) hasOffline = true;
      if (typeof service.price === "number") {
        minPrice = Math.min(minPrice, service.price);
        maxPrice = Math.max(maxPrice, service.price);
      }
    });

    // Price groups (example: free, low, medium, high)
    const priceOptions = [
      { label: "Бесплатно", value: "free" },
      { label: "До 500₽", value: "low" },
      { label: "500₽ - 1000₽", value: "medium" },
      { label: "1000₽ и выше", value: "high" }
    ];

    // Online/offline options
    const isOnlineOptions = [
      ...(hasOnline ? [{ label: "Онлайн", value: "true" }] : []),
      ...(hasOffline ? [{ label: "Очная", value: "false" }] : [])
    ];

    return {
      serviceCategoryOptions: Array.from(categories).map(label => ({ label, value: label })),
      serviceTypeOptions: Array.from(types).map(label => ({ label, value: label })),
      serviceIsOnlineOptions: isOnlineOptions,
      serviceTagsOptions: Array.from(tagsSet).map(tag => ({ label: tag, value: tag })),
      servicePriceOptions: priceOptions
    };
  }, [services]);

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

  const filteredOffices = Object.entries(groupedOffices).map(([companyName, offices]) => {
    const updatedOffices = offices
      .map(office => {
        const distance = userCoords
          ? getDistance(userCoords.lat, userCoords.lon, office.lat, office.lon)
          : undefined;
        return { ...office, distance };
      })
      .filter(office => {
        const matchesSearch = !searchQuery ||
          office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          office.address.toLowerCase().includes(searchQuery.toLowerCase());
  
        const matchesService = !selectedService ||
          office.lines.some(line => line.serviceId === selectedService.id);
  
        const matchesCompany = !companyFilter || companyName === companyFilter;
        const matchesCity = !cityFilter || office.city === cityFilter;
        const matchesDistrict = !districtFilter || office.district === districtFilter;
        const matchesOfficeType = !officeTypeFilter || office.type === officeTypeFilter;
        const matchesTags =
          tagsFilter.length === 0 ||
          tagsFilter.every(tag => {
            if (tag === 'accessible') return office.isAccessible;
            if (tag === 'parking') return office.hasParking;
            if (tag === 'weekend') return office.worksOnWeekends;
            return true;
          });
  
        return matchesSearch && matchesService && matchesCompany && matchesCity && matchesDistrict && matchesOfficeType && matchesTags;
      });
  
    // Сортировка по расстоянию, если доступно
    if (userCoords) {
      updatedOffices.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
    }
  
    return {
      companyName,
      offices: updatedOffices
    };
  }).filter(group => group.offices.length > 0);
  

  const filteredServices = services?.filter(service => {
    const matchesSearch = !searchQuery || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesOffice = !selectedOffice || 
      service.officeIds.some(officeId => officeId === selectedOffice.id);

    const matchesCategory = !serviceCategoryFilter || service.category === serviceCategoryFilter;
    const matchesType = !serviceTypeFilter || service.type === serviceTypeFilter;
    const matchesIsOnline =
      !serviceIsOnlineFilter ||
      (serviceIsOnlineFilter === "true" && service.isOnline === true) ||
      (serviceIsOnlineFilter === "false" && service.isOnline === false);

    const matchesTags =
      serviceTagsFilter.length === 0 ||
      (service.tags && serviceTagsFilter.every(tag => service.tags?.includes(tag)));

    // Price filter
    let matchesPrice = true;
    if (servicePriceFilter) {
      if (servicePriceFilter === "free") matchesPrice = service.price === 0;
      else if (servicePriceFilter === "low") matchesPrice = service.price !== undefined && service.price > 0 && service.price < 500;
      else if (servicePriceFilter === "medium") matchesPrice = service.price !== undefined && service.price >= 500 && service.price < 1000;
      else if (servicePriceFilter === "high") matchesPrice = service.price !== undefined && service.price >= 1000;
    }

    return (
      matchesSearch &&
      matchesOffice &&
      matchesCategory &&
      matchesType &&
      matchesIsOnline &&
      matchesTags &&
      matchesPrice
    );
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
          <BreadcrumbItem to={nav.general.appointmentDateTime()}>Запись на прием</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem to={nav.general.selectLocation()}>Выбор населенного пункта</BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem>Запись в отделы города {cityFilter ? cityFilter : 'Екатеринбург'}</BreadcrumbItem>
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
        {activeTab === "places" && (
        <motion.div
          layout
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
        >
          <AnimatePresence>
            <motion.div key="city" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FastFilters
                filters={cityOptions}
                selected={cityFilter}
                onSelect={value => setCityFilter(typeof value === "string" ? value : "")}
                type="toggle"
                placeholder="Город"
              />
            </motion.div>
            <motion.div key="company" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FastFilters
                filters={companyOptions}
                selected={companyFilter}
                onSelect={value => setCompanyFilter(typeof value === "string" ? value : "")}
                type="toggle"
                placeholder="Компания"
              />
            </motion.div>
            <motion.div key="district" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FastFilters
                filters={districtOptions}
                selected={districtFilter}
                onSelect={value => setDistrictFilter(typeof value === "string" ? value : "")}
                type="toggle"
                placeholder="Район"
              />
            </motion.div>
            <motion.div key="type" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FastFilters
                filters={officeTypeOptions}
                selected={officeTypeFilter}
                onSelect={value => setOfficeTypeFilter(typeof value === "string" ? value : "")}
                type="toggle"
                placeholder="Тип офиса"
              />
            </motion.div>
            <motion.div key="tags" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FastFilters
                filters={tagsOptions}
                selected={tagsFilter}
                onSelect={value => setTagsFilter(Array.isArray(value) ? value : [])}
                type="multiple"
                placeholder="Особенности"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        )}

        {activeTab === "services" && (
          <motion.div
            layout
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <AnimatePresence>
              <motion.div key="category" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                <FastFilters
                  filters={serviceCategoryOptions}
                  selected={serviceCategoryFilter}
                  onSelect={value => setServiceCategoryFilter(typeof value === "string" ? value : "")}
                  type="toggle"
                  placeholder="Категория"
                />
              </motion.div>
              <motion.div key="type" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                <FastFilters
                  filters={serviceTypeOptions}
                  selected={serviceTypeFilter}
                  onSelect={value => setServiceTypeFilter(typeof value === "string" ? value : "")}
                  type="toggle"
                  placeholder="Тип услуги"
                />
              </motion.div>
              <motion.div key="format" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                <FastFilters
                  filters={serviceIsOnlineOptions}
                  selected={serviceIsOnlineFilter}
                  onSelect={value => setServiceIsOnlineFilter(typeof value === "string" ? value : "")}
                  type="toggle"
                  placeholder="Формат"
                />
              </motion.div>
              <motion.div key="price" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                <FastFilters
                  filters={servicePriceOptions}
                  selected={servicePriceFilter}
                  onSelect={value => setServicePriceFilter(typeof value === "string" ? value : "")}
                  type="toggle"
                  placeholder="Стоимость"
                />
              </motion.div>
              <motion.div key="tags" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                <FastFilters
                  filters={serviceTagsOptions}
                  selected={serviceTagsFilter}
                  onSelect={value => setServiceTagsFilter(Array.isArray(value) ? value : [])}
                  type="multiple"
                  placeholder="Особенности"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        <div>
          {activeTab === "places" && (
            <FlexBox direction="column" gap={3}>
              {filteredOffices && filteredOffices.length > 0 ? (
                <AnimatePresence>
                  {filteredOffices.map(group => (
                    <div className="">
                      <Title size='small' marginBottom={3}>{group.companyName}</Title>
                        <motion.div
                          key={group.companyName}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <OfficesList offices={group.offices} 
                            selectedOfficeId={selectedOffice?.id}
                            onOfficeSelect={handleOfficeSelect}
                          />
                      </motion.div>
                    </div>
                  ))}
                </AnimatePresence>
                
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
