import React from "react";
import { ToggleFilter } from "./ToggleFilter";
import { MultipleFilter } from "./MultipleFilter";

type FilterType = "toggle" | "multiple";

export interface FastFiltersProps {
  filters: { label: string; value: string }[];
  selected: string | string[];
  onSelect: (value: string | string[]) => void;
  type?: FilterType;
  placeholder?: string;
}

export const FastFilters: React.FC<FastFiltersProps> = ({
  filters,
  selected,
  onSelect,
  type = "toggle",
  placeholder,
}) => {
  if (type === "multiple") {
    return (
      <MultipleFilter
        filters={filters}
        selected={Array.isArray(selected) ? selected : []}
        onSelect={(v) => onSelect(v)}
        placeholder={placeholder}
      />
    );
  }
  // Default to toggle
  return (
    <ToggleFilter
      filters={filters}
      selected={typeof selected === "string" ? selected : ""}
      onSelect={(v) => onSelect(v)}
      placeholder={placeholder}
    />
  );
};