import * as React from "react";
import { OpenNewWindow } from "iconoir-react";

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
        prefetchStrategy="load"
      >
        About
      </NavLink>
      <NavLink
        href="https://blog.kieranroberts.dev"
        isExternal
        showActiveCheck={showActiveCheck}
      >
        Blog
        <OpenNewWindow height={20} width={20} />
      </NavLink>
      <NavLink
        href="/contact"
        pathname={pathname}
        showActiveCheck={showActiveCheck}
        prefetchStrategy="load"
      >
        Contact
      </NavLink>
    </>
  );
};

export { MainNavLinks };
