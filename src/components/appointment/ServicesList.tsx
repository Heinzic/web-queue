import React, { useState } from 'react';
import styled from '@emotion/styled';
import { theme, SearchInput } from '../../ui';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedService } from '../../store/appointmentSlice';
import { Service } from '../../models';

const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
  margin-top: ${theme.spacing[0]};
`;

const ServiceCard = styled.div<{ isSelected?: boolean }>`
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

const ServiceIcon = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 8px;
  background-color: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing[3]};
  color: white;
  font-weight: ${theme.typography.fontWeight.bold};
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.div`
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing[1]};
`;

const ServiceDescription = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.neutral.gray[600]};
  margin-bottom: ${theme.spacing[2]};
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: #F44336;
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  margin-left: auto;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Mock services data
const mockServices = [
  {
    id: 1,
    name: "Физические лица",
    description: "Регистрация, получение документов и другие услуги для физических лиц",
  },
  {
    id: 2,
    name: "Юридические лица",
    description: "Регистрация ООО, ИП и другие услуги для бизнеса",
  },
  {
    id: 3,
    name: "Биометрия",
    description: "Сдача биометрических данных, получение биометрических документов",
  }
];

interface ServicesListProps {
  showSearch?: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onServiceSelect?: (service: Service) => void;
  onResetService?: () => void;
  switchTabAfterSelect?: boolean;
}

export const ServicesList: React.FC<ServicesListProps> = ({ 
  showSearch = true, 
  searchQuery: externalSearchQuery,
  setSearchQuery: externalSetSearchQuery,
  onServiceSelect,
  onResetService,
}) => {
  // Use internal state only if external search props are not provided
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const { selectedService } = useAppSelector(state => state.appointment);
  
  // Use external search state if provided, otherwise use internal
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = externalSetSearchQuery || setInternalSearchQuery;
  
  const filteredServices = searchQuery 
    ? mockServices.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : mockServices;

  const handleServiceSelect = (service: Service) => {
    dispatch(setSelectedService(service));
    
    // Call the parent's onServiceSelect if provided
    if (onServiceSelect) {
      onServiceSelect(service);
    }
  };

  const handleResetService = () => {
    dispatch(setSelectedService(null));
    
    // Call the parent's onResetService if provided
    if (onResetService) {
      onResetService();
    }
  };

  return (
    <>
      {showSearch && !selectedService && (
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск услуги"
          showIcon
        />
      )}
      
      {showSearch && selectedService && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing[3] }}>
          <div style={{ padding: "8px 0", fontWeight: 500 }}>
            {selectedService.name}
          </div>
          <ResetButton onClick={handleResetService}>
            Сбросить
          </ResetButton>
        </div>
      )}
      
      <ServicesContainer>
        {filteredServices.map((service) => (
          <ServiceCard 
            key={service.id}
            isSelected={selectedService?.id === service.id}
            onClick={() => handleServiceSelect(service as Service)}
          >
            <ServiceIcon>У</ServiceIcon>
            <ServiceInfo>
              <ServiceName>{service.name}</ServiceName>
              {service.description && (
                <ServiceDescription>{service.description}</ServiceDescription>
              )}
            </ServiceInfo>
          </ServiceCard>
        ))}
      </ServicesContainer>
    </>
  );
};