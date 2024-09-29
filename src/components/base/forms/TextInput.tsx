import * as React from "react";
import cn from "clsx";

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
        autoComplete="off"
        className={cn(
          "border-2 border-l-primary-dark w-full p-2.5 rounded-lg bg-white dark:bg-[#100114] focus:outline-none focus:ring-2 focus:border-transparent dark:focus:border-transparent",
          error
            ? "border-red-300 dark:border-red-800 focus:ring-red-600 dark:focus:ring-red-400"
            : "border-l-primary-dark dark:border-white focus:ring-l-secondary dark:focus:ring-d-tertiary-2",
        )}
        {...props}
      />
    );
  },
);
