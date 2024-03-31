import * as React from "react";

interface Props {
  color: string;
  [x: string]: any;
}

export const EmojiLookDownSVG = ({ color, restOfProps }: Props) => (
  <svg
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...restOfProps}
  >
    <path
      d="M8.5 14C8.22386 14 8 13.7761 8 13.5C8 13.2239 8.22386 13 8.5 13C8.77614 13 9 13.2239 9 13.5C9 13.7761 8.77614 14 8.5 14Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M15.5 14C15.2239 14 15 13.7761 15 13.5C15 13.2239 15.2239 13 15.5 13C15.7761 13 16 13.2239 16 13.5C16 13.7761 15.7761 14 15.5 14Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M10 18H14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);
