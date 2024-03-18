import * as React from "react";
import { Check } from "iconoir-react";

import { HoverUnderline } from "./HoverUnderline";
import type { PrefetchStrategy } from "../../types/links";
import { PrefetchStrategyEnum } from "../../types/links";
import { formatPathname } from "../../utils/urls";

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

const NavLink = ({
  href,
  isExternal,
  pathname,
  prefetchStrategy = PrefetchStrategyEnum.HOVER,
  children,
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
          className={`flex items-center gap-x-2 rounded-md text-lg font-light transition duration-150 ease-in-out outline-none focus:ring ring-offset-gray-900 ring-offset-4 ring-d-tertiary-2 ${
            isActive ? "text-d-tertiary-2" : "text-white"
          }`}
        >
          {children}
        </a>
        <HoverUnderline isLinkActive={isActive} />
      </div>
    </div>
  );
};

export { NavLink };
