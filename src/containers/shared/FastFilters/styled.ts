import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

export const FilterButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => active 
    ? theme.colors.primary.main 
    : theme.colors.neutral.white};
  color: ${({ active, theme }) => active 
    ? theme.colors.neutral.white 
    : theme.colors.neutral.gray[700]};
  border: 1px solid ${({ active, theme }) => active 
    ? theme.colors.primary.main 
    : theme.colors.neutral.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 8px 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${({ active }) => active 
    ? '0 4px 12px rgba(0, 0, 0, 0.08)' 
    : 'none'};
  transform-origin: center;

  &:hover {
    transform: ${({ active }) => !active && 'translateY(-1px)'};
    box-shadow: ${({ active, theme }) => !active && 
      `0 3px 8px ${theme.colors.primary.light}`};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  min-width: 100px;
`;

export const DropdownButton = styled.button<{ active: boolean }>`
  background: ${({ theme, active }) => active? theme.colors.primary.light: theme.colors.neutral.white};
  color: ${({ theme, active }) => active? theme.colors.neutral.white: theme.colors.neutral.black};
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  box-shadow: ${({ active }) => active 
    ? '0 4px 12px rgba(0, 0, 0, 0.08)' 
    : '0 2px 4px rgba(0, 0, 0, 0.04)'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  }

  svg {
    transition: transform 0.2s ease;
    transform: rotate(${({ active }) => (active ? '180deg' : '0')});
    margin-left: 8px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.neutral.white};
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 240px;
  padding: 8px;
  animation: ${fadeIn} 0.2s ease-out, ${scaleUp} 0.15s ease;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.85);
`;

export const DropdownItem = styled.div<{ active: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  background: ${({ active, theme }) => 
    active ? theme.colors.primary.light : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.neutral.white : theme.colors.neutral.black};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  transition: all 0.15s ease;
  margin: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[0]};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
    transform: translateX(4px);
    color:${({ theme }) => theme.colors.neutral.white}
  }

  &::before {
    content: '✓';
    opacity: ${({ active }) => (active ? 1 : 0)};
    color: ${({ theme }) => theme.colors.neutral.white};
    margin-right: 8px;
    transition: opacity 0.2s ease;
  }
`;

export const Checkbox = styled.input`
  margin-right: 12px;
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  display: none;

  &:checked {
    animation: ${scaleUp} 0.15s ease;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px;
  background: ${({ theme }) => theme.colors.neutral.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-bottom: 24px;
`;

export const ActiveFiltersCount = styled.span`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-size: 0.75rem;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  padding: 0 6px;
`;