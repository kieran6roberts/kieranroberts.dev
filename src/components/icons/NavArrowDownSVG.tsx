import * as React from "react";

interface Props {
  color: string;
  [x: string]: any;
}

export const NavArrowDownSVG = ({ color, restOfProps }: Props) => (
  <svg
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restOfProps}
    color={color}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);
