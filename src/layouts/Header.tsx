import * as React from "react";
import { KBarProvider as KBarProv } from "kbar";

import { CodeSVG } from "@components/icons";
import { MainNavLinks } from "@components/navigation/MainNavLinks";
import ThemeToggle from "@components/ThemeToggle.tsx";
import { RSSLink } from "@components/navigation/RSSLink";
import { Trigger as SidebarTrigger } from "@components/navigation/MobileSidebar/Trigger";
import { KBarToggle } from "@components/KbarToggle";

import useStickyScroll from "@hooks/useStickyHeader";
import { usePrefersReducedMotion } from "@hooks/usePrefersReducedMotion";
import { KBar, actions as kBarActions } from "@modules/KBar";

import AvatarImage from "@assets/Kieran-Avatar-funky-min_80x80.webp";

interface Props {
  pathname: string;
}

export const KBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <KBarProv actions={kBarActions}>
      <KBar />
      {children}
    </KBarProv>
  );
};

export const Header = ({ pathname }: Props) => {
  const headerRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const isActive = pathname === "/";

  useStickyScroll({ elRef: headerRef, prefersReducedMotion });

  return (
    <KBarProvider>
      <header
        ref={headerRef}
        className="z-[9999] bg-white transform-none dark:bg-[#100114] sticky top-0 left-0"
      >
        <nav
          role="navigation"
          className="relative flex items-center max-w-[1728px] h-[70px] mx-auto justify-between px-4 md:px-8 lg:px-16 py-3.5"
        >
          {/* Skip to content link */}
          <a
            className="hidden absolute pointer-events-none lg:flex items-center h-1/2 justify-center m-auto inset-0 w-44 bg-l-secondary text-white font-medium rounded-lg text-center outline-none opacity-0 transition-opacity focus:pointer-events-auto focus:opacity-100 link-focus"
            href="#main"
          >
            Skip to content
          </a>
          <section className="flex items-center gap-x-4">
            <a
              href="/"
              className="flex items-center gap-x-2 text-md sm:text-xl font-medium rounded-full md:rounded-md outline-none link-focus"
            >
              <div className="hidden w-max rounded-full mx-auto lg:mx-0 lg:block">
                <img
                  src={AvatarImage.src}
                  alt="Headshot of Kieran Roberts"
                  width="40"
                  height="40"
                  loading="eager"
                  className="rounded-full border border-l-secondary dark:border-l-tertiary-2"
                />
              </div>
              <h1 className="flex items-center text-black dark:text-white text-lg sm:text-xl font-light gap-x-2">
                kieranroberts.dev
                <span
                  className={`block w-6 h-6 ${
                    isActive
                      ? "text-l-secondary dark:text-d-tertiary-2"
                      : "text-black dark:text-white"
                  }`}
                >
                  <CodeSVG />
                </span>
              </h1>
            </a>
            <KBarToggle />
          </section>

          <section className="flex items-center gap-x-8">
            <div className="hidden md:flex md:items-center md:gap-x-8">
              <MainNavLinks pathname={pathname} />
            </div>
            <div className="flex items-center gap-x-2 md:gap-x-6">
              <ThemeToggle />
              <RSSLink />

              <SidebarTrigger pathname={pathname} />
            </div>
          </section>
        </nav>
        <div className="bg-gradient-to-r from-l-secondary from-25% via-l-tertiary-2 via-40% to-l-primary-dark h-[2px] w-full bg-white" />
      </header>
    </KBarProvider>
  );
};
