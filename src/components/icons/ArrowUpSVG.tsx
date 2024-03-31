import * as React from "react";

interface Props {
  [x: string]: any;
}

export const ArrowUpSVG = ({ className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 21L12 3M12 3L20.5 11.5M12 3L3.5 11.5"
      className="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);
