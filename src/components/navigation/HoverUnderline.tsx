import * as React from "react";

interface Props {
  isLinkActive?: boolean;
  asDark?: boolean;
}

const HoverUnderline = ({ isLinkActive, asDark }: Props) => (
  <span
    className={`block group-hover:w-full transition-all duration-500 h-0.5 ${
      isLinkActive
        ? asDark
          ? "bg-d-tertiary-2 w-full"
          : "bg-l-secondary dark:bg-d-tertiary-2"
        : "bg-white w-0"
    }`}
  />
);

export { HoverUnderline };
