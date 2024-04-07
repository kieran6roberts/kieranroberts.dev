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
      {showActiveCheck ? (
        <NavLink
          href="/contact"
          pathname={pathname}
          showActiveCheck={showActiveCheck}
          prefetchStrategy="hover"
          asDark={!!asDark}
        >
          Contact
        </NavLink>
      ) : (
        <a
          href="/contact"
          className={`flex items-center gap-x-2 px-4 py-1 font-medium whitespace-nowrap bg-white text-primary-darkest rounded-full text-md transition duration-150 ease-in-out outline-none hover:bg-gray-100 hover:text-l-primary-dark focus:ring ring-offset-gray-900 ring-offset-4 ring-d-tertiary-2 
          ${
            pathname === "/contact"
              ? "text-l-secondary"
              : "text-l-primary-darkest"
          }`}
        >
          Contact
        </a>
      )}
    </>
  );
};

export { MainNavLinks };
