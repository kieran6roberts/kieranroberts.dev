import * as React from "react";
import { Check } from "iconoir-react";

import { HoverUnderline } from "./HoverUnderline";

enum PrefetchStrategyEnum {
  TAP = "tap",
  HOVER = "hover",
  VIEWPORT = "viewport",
  LOAD = "load",
}

type PrefetchStrategy = `${PrefetchStrategyEnum}`;

type Props =
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
  showActiveCheck,
  prefetchStrategy = PrefetchStrategyEnum.HOVER,
  children,
}: Props) => {
  const pathnameHasTrailingSlash =
    pathname && pathname.length > 1 && pathname?.endsWith("/");
  const updatedPathname = pathnameHasTrailingSlash
    ? pathname?.slice(0, -1)
    : pathname;
  const isActive = !!updatedPathname && href === updatedPathname;

  return (
    <div className="flex justify-between w-full">
      <div className="group flex flex-col">
        <a
          // Opt in to prefetch with custom strategy
          {...(!isExternal && { "data-astro-prefetch": prefetchStrategy })}
          href={href}
          target={isExternal ? "_blank" : "_self"}
          className={`flex items-center gap-x-2 rounded-md text-lg font-light transition duration-150 ease-in-out link-focus ${
            isActive
              ? "text-l-secondary dark:text-d-tertiary-2"
              : " text-l-primary-darkest dark:text-white"
          }`}
        >
          {children}
        </a>
        <HoverUnderline isLinkActive={isActive} />
      </div>
      {isActive && showActiveCheck ? (
        <span className="text-l-secondary dark:text-d-tertiary-2">
          <Check width={24} height={24} />
        </span>
      ) : null}
    </div>
  );
};

export { NavLink };
