import { animated } from "react-spring";
import * as React from "react";

import { useBoop } from "../hooks/useBoop";
import type { BoopConfig } from "../hooks/useBoop";

const buttonVariants = {
  "solid-dark":
    "bg-[#100114] hover:bg-black/80 text-white ring-offset-white ring-d-secondary disabled:opacity-90",
  "solid-white":
    "bg-white text-black hover:bg-gray-50 ring-offset-black ring-d-tertiary-2 disabled:opacity-90",
  "transparent-dark":
    "bg-[#100114] border-2 text-white link-focus border-d-tertiary-2 hover:bg-d-primary-darkest ring-offset-secondary ring-d-tertiary-2 disabled:opacity-90",
  transparent:
    "bg-[#100114] dark:text-white border-2 border-transparent text-white link-focus dark:border-d-tertiary-2 hover:bg-l-primary-darkest dark:hover:bg-d-primary-darkest ring-offset-secondary ring-d-tertiary-2 disabled:opacity-90",
};

const buttonWidth = {
  full: "w-full",
  max: "w-max",
};

type ButtonVariant = keyof typeof buttonVariants;
type ButtonWidth = keyof typeof buttonWidth;

type ButtonProps =
  | {
      startIcon?: React.ReactNode;
      endIcon?: React.ReactNode;
      iconAnimationSettings?: BoopConfig;
      buttonAnimationSettings?: BoopConfig;
      variant?: ButtonVariant;
      children?: React.ReactNode;
      width?: ButtonWidth;
      className?: string;
      onClick?: never;
      asLink: boolean;
      href: string;
      disabled?: never;
      childrenIsIcon?: boolean;
      type?: never;
    }
  | {
      startIcon?: React.ReactNode;
      endIcon?: React.ReactNode;
      iconAnimationSettings?: BoopConfig;
      buttonAnimationSettings?: BoopConfig;
      variant?: ButtonVariant;
      children?: React.ReactNode;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      width?: ButtonWidth;
      className?: string;
      asLink?: never;
      href?: never;
      disabled?: boolean;
      childrenIsIcon?: boolean;
      type: "submit" | "button";
    };

// Todo update with element attributes;
type ComponentType = ButtonProps;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ComponentType
>(
  (
    {
      iconAnimationSettings,
      buttonAnimationSettings,
      startIcon = null,
      endIcon = null,
      variant = "solid-dark",
      width = "max",
      children,
      asLink = false,
      onClick,
      className,
      disabled,
      childrenIsIcon,
      type = "button",
      href,
      ...restOfProps
    },
    forwardedRef
  ) => {
    const [iconStyle, iconTrigger] = useBoop(iconAnimationSettings || {});
    const [buttonStyle, buttonTrigger] = useBoop(buttonAnimationSettings || {});

    if (asLink && href) {
      return (
        <a
          ref={forwardedRef as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          style={buttonStyle}
          {...{ "data-astro-prefetch": "hover" }}
          className={`flex items-center gap-2 font-medium rounded-full transition-colors duration-100 focus:ring outline-none ring-offset-4 px-4 py-3 ${
            className ?? ""
          } ${buttonVariants[variant]} ${buttonWidth[width]}`}
          onMouseEnter={() => {
            if (iconAnimationSettings) iconTrigger();
            if (buttonAnimationSettings) buttonTrigger();
          }}
          {...restOfProps}
        >
          <animated.span style={iconStyle}>{startIcon}</animated.span>
          {childrenIsIcon ? (
            <animated.span style={iconStyle}>{children}</animated.span>
          ) : (
            children
          )}
          <animated.span style={iconStyle}>{endIcon}</animated.span>
        </a>
      );
    }

    return (
      <animated.button
        ref={forwardedRef as React.ForwardedRef<HTMLButtonElement>}
        style={buttonStyle}
        {...(type !== "submit" && { onClick: onClick })}
        type={type}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 font-medium transition-colors duration-100 rounded-full focus:ring outline-none ring-offset-4 px-4 py-3 ${
          className ?? ""
        } ${buttonVariants[variant]} ${buttonWidth[width]}`}
        onMouseEnter={() => {
          if (iconAnimationSettings) iconTrigger();
          if (buttonAnimationSettings) buttonTrigger();
        }}
        {...restOfProps}
      >
        {startIcon ? (
          <animated.span style={iconStyle}>{startIcon}</animated.span>
        ) : null}

        {childrenIsIcon ? (
          <animated.span style={iconStyle}>{children}</animated.span>
        ) : (
          children
        )}

        {endIcon ? (
          <animated.span style={iconStyle}>{endIcon}</animated.span>
        ) : null}
      </animated.button>
    );
  }
);
