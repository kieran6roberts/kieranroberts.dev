import * as React from "react";

import { NavLink } from "@components/navigation/NavLink";

interface Props {
  pathname?: string;
  showActiveCheck?: boolean;
  asDark?: boolean;
}

const MainNavLinks = ({ pathname, showActiveCheck, asDark }: Props) => {
  return (
    <>
      <NavLink
        href="/blog"
        pathname={pathname}
        prefetchStrategy="hover"
        showActiveCheck={showActiveCheck}
        asDark={!!asDark}
      >
        Blog
      </NavLink>
      <NavLink
        href="/skills"
        pathname={pathname}
        showActiveCheck={showActiveCheck}
        prefetchStrategy="hover"
        asDark={!!asDark}
      >
        Skills
      </NavLink>
      <NavLink
        href="/about"
        pathname={pathname}
        showActiveCheck={showActiveCheck}
        prefetchStrategy="hover"
        asDark={!!asDark}
      >
        About
      </NavLink>
      <NavLink
        href="/contact"
        pathname={pathname}
        showActiveCheck={showActiveCheck}
        prefetchStrategy="hover"
        asDark={!!asDark}
      >
        Contact
      </NavLink>
    </>
  );
};

export { MainNavLinks };
