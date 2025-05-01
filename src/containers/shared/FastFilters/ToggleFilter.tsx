import React, { useRef, useState, useEffect } from "react";
import { DropdownContainer, DropdownButton, DropdownMenu, DropdownItem } from "./styled";
import { FlexBox } from "../../../ui";

export interface ToggleFilterProps {
  filters: { label: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const ToggleFilter: React.FC<ToggleFilterProps> = ({
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

  const selectedLabel =
    filters.find((f) => f.value === selected)?.label || placeholder;

  const handleSelect = (value: string) => {
    if (selected === value) {
      onSelect("");
    } else {
      onSelect(value);
    }
    setOpen(false);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect("");
  };

  return (
    <DropdownContainer ref={ref}>
      <DropdownButton
        type="button"
        active={!!selected}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{selectedLabel}</span>
        <FlexBox gap={3}>
          <span>▼</span>
          {!!selected && (
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
              active={selected === filter.value}
              onClick={() => handleSelect(filter.value)}
            >
              {filter.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};