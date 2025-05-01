import React, { useRef, useState, useEffect } from "react";
import { DropdownContainer, DropdownButton, DropdownMenu, DropdownItem, Checkbox } from "./styled";
import { FlexBox } from "../../../ui";

export interface MultipleFilterProps {
  filters: { label: string; value: string }[];
  selected: string[];
  onSelect: (value: string[]) => void;
  placeholder?: string;
}

export const MultipleFilter: React.FC<MultipleFilterProps> = ({
  filters,
  selected,
  onSelect,
  placeholder = "Выберите",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  let selectedLabel = placeholder;
  if (selected.length === 1) {
    selectedLabel = filters.find((f) => f.value === selected[0])?.label || placeholder;
  } else if (selected.length > 1) {
    selectedLabel = `${selected.length} выбрано`;
  }

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      const newSelected = selected.filter((v) => v !== value);
      onSelect(newSelected);
    } else {
      onSelect([...selected, value]);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect([]);
  };

  return (
    <DropdownContainer ref={ref}>
      <DropdownButton
        type="button"
        active={selected.length > 0}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{selectedLabel}</span>
        <FlexBox gap={3}>
          <span>▼</span>
          {selected.length > 0 && (
            <span
              onClick={handleReset}
              title="Сбросить"
            >
              ×
            </span>
          )}
        </FlexBox>
        
      </DropdownButton>
      {open && (
        <DropdownMenu>
          {filters.map((filter) => (
            <DropdownItem
              key={filter.value}
              active={selected.includes(filter.value)}
              onClick={() => handleSelect(filter.value)}
            >
              <Checkbox
                type="checkbox"
                checked={selected.includes(filter.value)}
                readOnly
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
              />
              {filter.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};