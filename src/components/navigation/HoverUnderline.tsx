import * as React from "react";

interface Props {
  isLinkActive?: boolean;
}

const HoverUnderline = ({ isLinkActive }: Props) => (
  <span
    className={`block group-hover:w-full transition-all duration-500 h-0.5 ${
      isLinkActive ? "bg-d-tertiary-2 w-full" : "bg-white w-0"
    }`}
  />
);

export { HoverUnderline };
