import React from 'react';
import styled from '@emotion/styled';
import { theme } from './theme/theme';

interface FastFiltersProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? theme.colors.secondary.main : theme.colors.neutral.gray[200])};
  color: ${({ active }) => (active ? theme.colors.neutral.gray[200] : theme.colors.neutral.black)};
  border: 1px solid ${theme.colors.neutral.gray[400]};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  margin: ${theme.spacing[0]} ${theme.spacing[1]};
  cursor: pointer;
  font-weight: ${theme.typography.fontWeight.semibold};

  &:hover {
    border: 1px solid ${theme.colors.neutral.black};
  }
`;

export const FastFilters: React.FC<FastFiltersProps> = ({ options, selectedOption, onSelect }) => {
  return (
    <div>
      {options.map((option) => (
        <FilterButton
          key={option}
          active={option === selectedOption}
          onClick={() => onSelect(option)}
        >
          {option}
        </FilterButton>
      ))}
    </div>
  );
};
