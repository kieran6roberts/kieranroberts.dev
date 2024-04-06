import * as React from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ disabled, error, ...props }, forwardedRef) => {
    return (
      <textarea
        ref={forwardedRef}
        disabled={disabled}
        autoComplete="off"
        className={`block border-2 w-full p-2.5 rounded-lg bg-white dark:bg-[#100114] focus:outline-none focus:ring-2 focus:border-transparent dark:focus:border-transparent focus:ring-l-secondary dark:focus:ring-d-tertiary-2 ${
          error
            ? "border-red-300 dark:border-red-800 focus:ring-red-600 dark:focus:ring-red-400"
            : "border-l-primary-dark dark:border-white focus:ring-l-secondary dark:focus:ring-d-tertiary-2"
        }`}
        {...props}
      />
    );
  }
);
