import { Code } from "iconoir-react";
import * as React from "react";
import { MainNavLinks } from "@components/navigation/MainNavLinks";
import ThemeToggle from "@components/ThemeToggle.tsx";
import { Trigger as SidebarTrigger } from "@components/navigation/MobileSidebar/Trigger";
import useStickyScroll from "@hooks/useStickyHeader";
import { usePrefersReducedMotion } from "@hooks/usePrefersReducedMotion";

interface Props {
  pathname: string;
}

export const Header = ({ pathname }: Props) => {
  const headerRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isActive = pathname === "/";

  useStickyScroll({ elRef: headerRef, prefersReducedMotion });

  return (
    <header
      ref={headerRef}
      className="relative transform-none md:sticky z-50 md:top-0 md:left-0"
    >
      <nav
        role="navigation"
        className="flex items-center justify-between px-4 md:px-24 py-4 bg-[#100114] border-b dark:border-gray-800"
      >
        <section className="flex items-center gap-x-2">
          <a
            href="/"
            className="flex items-center gap-x-2 text-md sm:text-xl font-medium rounded-full md:rounded-md outline-none focus:ring ring-offset-gray-900 ring-offset-4 ring-d-tertiary-2"
          >
            <div className="hidden w-max rounded-full mx-auto lg:mx-0 lg:block">
              <img
                src="/src/images/Kieran-Avatar-funky.png"
                alt="Headshot of Kieran Roberts"
                width="40"
                height="40"
                className="rounded-full border border-l-tertiary-2"
              />
            </div>
            <div className="flex items-center text-white text-xl font-light gap-x-2">
              kieranroberts.dev
              <span
                className={`${isActive ? "text-l-tertiary-2" : "text-white"}`}
              >
                <Code width={24} height={24} />
              </span>
            </div>
          </a>
        </section>

        <section className="flex items-center">
          <div className="hidden md:flex md:items-center md:gap-x-8">
            <MainNavLinks pathname={pathname} asDark />
          </div>

          <div className="flex items-center gap-x-6 md:gap-x-0 ml-8">
            {!isActive ? <ThemeToggle /> : null}

            <SidebarTrigger pathname={pathname} />
          </div>
        </section>
        <div className="absolute bottom-0 left-0 bg-gradient-to-r from-l-primary-dark from-30% via-l-secondary via-75% to-l-tertiary-2 h-[2px] w-full bg-white" />
      </nav>
    </header>
  );
};
