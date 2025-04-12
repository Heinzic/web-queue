import React from 'react';
import { FlexBox } from '../../ui';
import { OfficeCard } from './OfficeCard';
import { Office } from '../../models';

interface OfficesListProps {
  offices: Office[];
  selectedOfficeId?: number;
  onOfficeSelect?: (office: Office) => void;
}

export const OfficesList: React.FC<OfficesListProps> = ({ 
  offices,
  selectedOfficeId,
  onOfficeSelect
}) => {
  return (
    <FlexBox direction="column" gap={3}>
      {offices.map((office) => (
        <OfficeCard
          key={office.id}
          office={office}
          isSelected={selectedOfficeId === office.id}
          onClick={() => onOfficeSelect && onOfficeSelect(office)}
        />
      ))}
    </FlexBox>
  );
};