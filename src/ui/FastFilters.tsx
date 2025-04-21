import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// Types
interface FastFiltersProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: 'places' | 'services') => void;
}

// Styled Components
const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${({ active, theme }) => (active ? theme.colors.secondary.main : theme.colors.neutral.gray[200])};
  color: ${({ active, theme }) => (active ? theme.colors.neutral.gray[200] : theme.colors.neutral.black)};
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  margin: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[1]}`};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.neutral.black};
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// FastFilters Component
export const FastFilters: React.FC<FastFiltersProps> = ({ options, selectedOption, onSelect }) => {
  const theme = useTheme();

  return (
    <FiltersContainer>
      {options.map((option) => (
        <FilterButton
          key={option}
          active={option === selectedOption}
          onClick={() => onSelect(option as 'places' | 'services')}
          theme={theme}
        >
          {option}
        </FilterButton>
      ))}
    </FiltersContainer>
  );
};

export default FastFilters;