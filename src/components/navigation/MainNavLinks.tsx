import * as React from "react";
import { ArrowUpRight } from "iconoir-react";

import { NavLink } from "./NavLink";

interface Props {
  pathname?: string;
  showActiveCheck?: boolean;
}

const MainNavLinks = ({ pathname, showActiveCheck }: Props) => {
  return (
    <>
      <NavLink
        href="/about"
        pathname={pathname}
        showActiveCheck={showActiveCheck}
      >
        About
      </NavLink>
      <NavLink
        href="https://blog.kieranroberts.dev"
        isExternal
        showActiveCheck={showActiveCheck}
      >
        Blog
        <ArrowUpRight height={12} width={12} />
      </NavLink>
      <NavLink
        href="/contact"
        pathname={pathname}
        showActiveCheck={showActiveCheck}
      >
        Contact
      </NavLink>
    </>
  );
};

export { MainNavLinks };
