import * as React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  disabled?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ disabled, error, ...props }, forwardedRef) => {
    return (
      <input
        aria-invalid={error ? "true" : "false"}
        ref={forwardedRef}
        disabled={disabled}
        className={`border border-l-primary-dark w-full p-2.5 rounded-lg bg-white dark:bg-[#100114] focus:outline-none focus:ring-2 focus:ring-l-secondary dark:focus:ring-d-tertiary-2 ${
          error
            ? "border-red-500 dark:border-red-500"
            : "border-l-primary-dark dark:border-white"
        }`}
        {...props}
      />
    );
  }
);
