import * as React from "react";

interface Props {
  isLinkActive?: boolean;
}

const HoverUnderline = ({ isLinkActive }: Props) => (
  <span
    className={`block w-0 group-hover:w-full transition-all duration-500 h-0.5 ${
      isLinkActive
        ? "bg-l-secondary dark:bg-d-secondary"
        : "bg-l-primary-dark dark:bg-d-tertiary-2"
    }`}
  />
);

export { HoverUnderline };
