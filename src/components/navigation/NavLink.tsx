import * as React from "react";

import type { PrefetchStrategy } from "../../types/links";
import { PrefetchStrategyEnum } from "../../types/links";
import { formatPathname } from "@utils/urls";
import { CheckSVG } from "@components/icons";

export type NavLinkProps =
  | {
      href: string;
      pathname?: string;
      children: React.ReactNode;
      showActiveCheck?: boolean;
      isExternal: true;
      prefetchStrategy?: never;
    }
  | {
      href: string;
      isExternal?: false;
      pathname?: string;
      children: React.ReactNode;
      showActiveCheck?: boolean;
      prefetchStrategy?: PrefetchStrategy;
    };

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      href,
      isExternal,
      pathname,
      prefetchStrategy = PrefetchStrategyEnum.HOVER,
      showActiveCheck,
      children,
      ...rest
    },
    ref,
  ) => {
    const updatedPathname = formatPathname({ pathname });
    const isActive = !!updatedPathname && href === updatedPathname;

    return (
      <div className="flex justify-between w-full">
        <div className="group flex flex-col">
          <a
            // Opt in to prefetch with custom strategy
            {...(!isExternal && { "data-astro-prefetch": prefetchStrategy })}
            href={href}
            target={isExternal ? "_blank" : "_self"}
            ref={ref}
            className={`flex items-center gap-x-2 px-4 py-1.5 rounded-full whitespace-nowrap text-base font-medium transition duration-150 ease-in-out outline-none link-focus icon-button-hover 
              
          ${
            isActive
              ? "text-l-primary-dark dark:text-d-tertiary-2"
              : "text-black dark:text-white"
          }`}
            {...rest}
          >
            {children}
          </a>
        </div>
        {isActive && showActiveCheck ? (
          <span className="block w-6 h-6 bg-white dark:bg-[#100114] text-l-secondary dark:text-d-tertiary-2">
            <CheckSVG />
          </span>
        ) : null}
      </div>
    );
  },
);

export { NavLink };
