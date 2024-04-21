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
  const isBlogPath = pathname.includes("/blog");

  useStickyScroll({ elRef: headerRef, prefersReducedMotion });

  return (
    <KBarProvider>
      <header
        ref={headerRef}
        className="transform-none bg-[#100114] sticky z-[9999] top-0 left-0"
      >
        <nav
          role="navigation"
          className="relative flex items-center max-w-[1728px] h-[75px] mx-auto justify-between px-4 md:px-8 lg:px-16 py-4 border-b dark:border-gray-800"
        >
          {/* Skip to content link */}
          <a
            className="absolute flex items-center h-1/2 justify-center m-auto inset-0 w-44 bg-l-secondary text-white font-medium rounded-lg text-center outline-none opacity-0 transition-opacity focus:opacity-100 focus:ring-2 focus:ring-white"
            href="#main"
          >
            Skip to content
          </a>
          <section className="flex items-center gap-x-4">
            <a
              href="/"
              className="flex items-center gap-x-2 text-md sm:text-xl font-medium rounded-full md:rounded-md outline-none focus:ring ring-offset-gray-900 ring-offset-4 ring-d-tertiary-2"
            >
              <div className="hidden w-max rounded-full mx-auto lg:mx-0 lg:block">
                <img
                  src={AvatarImage.src}
                  alt="Headshot of Kieran Roberts"
                  width="40"
                  height="40"
                  loading="eager"
                  className="rounded-full border border-l-tertiary-2"
                />
              </div>
              <h1 className="flex items-center text-white text-lg sm:text-xl font-light gap-x-2">
                kieranroberts.dev
                <span
                  className={`block w-6 h-6 ${
                    isActive ? "text-[#97EC77]" : "text-white"
                  }`}
                >
                  <CodeSVG />
                </span>
              </h1>
            </a>
            <KBarToggle />
          </section>

          <section className="flex items-center gap-x-8">
            <div className="flex items-center gap-x-2 md:gap-x-6">
              {!isActive ? <ThemeToggle /> : null}
              {isBlogPath ? (
                <div className="hidden lg:block">
                  <RSSLink />
                </div>
              ) : null}

              <SidebarTrigger pathname={pathname} />
            </div>
            <div className="hidden md:flex md:items-center md:gap-x-8">
              <MainNavLinks pathname={pathname} asDark />
            </div>
          </section>
          <div className="absolute bottom-0 left-0 bg-gradient-to-r from-l-primary-dark from-30% via-l-secondary via-75% to-l-tertiary-2 h-[2px] w-full bg-white" />
        </nav>
      </header>
    </KBarProvider>
  );
};
