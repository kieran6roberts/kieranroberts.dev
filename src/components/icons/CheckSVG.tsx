import * as React from "react";

interface Props {
  [x: string]: any;
}

export const CheckSVG = ({ className }: Props) => (
  <svg
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
  >
    <path
      d="M5 13L9 17L19 7"
      className="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);
