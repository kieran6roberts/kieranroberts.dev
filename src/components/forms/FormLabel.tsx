import * as React from "react";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const FormLabel = ({ children, ...restOfProps }: Props) => (
  <label className="block mb-2 font-medium" {...restOfProps}>
    {children}
  </label>
);
