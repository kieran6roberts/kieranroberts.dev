import * as React from "react";

import { HoverUnderline } from "./HoverUnderline";
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
      asDark?: boolean;
    }
  | {
      href: string;
      isExternal?: false;
      pathname?: string;
      children: React.ReactNode;
      showActiveCheck?: boolean;
      prefetchStrategy?: PrefetchStrategy;
      asDark?: boolean;
    };

const NavLink = ({
  href,
  isExternal,
  pathname,
  prefetchStrategy = PrefetchStrategyEnum.HOVER,
  showActiveCheck,
  children,
  asDark,
}: NavLinkProps) => {
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
          className={`flex items-center gap-x-2 whitespace-nowrap rounded-md text-md transition duration-150 ease-in-out outline-none focus:ring ring-offset-gray-900 ring-offset-4 ring-d-tertiary-2 
          ${
            asDark
              ? isActive
                ? "text-d-tertiary-2"
                : "text-white"
              : isActive
              ? "text-l-secondary dark:text-d-tertiary-2"
              : "text-black dark:text-white"
          }`}
        >
          {children}
        </a>
        <HoverUnderline isLinkActive={isActive} />
      </div>
      {isActive && showActiveCheck ? (
        <span className="block w-6 h-6 bg-white dark:bg-[#100114] text-l-secondary dark:text-d-tertiary-2">
          <CheckSVG />
        </span>
      ) : null}
    </div>
  );
};

export { NavLink };
