import * as React from "react";

const getFocusableElements = (element: React.MutableRefObject<Element>) => {
  return element.current.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
};

const handleTabKeyPress = ({
  event,
  firstElement,
  lastElement,
}: {
  event: KeyboardEvent;
  firstElement: HTMLElement;
  lastElement: HTMLElement;
}) => {
  if (event.key === "Tab") {
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
};

const handleEscapeKey = ({
  event,
  handleEsc,
  triggerRef,
}: {
  event: KeyboardEvent;
  handleEsc: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}) => {
  if (event.code === "Escape") {
    handleEsc();
    if (triggerRef) triggerRef.current?.focus();
  }
};

export { getFocusableElements, handleTabKeyPress, handleEscapeKey };
