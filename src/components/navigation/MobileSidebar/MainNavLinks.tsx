import * as React from "react";

import { NavLink } from "@components/navigation/NavLink";

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
        href="/blog"
        pathname={pathname}
        prefetchStrategy="load"
        showActiveCheck={showActiveCheck}
      >
        Blog
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
