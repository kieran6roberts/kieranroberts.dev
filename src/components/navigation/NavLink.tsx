import * as React from "react";
import { DoubleCheck } from "iconoir-react";

import { HoverUnderline } from "@components/navigation/HoverUnderline";

interface Props {
  href: string;
  isExternal?: boolean;
  pathname?: string;
  children: React.ReactNode;
  showActiveCheck?: boolean;
}

const NavLink = ({
  href,
  isExternal,
  pathname,
  showActiveCheck,
  children,
}: Props) => {
  const isActive = pathname && href === pathname;

  return (
    <div className="flex justify-between w-full">
      <div className="group flex flex-col">
        <a
          href={href}
          target={isExternal ? "_blank" : "_self"}
          className={`flex items-center gap-x-2 rounded-md text-base font-medium transition duration-150 ease-in-out link-focus ${
            isActive
              ? "text-l-secondary dark:text-d-tertiary-1 font-semibold"
              : " text-l-primary-darkest dark:text-d-tertiary-2"
          }`}
        >
          {children}
        </a>
        <HoverUnderline />
      </div>
      {isActive && showActiveCheck ? (
        <span className="text-l-secondary dark:text-d-tertiary-1">
          <DoubleCheck width={24} height={24} />
        </span>
      ) : null}
    </div>
  );
};

export { NavLink };
