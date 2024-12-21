import { animated } from "react-spring";
import * as React from "react";
import cn from "clsx";

import { useBoop } from "@hooks/useBoop";
import type { BoopConfig } from "@hooks/useBoop";

const buttonVariants = {
  "solid-dark":
    "bg-d dark:bg-l hover:bg-zinc-800 dark:hover:bg-l/90 border-2 border-transparent text-l dark:text-d ring-offset-l dark:ring-offset-d ring-accent-darkest dark:ring-accent-brightest disabled:opacity-90",
  // TODO: Update colors
  secondary:
    "bg-l dark:bg-d border-2 border-d/75 dark:border-l hover:bg-zinc-100 dark:hover:bg-zinc-800 text-d dark:text-l ring-offset-l dark:ring-offset-d ring-accent-darkest dark:ring-accent-brightest disabled:opacity-90",
  // "solid-white":
  //   "bg-l text-d hover:bg-zinc-50 border-2 border-transparent ring-offset-d ring-accent-darkest dark:ring-accent-brightest disabled:opacity-90",
  // "transparent-dark":
  //   "bg-primary-dark border-2 text-white border-d-tertiary-2 hover:bg-d-primary-darkest ring-offset-black ring-d-tertiary-2 disabled:opacity-90",
  // transparent:
  //   "bg-primary-dark dark:text-white border-2 border-transparent text-white link-focus dark:border-d-tertiary-2 hover:bg-l-primary-darkest dark:hover:bg-d-primary-darkest ring-offset-secondary ring-d-tertiary-2 disabled:opacity-90",
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
      target?: string;
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
    forwardedRef,
  ) => {
    const {
      styleToApplyOnBoop: iconStyleToApply,
      handleBoopTrigger: handleIconTrigger,
    } = useBoop(iconAnimationSettings || {});
    const {
      styleToApplyOnBoop: buttonStyleToApply,
      handleBoopTrigger: handleButtonTrigger,
    } = useBoop(buttonAnimationSettings || {});

    if (asLink && href) {
      return (
        <a
          {...(buttonStyleToApply && { style: buttonStyleToApply })}
          {...{ "data-astro-prefetch": "hover" }}
          ref={forwardedRef as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          className={cn(
            "flex items-center gap-2 text-sm font-medium rounded-full transition-colors duration-100 focus:ring outline-none ring-offset-2 px-3 py-2 lg:px-4 lg:py-2",
            className ?? "",
            buttonVariants[variant],
            buttonWidth[width],
          )}
          onMouseEnter={() => {
            if (iconAnimationSettings) handleIconTrigger();
            if (buttonAnimationSettings) handleButtonTrigger();
          }}
          {...restOfProps}
        >
          <animated.span {...(iconStyleToApply && { style: iconStyleToApply })}>
            {startIcon}
          </animated.span>
          {childrenIsIcon ? (
            <animated.span
              {...(iconStyleToApply && { style: iconStyleToApply })}
            >
              {children}
            </animated.span>
          ) : (
            children
          )}
          <animated.span {...(iconStyleToApply && { style: iconStyleToApply })}>
            {endIcon}
          </animated.span>
        </a>
      );
    }

    return (
      <animated.button
        {...(buttonStyleToApply && { style: buttonStyleToApply })}
        {...(type !== "submit" && { onClick: onClick })}
        ref={forwardedRef as React.ForwardedRef<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={cn(
          "flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-100 rounded-full focus:ring outline-none ring-offset-2 px-3 py-2 lg:px-4 lg:py-2",
          className ?? "",
          buttonVariants[variant],
          buttonWidth[width],
        )}
        onMouseEnter={() => {
          if (iconAnimationSettings) handleIconTrigger();
          if (buttonAnimationSettings) handleButtonTrigger();
        }}
        {...restOfProps}
      >
        {startIcon ? (
          <animated.span {...(iconStyleToApply && { style: iconStyleToApply })}>
            {startIcon}
          </animated.span>
        ) : null}

        {childrenIsIcon ? (
          <animated.span {...(iconStyleToApply && { style: iconStyleToApply })}>
            {children}
          </animated.span>
        ) : (
          children
        )}

        {endIcon ? (
          <animated.span {...(iconStyleToApply && { style: iconStyleToApply })}>
            {endIcon}
          </animated.span>
        ) : null}
      </animated.button>
    );
  },
);
