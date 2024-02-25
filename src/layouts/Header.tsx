import { Code } from "iconoir-react";
import * as React from "react";
// import Avatar from "../components/Avatar.astro";
import { MainNavLinks } from "../components/navigation/MainNavLinks";
import ThemeToggle from "../components/ThemeToggle.tsx";
import { Trigger as SidebarTrigger } from "../components/navigation/MobileSidebar/Trigger";
import useStickyScroll from "@hooks/useStickyHeader";
import { usePrefersReducedMotion } from "@hooks/usePrefersReducedMotion";

interface Props {
  pathname: string;
}

export const Header = ({ pathname }: Props) => {
  const headerRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useStickyScroll({ elRef: headerRef, prefersReducedMotion });

  return (
    <header
      ref={headerRef}
      className="relative transform-none md:sticky z-50 md:top-0 md:left-0"
    >
      <nav
        role="navigation"
        className="flex items-center justify-between px-4 md:px-8 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-800"
      >
        <section className="flex items-center gap-x-2">
          <a
            href="/"
            className="flex items-center gap-x-2 text-md sm:text-xl font-medium rounded-full md:rounded-md link-focus"
          >
            {/* <Avatar /> */}
            <div className="flex items-center gap-x-2">
              kieranroberts.dev
              <span className="text-l-secondary">
                <Code width={24} height={24} />
              </span>
            </div>
          </a>
        </section>

        <section className="flex items-center">
          <div className="hidden md:flex md:items-center md:gap-x-8">
            <MainNavLinks pathname={pathname} />
          </div>

          <div className="flex items-center gap-x-6 md:gap-x-0 ml-12">
            <ThemeToggle />

            <SidebarTrigger pathname={pathname} />
          </div>
        </section>
      </nav>
    </header>
  );
};
