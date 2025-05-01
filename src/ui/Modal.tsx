import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /**
   * Optional: Center modal content vertically/horizontally
   */
  centered?: boolean;
  /**
   * Optional: ARIA label for accessibility
   */
  ariaLabel?: string;
}

const Overlay = styled.div`
  position: fixed;
  z-index: 1200;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(34, 34, 34, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
`;

const ModalContent = styled.div<{ centered?: boolean }>`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  min-width: 320px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  position: relative;
  ${({ centered }) =>
    centered
      ? `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
      : ""}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
  z-index: 1;
  &:hover {
    color: #333;
  }
`;

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  centered = true,
  ariaLabel = "Модальное окно",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Close on click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  // Use portal for modal rendering
  return ReactDOM.createPortal(
    <Overlay onMouseDown={handleOverlayClick} aria-modal="true" role="dialog" aria-label={ariaLabel}>
      <ModalContent ref={modalRef} centered={centered}>
        <CloseButton aria-label="Закрыть" onClick={onClose}>
          ×
        </CloseButton>
        {children}
      </ModalContent>
    </Overlay>,
    document.body
  );
};

export default Modal;