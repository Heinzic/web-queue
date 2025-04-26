import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedService } from '../../store/slices/appointmentSlice';
import { Service } from '../../models';

const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[0]};
`;

const ServiceCard = styled.div<{ isSelected?: boolean }>`
  display: flex;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
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
  margin-right: ${({ theme }) => theme.spacing[3]};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const ServiceDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral.gray[600]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: #F44336;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  margin-left: auto;
  
  &:hover {
    text-decoration: underline;
  }
`;

interface ServicesListProps {
  services: Service[];
  showSearch?: boolean;
  onServiceSelect?: (service: Service) => void;
  onResetService?: () => void;
}

export const ServicesList: React.FC<ServicesListProps> = ({ 
  services,
  showSearch = true, 
  onServiceSelect,
  onResetService,
}) => {
  const dispatch = useAppDispatch();
  const { selectedService } = useAppSelector(state => state.appointment);
  const theme = useTheme(); // Access the theme using useTheme

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
        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            isSelected={selectedService?.id === service.id}
            onClick={() => handleServiceSelect(service)}
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