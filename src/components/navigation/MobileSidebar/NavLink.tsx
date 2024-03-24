import * as React from "react";
import { Check } from "iconoir-react";

import { PrefetchStrategyEnum } from "../../../types/links";
import type { NavLinkProps } from "@components/navigation/NavLink";
import { formatPathname } from "@utils/urls";

const NavLink = ({
  href,
  isExternal,
  pathname,
  showActiveCheck,
  prefetchStrategy = PrefetchStrategyEnum.HOVER,
  children,
}: NavLinkProps) => {
  const updatedPathname = formatPathname({ pathname });
  const isActive = !!updatedPathname && href === updatedPathname;

  return (
    <a
      // Opt in to prefetch with custom strategy
      {...(!isExternal && { "data-astro-prefetch": prefetchStrategy })}
      href={href}
      target={isExternal ? "_blank" : "_self"}
      className={`flex items-center justify-between w-full py-3 px-6 gap-x-2 rounded-md text-lg font-light transition duration-150 ease-in-out hover:bg-l-tertiary-2/25 dark:hover:bg-d-primary-dark/25 link-focus ${
        isActive
          ? "text-l-secondary dark:text-d-tertiary-2"
          : "text-black dark:text-white"
      }`}
    >
      {children}
      {isActive && showActiveCheck ? (
        <span className="text-l-secondary dark:text-d-tertiary-2">
          <Check width={24} height={24} />
        </span>
      ) : null}
    </a>
  );
};

export { NavLink };
